require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const tasksRouter = require("./routes/tasks");

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
