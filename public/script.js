document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaProdutos");
  const form = document.getElementById("formCadastro");
  const slider = document.getElementById("sliderProdutos");

  // Função para listar todos produtos
  async function listarProdutos() {
    lista.innerHTML = "Carregando...";
    slider.innerHTML = "";
    try {
      const res = await fetch("http://localhost:8081/");
      const produtos = await res.json();

      if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
      }

      // Slider com destaques (primeiros 5)
      produtos.slice(0, 5).forEach((p) => {
        slider.innerHTML += `
          <div class="produto-card">
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <span>R$ ${p.preco.toFixed(2)}</span>
          </div>
        `;
      });

      // Lista completa
      lista.innerHTML = produtos
        .map(
          (p) => `
        <div class="produto-card">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <span>R$ ${p.preco.toFixed(2)}</span>
        </div>
      `,
        )
        .join("");

      // Animações GSAP
      gsap.from(".produto-card", {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.2,
      });
      gsap.from(".slider .produto-card", {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.2,
      });
    } catch (err) {
      lista.innerHTML = "Erro ao carregar produtos.";
    }
  }

  // Formulário de cadastro
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const descricao = document.getElementById("descricao").value;

    try {
      const res = await fetch("http://localhost:8081/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco, descricao }),
      });

      if (res.ok) {
        alert("Produto cadastrado!");
        form.reset();
        listarProdutos();
      } else {
        const msg = await res.text();
        alert("Erro: " + msg);
      }
    } catch (err) {
      alert("Erro ao cadastrar: " + err);
    }
  });

  listarProdutos();

  // Animações do hero e header
  gsap.from("header", { y: -100, opacity: 0, duration: 1 });
  gsap.from(".hero-text h2", { y: 50, opacity: 0, duration: 1, delay: 0.5 });
  gsap.from(".hero-text p", { y: 50, opacity: 0, duration: 1, delay: 0.7 });
  gsap.from(".hero-text .btn", { y: 50, opacity: 0, duration: 1, delay: 0.9 });

  // ScrollTrigger para seções
  gsap.utils
    .toArray(".produtos, .produtos-destaque, .cadastro")
    .forEach((section) => {
      gsap.from(section, {
        scrollTrigger: section,
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });
    });
});
