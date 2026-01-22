const express = require("express");
const app = express();
const Produto = require("./models/Produtos"); // confere o nome do arquivo
const path = require("path");

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json()); // OBRIGATÓRIO

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
    res.status(500).send("algo deu errado...");
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
