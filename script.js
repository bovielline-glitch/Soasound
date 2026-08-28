let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartContainer.appendChild(li);
    total += item.price;
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}
