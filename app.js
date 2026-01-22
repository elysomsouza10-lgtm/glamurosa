const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Listar produtos
app.get("/api/produtos", (req, res) => {
  fs.readFile(path.join(__dirname, "products.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Erro ao carregar produtos" });
    res.json(JSON.parse(data));
  });
});

// Detalhe de produto
app.get("/api/produtos/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "products.json"), "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Erro ao carregar produtos" });
    const produtos = JSON.parse(data);
    const produto = produtos.find((p) => p.id == req.params.id);
    if (!produto)
      return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
