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
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 10000,
    },
  },
);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Deu certo conectar cara.......");
  } catch (erro) {
    console.log("erro ao conectar com o servidor" + errp);
  }
};

module.exports = {
  Sequelize,
  sequelize,
};
