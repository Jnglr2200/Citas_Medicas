// config/db.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // <-- Importante: si db.js no está en la raíz, la ruta puede cambiar

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // MENSAJE CRUCIAL
        console.log(`MongoDB Conectado: ${conn.connection.host}`); 
    } catch (error) {
        console.error(`Error de Conexión: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;