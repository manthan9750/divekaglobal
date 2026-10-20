# Environment Setup Guide

Follow these steps to configure the backend integrations for Divekaa Global.

## 1. Resend (Emails)
1. Go to [resend.com](https://resend.com) and create an account.
2. In the dashboard, go to **API Keys** and click **Create API Key**.
3. Name it "Divekaa Vercel" and give it "Full Access".
4. Copy the key and paste it as `RESEND_API_KEY` in your `.env.local` / Vercel.
5. *Note on `RESEND_FROM_EMAIL`:* If you do not verify a domain in Resend, you can only send emails to the email address registered with your Resend account. Leave `RESEND_FROM_EMAIL` empty in development; the customer email will silently skip. Once a domain is verified, set it to something like `Divekaa Global <orders@yourdomain.com>`.

## 2. Google Apps Script (Sheets)
1. Create a new Google Sheet named "Divekaa Global Operations".
2. In the menu, click **Extensions > Apps Script**.
3. Clear the default code and paste the entire contents of `docs/apps-script/Code.gs`.
4. Click the **Deploy** button (top right) > **New deployment**.
5. Select **Web app** as the type (click the gear icon if you don't see it).
6. Description: "Production Webhook v1".
7. Execute as: **Me**.
8. Who has access: **Anyone**. (Crucial step).
9. Click **Deploy**. Authorize the permissions (it will warn you about an unverified app, click Advanced > Go to... anyway).
10. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).
11. Paste this URL as `GOOGLE_SHEET_WEBAPP_URL` in your `.env.local` / Vercel.

## 3. UPI
1. Set `NEXT_PUBLIC_UPI_ID` to the owner's valid business/personal UPI ID.
2. If this is empty, the site automatically hides the UPI tab and only shows "Pay on Confirmation Call".

## 4. Vercel Deployment
1. Go to your Vercel project > Settings > Environment Variables.
2. Add all keys from your `.env.local`:
   - `RESEND_API_KEY`
   - `GOOGLE_SHEET_WEBAPP_URL`
   - `NOTIFICATION_EMAIL`
   - `NEXT_PUBLIC_UPI_ID`
   - `NEXT_PUBLIC_UPI_NAME`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. Click "Save" and trigger a new deployment.