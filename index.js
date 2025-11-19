// index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); 
require('dotenv').config(); // Asegúrate de que esto cargue las variables antes de usarlas

const app = express();

// 1. Conectar a la base de datos
connectDB(); 

// Middleware (para que Express lea JSON)
app.use(cors());
app.use(express.json()); 

// 2. Definición de Rutas
app.use('/api/citas', require('./routes/citaRoutes')); 

// 3. Definir y arrancar el puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    // MENSAJE CRUCIAL
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});