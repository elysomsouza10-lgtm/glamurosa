const lista = document.getElementById("listaProdutos");
const carrinhoEl = document.getElementById("itensCarrinho");
const totalEl = document.getElementById("total");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

fetch("/api/produtos")
  .then((res) => res.json())
  .then((produtos) => {
    if (!lista) return;
    lista.innerHTML = produtos
      .map(
        (p) => `
      <div class="produto">
        <img src="${p.imagem}" width="200">
        <h3>${p.nome}</h3>
        <span>R$ ${p.preco}</span>
        <button onclick="add(${p.id})">Adicionar</button>
      </div>
    `,
      )
      .join("");

    window.add = (id) => {
      const produto = produtos.find((p) => p.id === id);
      carrinho.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Adicionado!");
    };
  });

function renderCarrinho() {
  if (!carrinhoEl) return;
  carrinhoEl.innerHTML = carrinho
    .map(
      (p, i) => `
    <div>${p.nome} - R$ ${p.preco}
      <button onclick="remove(${i})">X</button>
    </div>
  `,
    )
    .join("");

  totalEl.textContent = carrinho.reduce((a, p) => a + p.preco, 0);
}

window.remove = (i) => {
  carrinho.splice(i, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
};

renderCarrinho();

document.getElementById("btnCheckout")?.addEventListener("click", async () => {
  const total = carrinho.reduce((a, p) => a + p.preco, 0);
  const res = await fetch("/api/pagamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ total }),
  });
  const data = await res.json();
  document.getElementById("qrPix").src = `data:image/png;base64,${data.qrCode}`;
  document.getElementById("modalPagamento").style.display = "flex";
});

document.getElementById("btnPago")?.addEventListener("click", () => {
  localStorage.removeItem("carrinho");
  location.reload();
});
