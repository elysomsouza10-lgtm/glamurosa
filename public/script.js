document.addEventListener("DOMContentLoaded", () => {
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

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const itensCarrinho = document.getElementById("itensCarrinho");
  const totalSpan = document.getElementById("total");
  const btnCheckout = document.getElementById("btnCheckout");
  const qrContainer = document.getElementById("qrCodeContainer");
  const resumoPedido = document.getElementById("resumoPedido");
  const cartCount = document.getElementById("cart-count");

  const qrModal = document.getElementById("qrModal");
  const btnPagamentoConcluido = document.getElementById(
    "btnPagamentoConcluido",
  );
  const spanClose = document.querySelector(".close");

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

  window.adicionarCarrinho = function (id) {
    const produto = produtos.find((p) => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  window.removerDoCarrinho = function (i) {
    carrinho.splice(i, 1);
    atualizarCarrinho();
  };

  // Checkout → abrir modal e gerar QR code
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      if (carrinho.length === 0) return alert("Carrinho vazio!");

      // Mostrar modal
      qrModal.style.display = "block";

      // Limpar containers
      qrContainer.innerHTML = "";
      resumoPedido.innerHTML = "";

      // Resumo do pedido
      carrinho.forEach((p) => {
        const div = document.createElement("div");
        div.innerHTML = `<span>${p.nome}</span><span>R$ ${p.preco.toFixed(2)}</span>`;
        resumoPedido.appendChild(div);
      });

      const total = carrinho.reduce((acc, p) => acc + p.preco, 0).toFixed(2);
      const divTotal = document.createElement("div");
      divTotal.style.fontWeight = "bold";
      divTotal.innerHTML = `<span>Total</span><span>R$ ${total}</span>`;
      resumoPedido.appendChild(divTotal);

      // Gerar QR code (link fictício PIX)
      const pagamentoLink = `https://pix.exemplo.com.br/pagar?valor=${total}`;
      new QRCode(qrContainer, {
        text: pagamentoLink,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
      });
    });
  }

  // Fechar modal
  spanClose.onclick = () => (qrModal.style.display = "none");
  window.onclick = (e) => {
    if (e.target == qrModal) qrModal.style.display = "none";
  };

  // Pagamento concluído
  btnPagamentoConcluido.addEventListener("click", () => {
    alert("Pagamento concluído com sucesso!");
    carrinho = [];
    atualizarCarrinho();
    qrModal.style.display = "none";
  });

  atualizarCarrinho();
});
