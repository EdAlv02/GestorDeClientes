import express from "express";
import cors from "cors";
import { initDb } from "../database/db.js";
import clientesRoutes from "./routes/clientes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando"
  });
});

app.use("/api/clientes", clientesRoutes);


app.listen(3000, () => {
  console.log("Servidor ejecutándose en puerto 3000");
});
