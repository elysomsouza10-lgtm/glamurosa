document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.preco;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
        <button data-index="${index}" class="remove">Remover</button>
      `;
      cartItems.appendChild(div);
    });

    totalEl.textContent = total.toFixed(2);

    // Remove item
    document.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        cart.splice(btn.dataset.index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
    } else {
      alert("Pedido finalizado com sucesso!");
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.preco;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `<span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button data-index="${index}" class="remove">Remover</button>`;
      cartItems.appendChild(div);
    });
    totalEl.textContent = total.toFixed(2);
    document.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        cart.splice(btn.dataset.index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    alert("Pedido finalizado com sucesso!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });
});
