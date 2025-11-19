// app.js
const API_URL = 'http://localhost:4000/api/citas'; 
let editandoId = null;

// Elementos del DOM
const form = document.getElementById('cita-form');
const citasBody = document.getElementById('citas-body');
const formTitle = document.getElementById('form-title');
const btnCancelar = document.getElementById('cancelar-edicion');
const [pacienteInput, fechaInput, horaInput, motivoInput, estadoInput] = 
    ['paciente', 'fecha', 'hora', 'motivo', 'estado'].map(id => document.getElementById(id));

// ------------------------------------------
// 1. READ (Listar Todas las Citas)
// ------------------------------------------
async function listarCitas() {
    try {
        // Consumo Asíncrono: fetch con async/await
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const citas = await response.json();
        mostrarCitasEnDOM(citas); // Manipulación del DOM
    } catch (error) {
        console.error('Error al listar citas:', error);
        citasBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">No se pudo conectar con el servidor API.</td></tr>`;
    }
}

// Manipulación del DOM para mostrar la lista
function mostrarCitasEnDOM(citas) {
    citasBody.innerHTML = '';
    if (citas.length === 0) {
        citasBody.innerHTML = `<tr><td colspan="5" class="text-center">No hay citas programadas.</td></tr>`;
        return;
    }

    citas.forEach(cita => {
        const row = document.createElement('tr');
        const fechaHora = `${new Date(cita.fecha).toLocaleDateString()} a las ${cita.hora}`;
        const estadoClase = getColorByEstado(cita.estado);

        row.innerHTML = `
            <td>${cita.paciente}</td>
            <td>${fechaHora}</td>
            <td>${cita.motivo}</td>
            <td><span class="badge bg-${estadoClase}">${cita.estado}</span></td>
            <td>
                <button onclick="cargarCitaParaEdicion('${cita._id}')" class="btn btn-sm btn-warning me-2">Editar</button>
                <button onclick="eliminarCita('${cita._id}')" class="btn btn-sm btn-danger">Eliminar</button>
            </td>
        `;
        citasBody.appendChild(row);
    });
}

function getColorByEstado(estado) {
    switch(estado) {
        case 'Confirmada': return 'success';
        case 'Pendiente': return 'warning';
        case 'Cancelada': return 'danger';
        case 'Finalizada': return 'info';
        default: return 'secondary';
    }
}


// ------------------------------------------
// 2. CREATE / UPDATE (POST / PUT)
// ------------------------------------------
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        paciente: pacienteInput.value,
        fecha: fechaInput.value, 
        hora: horaInput.value,
        motivo: motivoInput.value,
        estado: estadoInput.value
    };

    try {
        let url = API_URL;
        let method = 'POST';
        let successMsg = 'Cita creada con éxito.';
        
        if (editandoId) { 
            url = `${API_URL}/${editandoId}`;
            method = 'PUT';
            successMsg = 'Cita actualizada con éxito.';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            alert(successMsg);
            form.reset();
            resetearModoEdicion();
            listarCitas();
        } else {
            const error = await response.json();
            alert(`Error al guardar la cita: ${error.msg || response.statusText}. Código: ${response.status}`);
        }
    } catch (error) {
        console.error('Error en la operación POST/PUT:', error);
        alert('No se pudo comunicar con el servidor.');
    }
});


// ------------------------------------------
// 3. DELETE (Eliminar Cita)
// ------------------------------------------
async function eliminarCita(id) {
    if (!confirm('¿Está seguro de que desea eliminar esta cita?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE' // DELETE /api/citas/:id
        });

        if (response.ok) {
            alert('Cita eliminada correctamente.');
            listarCitas();
        } else {
             const error = await response.json();
             alert(`Error al eliminar: ${error.msg}`);
        }
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
    }
}


// ------------------------------------------
// 4. Leer para Editar (GET by ID)
// ------------------------------------------
async function cargarCitaParaEdicion(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`); 
        
        if (!response.ok) {
            throw new Error('Cita no encontrada.');
        }

        const cita = await response.json();

        // Rellenar el formulario (Manipulación del DOM)
        pacienteInput.value = cita.paciente;
        fechaInput.value = new Date(cita.fecha).toISOString().substring(0, 10); 
        horaInput.value = cita.hora;
        motivoInput.value = cita.motivo;
        estadoInput.value = cita.estado; 
        
        // Establecer el modo edición
        editandoId = id;
        formTitle.textContent = 'Editar Cita Existente';
        btnCancelar.classList.remove('d-none');
        window.scrollTo(0, 0); 
        
    } catch (error) {
        console.error('Error al cargar cita para edición:', error);
        alert('No se pudo cargar la cita.');
    }
}


// ------------------------------------------
// 5. Cancelar Edición
// ------------------------------------------
btnCancelar.addEventListener('click', resetearModoEdicion);

function resetearModoEdicion() {
    editandoId = null;
    formTitle.textContent = 'Crear Nueva Cita';
    form.reset();
    btnCancelar.classList.add('d-none');
}

// Inicialización
listarCitas();