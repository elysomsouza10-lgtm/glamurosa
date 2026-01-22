require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/produtos", require("./routes/produtos"));
app.use("/api/pagamento", require("./routes/pagamento"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Servidor rodando"));
