document.addEventListener("DOMContentLoaded", () => {
  // Produtos estáticos
  const produtos = [
    {
      id: 1,
      nome: "Feijoada Completa",
      preco: 35,
      imagem:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      nome: "Strogonoff de Frango",
      preco: 28,
      imagem:
        "https://images.unsplash.com/photo-1604908177527-3e07f403b416?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      nome: "Lasanha à Bolonhesa",
      preco: 32,
      imagem:
        "https://images.unsplash.com/photo-1604908177526-2d019e5f1d4d?auto=format&fit=crop&w=500&q=60",
    },
  ];

  // Carrinho
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const listaProdutos = document.getElementById("listaProdutos");
  const slider = document.getElementById("sliderProdutos");
  const itensCarrinho = document.getElementById("itensCarrinho");
  const totalSpan = document.getElementById("total");
  const btnCheckout = document.getElementById("btnCheckout");
  const cartCount = document.getElementById("cart-count");

  // Atualizar carrinho
  function atualizarCarrinho() {
    if (itensCarrinho) {
      itensCarrinho.innerHTML = carrinho
        .map(
          (p, i) =>
            `<div class="cart-item">${p.nome} - R$ ${p.preco.toFixed(2)} <button onclick="removerDoCarrinho(${i})">❌</button></div>`,
        )
        .join("");
    }
    if (totalSpan)
      totalSpan.textContent = carrinho
        .reduce((acc, p) => acc + p.preco, 0)
        .toFixed(2);
    if (cartCount) cartCount.textContent = carrinho.length;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  // Adicionar
  window.adicionarCarrinho = function (id) {
    const produto = produtos.find((p) => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  // Remover
  window.removerDoCarrinho = function (i) {
    carrinho.splice(i, 1);
    atualizarCarrinho();
  };

  // Checkout
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      if (carrinho.length === 0) return alert("Carrinho vazio!");
      alert(
        `Compra finalizada! Total: R$ ${carrinho.reduce((acc, p) => acc + p.preco, 0).toFixed(2)}`,
      );
      carrinho = [];
      atualizarCarrinho();
    });
  }

  atualizarCarrinho();

  // Carregar produtos
  if (listaProdutos) {
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
  }

  if (slider) {
    slider.innerHTML = produtos
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

    if (gsap)
      gsap.from(".produto-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
      });
  }

  // Header scroll
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }
});
