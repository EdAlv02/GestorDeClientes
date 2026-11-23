import type { Request, Response } from "express";
import { initDb } from "../../database/db.js";

export const getClientes = async (
    req: Request,
    res: Response
) => {
    try {
        const db = await initDb();

        const clientes = await db.all(
            "SELECT * FROM cliente"
        );

        if (clientes.length === 0) {
            return res.status(404).json({
                message: "No se encontraron clientes",
            });
        }

        res.json(clientes);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error obteniendo clientes",
        });
    }
};

export const createCliente = async (
    req: Request,
    res: Response
) => {
    try {
        const { nombre_completo, email, telefono, empresa } =
            req.body;

        const db = await initDb();

        const result = await db.run(
            `
      INSERT INTO cliente
      (nombre_completo, email, telefono, empresa)
      VALUES (?, ?, ?, ?)
      `,
            [nombre_completo, email, telefono, empresa]
        );

        res.status(201).json({
            id: result.lastID,
            message: "Cliente creado",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error creando cliente",
        });
    }
};

export const updateCliente = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { nombre_completo, email, telefono, empresa } = req.body;

        const db = await initDb();

        const result = await db.run(
            `
      UPDATE cliente
      SET nombre_completo = ?, email = ?, telefono = ?, empresa = ?
      WHERE id = ?
      `,
            [nombre_completo, email, telefono, empresa, id]
        );

        res.json({
            message: "Cliente actualizado",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error actualizando cliente",
        });
    }
}

export const

deleteCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const db = await initDb();

        const result = await db.run(
            `
      DELETE FROM cliente
      WHERE id = ?
      `,
            [id]
        );

        res.json({
            message: "Cliente eliminado",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error eliminando cliente",
        });
    }
}