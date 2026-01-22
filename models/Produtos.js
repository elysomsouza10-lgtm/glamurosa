const db = require("../db");

const Produto = db.sequelize.define("produtos", {
  nome: { type: db.Sequelize.STRING, allowNull: false },
  preco: { type: db.Sequelize.DOUBLE, allowNull: false },
  descricao: { type: db.Sequelize.TEXT, allowNull: false },
});

module.exports = Produto;
