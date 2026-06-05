// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistContainer = document.getElementById("wishlistContainer");


// ================= RENDER WISHLIST =================
function renderWishlist() {

  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="empty-wishlist">
        <p>No items in wishlist yet</p>
        <a href="products.html" class="btn">Explore Products</a>
      </div>
    `;
    return;
  }

  wishlist.forEach((item, index) => {

    wishlistContainer.innerHTML += `
      <div class="wishlist-item">

        <img src="${item.image}" alt="${item.name}">

        <div class="wishlist-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>

        <div class="wishlist-actions">
          <button onclick="addToCartFromWishlist(${index})">Add to Cart</button>
          <button onclick="removeFromWishlist(${index})">Remove</button>
        </div>

      </div>
    `;

  });
}


// ================= REMOVE ITEM =================
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  saveWishlist();
}


// ================= ADD TO CART FROM WISHLIST =================
function addToCartFromWishlist(index) {

  let item = wishlist[index];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(p => p.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");

}


// ================= SAVE =================
function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}


// INITIAL LOAD
renderWishlist();
