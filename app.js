const express = require("express");
const app = express();
const db = require("./db");
const Produto = require("./models/Produtos");

app.use(express.json());

(async () => {
  try {
    await db.sequelize.sync();
    console.log("✅ Banco sincronizado");
  } catch (erro) {
    console.error("❌ Erro ao sincronizar:", erro);
  }
})();

// Criar produto
app.post("/cadastro", async (req, res) => {
  try {
    await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    });

    res.status(201).send("deu certo");
  } catch (erro) {
    res.status(400).send("deu erro: " + erro.message);
  }
});

// Listar produtos
app.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (erro) {
    console.error("❌ ERRO REAL:", erro);
    res.status(500).json({
      mensagem: "algo deu errado",
      erro: erro.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Servidor rodando");
});
