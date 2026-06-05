const productCards = document.querySelectorAll(".open-product");
const modal = document.querySelector(".product-modal");
const closeBtn = document.querySelector(".close-modal");

const popupImage = document.getElementById("popupImage");
const popupTitle = document.getElementById("popupTitle");
const popupPrice = document.getElementById("popupPrice");

productCards.forEach(card => {

card.addEventListener("click", () => {

popupImage.src = card.dataset.img;
popupTitle.innerText = card.dataset.name;
popupPrice.innerText = "₹" + card.dataset.price;

modal.classList.add("active");

document.body.style.overflow = "hidden";

});

});

closeBtn.addEventListener("click", () => {

modal.classList.remove("active");

document.body.style.overflow = "auto";

});

window.addEventListener("click", (e) => {

if(e.target === modal){

modal.classList.remove("active");

document.body.style.overflow = "auto";

}

});
