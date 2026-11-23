import { Router } from "express";
import { initDb } from "../../database/db.js";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../controllers/clientes.controller.js";

const router = Router();

router.get("/", getClientes);
router.post("/", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;