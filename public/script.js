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
