import { useState } from "react";
import { createCliente } from "../services/clientesService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function NewClient() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [empresa, setEmpresa] = useState("");

    const guardarCliente = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        await createCliente({
            nombre_completo: nombre,
            email: email,
            telefono: telefono,
            empresa: empresa
        });

        alert("Cliente creado");
        setNombre("");
        setEmail("");
        setTelefono("");
        setEmpresa("");
    };

    return (
        <>
            <form onSubmit={guardarCliente}>
                <TextField
                    required
                    id="outlined-required"
                    label="Nombre Completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    sx={{ m: 2 }}
                    fullWidth
                />
                <TextField
                    label="Email"
                    required
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ m: 2 }}
                />
                <TextField
                    label="Teléfono"
                    fullWidth
                    type="tel"
                    required
                    sx={{ m: 2 }}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <TextField
                    label="Empresa"
                    fullWidth
                    required
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    sx={{ m: 2 }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ m: 2 }}
                >
                    Guardar
                </Button>
            </form>
        </>
    );
}

export default NewClient;