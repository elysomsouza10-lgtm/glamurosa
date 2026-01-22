document.addEventListener("DOMContentLoaded", () => {
  // Carrinho
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const cartCount = document.getElementById("cart-count");
  const listaProdutos = document.getElementById("listaProdutos");
  const slider = document.getElementById("sliderProdutos");
  const itensCarrinho = document.getElementById("itensCarrinho");
  const totalSpan = document.getElementById("total");
  const btnCheckout = document.getElementById("btnCheckout");
  const formContato = document.getElementById("formContato");

  // Atualizar carrinho
  function atualizarCarrinho() {
    if (itensCarrinho) {
      itensCarrinho.innerHTML = carrinho
        .map(
          (p, i) => `
        <div class="cart-item">
          ${p.nome} - R$ ${p.preco.toFixed(2)}
          <button onclick="removerDoCarrinho(${i})">❌</button>
        </div>
      `,
        )
        .join("");
    }
    if (totalSpan) {
      const total = carrinho.reduce((acc, p) => acc + p.preco, 0);
      totalSpan.textContent = total.toFixed(2);
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    if (cartCount) cartCount.textContent = carrinho.length;
  }

  // Adicionar produto ao carrinho
  window.adicionarCarrinho = function (produto) {
    carrinho.push(produto);
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  // Remover produto
  window.removerDoCarrinho = function (i) {
    carrinho.splice(i, 1);
    atualizarCarrinho();
  };

  // Checkout
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      if (carrinho.length === 0) return alert("Carrinho vazio!");
      alert(
        `Compra finalizada! Total: R$ ${carrinho
          .reduce((acc, p) => acc + p.preco, 0)
          .toFixed(2)}`,
      );
      carrinho = [];
      atualizarCarrinho();
    });
  }

  atualizarCarrinho();

  // Slider destaques e produtos
  async function carregarProdutos() {
    if (!listaProdutos && !slider) return;
    const res = await fetch("/api/produtos");
    const produtos = await res.json();

    if (slider) {
      slider.innerHTML = produtos
        .slice(0, 3)
        .map(
          (p) => `
        <div class="produto-card">
          <img src="${p.imagem}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <span>R$ ${p.preco.toFixed(2)}</span>
          <button onclick='adicionarCarrinho(${JSON.stringify(p)})'>Adicionar</button>
        </div>
      `,
        )
        .join("");
    }

    if (listaProdutos) {
      listaProdutos.innerHTML = produtos
        .map(
          (p) => `
        <div class="produto-card">
          <img src="${p.imagem}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <span>R$ ${p.preco.toFixed(2)}</span>
          <button onclick='adicionarCarrinho(${JSON.stringify(p)})'>Adicionar</button>
        </div>
      `,
        )
        .join("");
    }

    if (gsap) {
      gsap.from(".produto-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
      });
    }
  }

  carregarProdutos();

  // Header scroll
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }

  // Slider navegação
  if (slider) {
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    let sliderIndex = 0;

    if (prev && next) {
      prev.addEventListener("click", () => {
        sliderIndex = Math.max(sliderIndex - 1, 0);
        slider.style.transform = `translateX(-${sliderIndex * 270}px)`;
      });

      next.addEventListener("click", () => {
        sliderIndex = Math.min(sliderIndex + 1, slider.children.length - 3);
        slider.style.transform = `translateX(-${sliderIndex * 270}px)`;
      });
    }
  }

  // Formulário contato
  if (formContato) {
    formContato.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Mensagem enviada com sucesso!");
      formContato.reset();
    });
  }
});
