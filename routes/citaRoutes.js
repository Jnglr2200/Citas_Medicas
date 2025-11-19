// routes/citaRoutes.js
const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
// Definición de las 5 Rutas (CRUD)

// Ruta base definida en index.js: /api/citas

// 1. Crear una Cita (POST)
router.post('/', citaController.createCita);
// 2. Obtener TODAS las Citas (GET)
router.get('/', citaController.getAllCitas); // ¡Asegúrate de que citaController.getAllCitas sea una función!
// 3. Obtener una Cita Específica por ID (GET)
router.get('/:id', citaController.getCitaById);
// 4. Actualizar una Cita por ID (PUT)
router.put('/:id', citaController.updateCita);

// 5. Eliminar una Cita por ID (DELETE)
router.delete('/:id', citaController.deleteCita);

module.exports = router;