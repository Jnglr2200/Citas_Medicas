// controllers/citaController.js
const Cita = require('../models/Cita');

// 1. CREATE (POST)
exports.createCita = async (req, res) => {
    try {
        const nuevaCita = new Cita(req.body);
        await nuevaCita.save();
        res.status(201).json(nuevaCita);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Error al crear la cita. Verifique los datos.', error: error.message });
    }
};

// 2. READ (GET All)
exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.find().sort({ fecha: 1, hora: 1 }); 
        res.status(200).json(citas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor.');
    }
};

// 3. READ (GET by ID)
exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);

        if (!cita) {
            return res.status(404).json({ msg: 'Cita no encontrada.' });
        }
        res.status(200).json(cita);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'ID de cita inválido o no encontrado.' });
    }
};

// 4. UPDATE (PUT)
exports.updateCita = async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        
        let cita = await Cita.findById(id);

        if (!cita) {
            return res.status(404).json({ msg: 'Cita no encontrada para actualizar.' });
        }

        cita = await Cita.findByIdAndUpdate(id, nuevosDatos, { new: true });
        
        res.status(200).json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la cita.');
    }
};

// 5. DELETE (DELETE)
exports.deleteCita = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);

        if (!cita) {
            return res.status(404).json({ msg: 'Cita no encontrada para eliminar.' });
        }

        await Cita.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ msg: 'Cita eliminada correctamente.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la cita.');
    }
};