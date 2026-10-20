/**
 * Divekaa Global - Google Apps Script Webhook
 * Handles POST requests for Orders and Enquiries.
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // 10 sec lock to handle concurrent requests

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No payload" })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.action === "NEW_ORDER") {
      const sheetName = "Orders";
      let sheet = ss.getSheetByName(sheetName);
      
      // AUTO-CREATES COLUMNS IF THEY DONT EXIST
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow([
          "Timestamp (IST)", "Order ID", "Customer Name", "Phone", "Email", 
          "Address", "Landmark", "City", "State", "Pincode", 
          "Items", "Jars", "Subtotal", "Delivery Zone", "Delivery Fee", 
          "Grand Total", "Payment Method", "UTR", "Payment Status", "Order Status", "Notes"
        ]);
        sheet.getRange(1, 1, 1, 21).setFontWeight("bold");
      }

      // Dedupe check (prevents double logging)
      const orderIdCol = sheet.getRange("B:B").getValues();
      for (let i = 0; i < orderIdCol.length; i++) {
        if (orderIdCol[i][0] === data.orderId) {
           return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Duplicate bypassed" })).setMimeType(ContentService.MimeType.JSON);
        }
      }

      sheet.appendRow([
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.orderId,
        data.customerName,
        "'" + data.phone, // force string to keep 0s
        data.email,
        data.address,
        data.landmark,
        data.city,
        data.state,
        data.pincode,
        data.items,
        data.jars,
        data.subtotal,
        data.deliveryZone,
        data.deliveryFee,
        data.grandTotal,
        data.paymentMethod,
        data.utr,
        data.paymentStatus,
        "New", // Default order status
        "" // Notes
      ]);
      
    } else if (data.action === "NEW_INQUIRY") {
      const sheetName = "Enquiries";
      let sheet = ss.getSheetByName(sheetName);
      
      // AUTO-CREATES COLUMNS IF THEY DONT EXIST
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow([
          "Timestamp (IST)", "Type", "Name", "Phone", "Email", 
          "Company", "Location", "Flavors", "Est. Qty", "Message"
        ]);
        sheet.getRange(1, 1, 1, 10).setFontWeight("bold");
      }

      sheet.appendRow([
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.type.toUpperCase(),
        data.name,
        "'" + data.phone,
        data.email,
        data.company || "",
        (data.city || "") + " " + (data.country || ""),
        data.flavors || "",
        data.estimatedQuantity || "",
        data.message
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}