// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

const SHIPPING = 50;


// ================= RENDER CART =================
function renderCart() {

  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty</p>
        <a href="products.html" class="btn">Shop Now</a>
      </div>
    `;
    updateTotals();
    return;
  }

  cart.forEach((item, index) => {

    cartItemsEl.innerHTML += `
      <div class="cart-item">

        <div class="cart-img">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <div class="qty-controls">
            <button onclick="decreaseQty(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>

        </div>

        <div class="cart-actions">
          <button onclick="removeItem(${index})">Remove</button>
        </div>

      </div>
    `;

  });

  updateTotals();
}


// ================= UPDATE TOTAL =================
function updateTotals() {

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
  });

  subtotalEl.innerText = `₹${subtotal}`;
  totalEl.innerText = `₹${subtotal + SHIPPING}`;
}


// ================= ADD QUANTITY =================
function increaseQty(index) {
  cart[index].qty += 1;
  saveCart();
}


// ================= DECREASE QUANTITY =================
function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
}


// ================= REMOVE ITEM =================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}


// ================= SAVE CART =================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


// INITIAL LOAD
renderCart();
