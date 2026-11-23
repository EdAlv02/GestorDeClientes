import axios from "axios";
import type { Cliente } from "../types/Cliente";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const getClientes = async () => {
    const response = await api.get("/clientes");

    return response.data;
};

export const createCliente = async (
    cliente: Omit<Cliente, "id">
) => {
    const response = await api.post(
        "/clientes",
        cliente
    );

    return response.data;
};

export const updateCliente = async (
  cliente: Cliente
) => {

  const response = await api.put(
    `/clientes/${cliente.id}`,
    cliente
  );

  return response.data;
};

export const deleteCliente = async (id: number) => {
  const response = await api.delete(
    `/clientes/${id}`
  );

  return response.data;
};
