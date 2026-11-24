# Gestor de Clientes
Aplicación CRUD para la gestión de clientes desarrollada con:

* React
* TypeScript
* Vite
* Node.js
* Express
* SQLite

## Requisitos
* Node.js 22 o Superior
* npm

### Verificación de Instalacion
* > node -v
* > npm -v

## Instalacion
### Descargar o Clonar Repositorio
> git clone https://github.com/EdAlv02/GestorDeClientes.git
> 
> cd GestorDeClientes
### Backend
Entrar a la carpeta backend
> cd backend

Instalar Dependencias
> npm install

### Base de Datos
El proyecto utiliza SQLITE
> No es necesario instalar un servidor de base de datos. La base de datos se crea
> automáticamente al iniciar el backend por primera vez.

Tabla creada automáticamente: 
> Cliente

Archivo generado:
> backend/database/clientes.db

### Frontend 
Entrar a la carpeta frontend
> cd frontend

Instalar Dependencias
> npm install

## Ejecutar Backend
Dentro de la carpeta backend:

> npm run dev

### Servidor:
> http://localhost:3000

### API:
> http://localhost:3000/api/clientes

## Ejecutar Frontend
Dentro de la carpeta frontend:

> npm run dev

### Aplicación:
> http://localhost:5173

## Funcionalidades
### Clientes
* Crear cliente
* Consultar clientes
* Actualizar cliente
* Eliminar cliente
### Campos
* Nombre completo
* Email
* Teléfono
* Empresa

## Endpoints
### Obtener clientes
> GET /api/clientes
### Crear cliente
> POST /api/clientes

> Body:
> {
>  "nombre_completo": "Juan Pérez",
>  "email": "juan@test.com",
>  "telefono": "3312345678",
>  "empresa": "Mi Empresa"
> }

### Actualizar cliente
> PUT /api/clientes/:id
### Eliminar cliente
> DELETE /api/clientes/:id

## Tecnologías
### Frontend
* React
* TypeScript
* Material UI
* Axios
### Backend
* Node.js
* Express
* TypeScript
* SQLite
