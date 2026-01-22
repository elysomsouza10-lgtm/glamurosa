const express = require("express");
const bodyparse = require("body-parser");
const app = express();
const Produto = require("./models/Produtos"); // confere o nome do arquivo

app.use(express.json()); // OBRIGATÓRIO
app.use(bodyparse.urlencoded({ extended: false }));
app.use(bodyparse.json());

// Criar produto
app.post("/cadastro", function (req, res) {
  Produto.create({
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
  })
    .then(function () {
      res.send("cadastro com sucesso");
    })
    .catch(function (erro) {
      res.send("erro no produto" + erro);
    });
});
// Listar produtos
app.get("/", function (req, res) {
  Produto.findAll()
    .then(function (produtos) {
      res.send(produtos);
    })
    .catch(function (erro) {
      res.send("erro" + erro);
    });
});

app.get("/", function (req, res) {
  Produto.findAll({ where: { nome: req.params.nome } })
    .then(function () {
      res.send(Produto);
      res.send("deu certo");
    })
    .catch(function (erro) {
      res.send("produto não existe" + erro);
    });
});

app.patch("/atualizar/:id", function (req, res) {
  Produto.update(
    {
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    },
    { where: { id: req.params.id } },
  )
    .then(function () {
      res.send("sucesso");
    })
    .catch(function (erro) {
      res.send("deu erro" + erro);
    });
});

app.delete("/deletar/:id", function (req, res) {
  Produto.destroy({ where: { id: req.params.id } })
    .then(function () {
      res.send("deletado");
    })
    .catch(function (erro) {
      res.send("erro ao deletar" + erro);
    });
});

app.listen(8081, function () {
  console.log("rodando");
});
