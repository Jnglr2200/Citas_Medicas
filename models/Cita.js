// models/Cita.js
const mongoose = require('mongoose');

const CitaSchema = mongoose.Schema({
    paciente: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Finalizada'],
        default: 'Pendiente'
    },
    creado_en: {
        type: Date,
        default: Date.now()
    }
});

// ¡Esta línea soluciona el error Cita.find is not a function!
module.exports = mongoose.model('Cita', CitaSchema);