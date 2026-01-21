require("dotenv").config();
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.MYSQLDB_DATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
  },
);

// 🔥 FUNÇÃO REALMENTE EXECUTADA
const conectarBanco = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco com sucesso");
  } catch (erro) {
    console.error("❌ Erro ao conectar no banco:", erro.message);
  }
};

// CHAMA A FUNÇÃO
conectarBanco();

module.exports = {
  Sequelize,
  sequelize,
};
