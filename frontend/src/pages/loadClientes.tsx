import { useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import { getClientes, updateCliente as updateClienteService, deleteCliente as deleteClienteService } from "../services/clientesService";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

function LoadClients() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [clienteEliminar, setClienteEliminar] =
        useState<Cliente | null>(null);

    useEffect(() => {
        async function fetchClientes() {
            const data = await getClientes();
            setClientes(data);
        }

        fetchClientes();
    }, []);

    const [openEdit, setOpenEdit] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] =
        useState<Cliente | null>(null);

    const updateCliente = (cliente: Cliente) => {

        setClienteSeleccionado(cliente);

        setNombre(cliente.nombre_completo);
        setEmail(cliente.email);
        setTelefono(cliente.telefono);
        setEmpresa(cliente.empresa);

        setOpenEdit(true);
    };

    const guardarCambios = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!clienteSeleccionado) return;

        await updateClienteService({
            id: clienteSeleccionado.id,
            nombre_completo: nombre,
            email,
            telefono,
            empresa
        });

        const data = await getClientes();

        setClientes(data);
        setOpenEdit(false);
        alert("Cliente actualizado correctamente");
        setClienteSeleccionado(null);
        setNombre("");
        setEmail("");
        setTelefono("");
        setEmpresa("");
    };

    const deleteCliente = (cliente: Cliente) => {
        setClienteEliminar(cliente);
        setOpenDelete(true);
    };

    const confirmarEliminar = async () => {

        if (!clienteEliminar) return;

        await deleteClienteService(
            clienteEliminar.id
        );

        const data = await getClientes();

        setClientes(data);

        setOpenDelete(false);

        setClienteEliminar(null);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#202020" }}>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#fff" }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#fff" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#fff" }}>Teléfono</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#fff" }}>Empresa</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "#fff" }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ backgroundColor: "#dad9d9" }}>
                        {clientes.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {cliente.nombre_completo}
                                </TableCell>

                                <TableCell sx={{ textAlign: "center" }}>
                                    {cliente.email}
                                </TableCell>

                                <TableCell sx={{ textAlign: "center" }}>
                                    {cliente.telefono}
                                </TableCell>

                                <TableCell sx={{ textAlign: "center" }}>
                                    {cliente.empresa}
                                </TableCell>

                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        sx={{ mr: 1 }}
                                        onClick={() => updateCliente(cliente)}
                                    >
                                        <EditNoteIcon />
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            deleteCliente(cliente)
                                        }
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Dialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            >
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                    Actualizar Cliente
                </DialogTitle>

                <DialogContent>
                    <form onSubmit={guardarCambios}>

                        <TextField
                            required
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Nombre Completo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <TextField
                            required
                            sx={{ mt: 2 }}
                            fullWidth
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            sx={{ mt: 2 }}
                            fullWidth
                            type="tel"
                            label="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        <TextField
                            required
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Empresa"
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                        />

                        <Button variant="contained" type="submit" color="primary" sx={{ mt: 2 }} fullWidth>
                            Guardar
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
            >
                <DialogTitle>
                    Confirmar eliminación
                </DialogTitle>

                <DialogContent>
                    ¿Seguro que deseas eliminar al cliente:

                    <strong>
                        {" "}
                        {clienteEliminar?.nombre_completo}
                    </strong>
                    ?
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setOpenDelete(false)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmarEliminar}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default LoadClients; 