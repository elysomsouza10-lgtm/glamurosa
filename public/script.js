let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const listaProdutos = document.getElementById("listaProdutos");
const slider = document.getElementById("sliderProdutos");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalSpan = document.getElementById("total");
const btnCheckout = document.getElementById("btnCheckout");

// Carregar produtos da API
async function carregarProdutos() {
  const res = await fetch("/api/produtos");
  const produtos = await res.json();

  // Slider destaques (primeiros 3)
  slider.innerHTML = produtos
    .slice(0, 3)
    .map(
      (p) => `
    <div class="produto-card">
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <span>R$ ${p.preco.toFixed(2)}</span>
      <button onclick="adicionarCarrinho(${p.id})">Adicionar</button>
    </div>
  `,
    )
    .join("");

  // Lista completa
  listaProdutos.innerHTML = produtos
    .map(
      (p) => `
    <div class="produto-card">
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <span>R$ ${p.preco.toFixed(2)}</span>
      <button onclick="adicionarCarrinho(${p.id})">Adicionar</button>
    </div>
  `,
    )
    .join("");

  gsap.from(".produto-card", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
  });
}

// Carrinho
function atualizarCarrinho() {
  itensCarrinho.innerHTML = carrinho
    .map(
      (p, i) => `
    <div>
      ${p.nome} - R$ ${p.preco.toFixed(2)}
      <button onclick="removerDoCarrinho(${i})">❌</button>
    </div>
  `,
    )
    .join("");

  const total = carrinho.reduce((acc, p) => acc + p.preco, 0);
  totalSpan.textContent = total.toFixed(2);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(id) {
  fetch("/api/produtos")
    .then((res) => res.json())
    .then((produtos) => {
      const produto = produtos.find((p) => p.id === id);
      carrinho.push(produto);
      atualizarCarrinho();
    });
}

function removerDoCarrinho(i) {
  carrinho.splice(i, 1);
  atualizarCarrinho();
}

btnCheckout &&
  btnCheckout.addEventListener("click", () => {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    alert(
      `Compra finalizada! Total: R$ ${carrinho.reduce((acc, p) => acc + p.preco, 0).toFixed(2)}`,
    );
    carrinho = [];
    atualizarCarrinho();
  });

carregarProdutos();
atualizarCarrinho();
document.addEventListener("DOMContentLoaded", () => {
  // Header muda cor ao rolar
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // Slider cardápio
  const slider = document.getElementById("sliderProdutos");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let sliderIndex = 0;

  prev.addEventListener("click", () => {
    sliderIndex = Math.max(sliderIndex - 1, 0);
    slider.style.transform = `translateX(-${sliderIndex * 270}px)`;
  });

  next.addEventListener("click", () => {
    sliderIndex = Math.min(sliderIndex + 1, slider.children.length - 3);
    slider.style.transform = `translateX(-${sliderIndex * 270}px)`;
  });

  // Animações GSAP
  gsap.from(".hero-text h2", { y: -50, opacity: 0, duration: 1 });
  gsap.from(".hero-text p", { y: 50, opacity: 0, duration: 1, delay: 0.5 });
  gsap.from(".card", {
    scrollTrigger: {
      trigger: ".card",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
  });

  // Formulário contato
  const form = document.getElementById("formContato");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    form.reset();
  });
});
// Adiciona produtos ao localStorage
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-cart");
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
  }

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      const product = {
        nome: card.dataset.nome,
        preco: Number(card.dataset.preco),
      };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${product.nome} adicionado ao carrinho!`);
    });
  });

  updateCartCount();
});
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-cart");
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCount) cartCount.textContent = cart.length;
  }

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      const product = {
        nome: card.dataset.nome,
        preco: Number(card.dataset.preco),
      };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${product.nome} adicionado ao carrinho!`);
    });
  });

  updateCartCount();
});
