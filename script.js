// Theme toggle
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.className==="dark")
    {themeBtn.textContent="☀️"}
    else{{themeBtn.textContent="🌙"}}
  });
}

// Product data sample
const products = [
  { id: 1, name: "Smartphone", price: 699, image: "phoone.png" },
  { id: 2, name: "Headphones", price: 199, image: "headpone.png" },
  { id: 3, name: "Smart TV", price: 999, image: "tv.jpg" },
  { id: 4, name: "Perfumes", price: 909, image: "ppa.jpg"},
  { id: 5, name: "Watches", price: 672, image: "watch.jpg"},
  { id: 6, name: "Bottles",price: 89, image:"bottle.png"},
];

// Utilities to get & save cart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render products (on index / products page)
function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    const prod = products.find(p => p.id === id);
    cart.push({ ...prod, qty: 1 });
  }
  saveCart(cart);
  alert("Added to cart 👍");
}

// Render cart items
function renderCart() {
  const list = document.getElementById("cart-list");
  if (!list) return;
  const cart = getCart();
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p class="price">$${item.price}</p>
        <div class="qty-controls">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    list.appendChild(div);
  });
  const tot = document.getElementById("cart-total");
  if (tot) tot.textContent = "$" + total;
}

// Change quantity handler
function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) item.qty = 1;
  saveCart(cart);
  renderCart();
}

// Remove item from cart
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

// Auto-run on page load
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});