import './App.css'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import LoadClients from "./pages/loadClientes";
import NewClient from "./pages/newCliente";

function App() {

  type Vista =
    | "clientes"
    | "nuevo"
    | "actualizar"
    | "eliminar"
    | "";

  const [vistaActual, setVistaActual] = useState<Vista>("");

  return (
    <>
      <h1>Gestor de Clientes</h1>

      <Box sx={{ m: 2 }}>
        <Grid container rowSpacing={2} columnSpacing={2} sx={{ m: 'auto' }}>
          <Grid size={6}>
            <Fab variant="extended" sx={{ width: '100%' }} color="primary" onClick={() => setVistaActual("clientes")}>
              Clientes
            </Fab>
          </Grid>
          <Grid size={6}>
            <Fab variant="extended" sx={{ width: '100%' }} color="primary" onClick={() => setVistaActual("nuevo")}>
              Nuevo
            </Fab>
          </Grid>
        </Grid>

        <Box sx={{ m: 2 }}>

          {vistaActual === "clientes" && (
            <LoadClients />
          )}

          {vistaActual === "nuevo" && (
            <NewClient />
          )}

        </Box>

      </Box>
    </>
  )
}

export default App
