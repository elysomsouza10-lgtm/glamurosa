const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      nome: "Feijoada Completa",
      preco: 35,
      imagem: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    },
    {
      id: 2,
      nome: "Strogonoff de Frango",
      preco: 28,
      imagem: "https://images.unsplash.com/photo-1604908177527-3e07f403b416",
    },
    {
      id: 3,
      nome: "Lasanha à Bolonhesa",
      preco: 32,
      imagem: "https://images.unsplash.com/photo-1604908177526-2d019e5f1d4d",
    },
  ]);
});

module.exports = router;
