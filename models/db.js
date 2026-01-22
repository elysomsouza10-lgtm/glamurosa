require("dotenv").config();
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
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

async () => {
  try {
    await sequelize.authenticate();
    console.log("Deu certo conectar cara.......");
  } catch (erro) {
    console.log("erro ao conectar com o servidor" + erro);
  }
};

module.exports = {
  Sequelize,
  sequelize,
};
