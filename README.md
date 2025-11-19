# Sistema de Gestión de Citas Médicas CRUD

Este proyecto implementa un sistema básico de gestión de información (CRUD - Crear, Leer, Actualizar, Eliminar) para citas médicas. Se compone de un **Backend** RESTful con Node.js y MongoDB, y un **Frontend** con JavaScript puro.

---

## Tecnologías Utilizadas

### Backend (API RESTful)
* **Node.js & Express**
* **MongoDB Atlas & Mongoose**
* **dotenv**
* **cors**

### Frontend (Cliente Web)
* **HTML5, CSS3, JavaScript (Vanilla)**
* **Async/Await & Fetch**
* **Bootstrap**

---

## Instalación y Ejecución

Para iniciar el sistema completo, debe ejecutar el Backend y luego abrir el Frontend en el navegador:

### 1. Iniciar el Backend (API)

1.  Navegue a la carpeta `gestion-citas-backend`.
2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Variables de Entorno:**
    Cree un archivo `.env` en la raíz del proyecto con la conexión a su base de datos y el puerto de escucha:
    ```
    # .env
    MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.xyz.mongodb.net/gestioncitasDB?retryWrites=true&w=majority
    PORT=4000
    ```
4.  **Iniciar el Servidor:**
    ```bash
    node index.js
    ```
    El servidor se ejecutará en **http://localhost:4000**.

### 2. Iniciar el Frontend (Cliente Web)

1.  Asegúrese de que el Backend esté ejecutándose.
2.  Abra el archivo **`index.html`** de la carpeta Frontend directamente en su navegador.
3.  El cliente web se conectará automáticamente a la API para cargar la visualización de citas.

---

## Estructura del Proyecto y Rutas de la API

### Estructura de Carpetas

gestion-citas-backend/ ├── config/ ├── controllers/ ├── models/ ├── routes/ ├── .env ├── index.js ├── package.json └── gestion-citas-frontend/ ├── index.html ├── app.js └── style.css


### Rutas de la API (Endpoint Base: `/api/citas`)

| Método HTTP | Ruta | Controlador | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/citas` | `getAllCitas` | Obtener todas las citas. |
| **GET** | `/api/citas/:id` | `getCitaById` | Obtener una cita específica por su ID. |
| **POST** | `/api/citas` | `createCita` | Crear una nueva cita (requiere JSON en el body). |
| **PUT** | `/api/citas/:id` | `updateCita` | Actualizar los datos de una cita existente. |
| **DELETE** | `/api/citas/:id` | `deleteCita` | Eliminar una cita por su ID. |