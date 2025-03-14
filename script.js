let participantes = [];

function AgregarNombre() {
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();

    if (nombre === "") {
        mostrarError("Por favor, ingresa un nombre.");
        nombreInput.focus();
        return;
    }

    participantes.push(nombre);

    nombreInput.value = "";

    actualizarListaParticipantes();

    // Habilitar el botón de "Asignar Amigo" si hay al menos un nombre
    if (participantes.length > 0) {
        document.getElementById('btn-asignar').disabled = false;
    }

    // Habilitar el botón de reinicio cuando se agrega al menos un nombre
    document.getElementById('btn-reinicio').disabled = false;

    ocultarError();
}

function actualizarListaParticipantes() {
    const lista = document.getElementById('lista-participantes');
    lista.innerHTML = "";

    participantes.forEach((nombre) => {
        const li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function AsignarAmigo() {
    if (participantes.length === 0) {
        mostrarError("No hay nombres para asignar.");
        return;
    }

    // Seleccionar un nombre al azar
    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    const nombreSorteado = participantes[indiceAleatorio];

    // Mostrar el nombre sorteado
    document.getElementById('resultado').textContent = `¡El nombre asignado es: ${nombreSorteado}!`;

    // Eliminar el nombre sorteado de la lista
    participantes.splice(indiceAleatorio, 1);

    // Actualizar la lista de participantes
    actualizarListaParticipantes();

    // Deshabilitar el botón de "Asignar Amigo" si no quedan nombres
    if (participantes.length === 0) {
        document.getElementById('btn-asignar').disabled = true;
        document.getElementById('resultado').textContent += " ¡No quedan más nombres por asignar!";
    }
}

function ReiniciarJuego() {
    participantes = [];

    document.getElementById('lista-participantes').innerHTML = "";

    document.getElementById('resultado').innerHTML = "";

    document.getElementById('nombre').value = "";

    document.getElementById('btn-asignar').disabled = true;
    document.getElementById('btn-reinicio').disabled = true;

    alert("El juego ha sido reiniciado");
}

function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.id = "error-mensaje";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.margin = "5px 0";
    errorDiv.textContent = mensaje;

    const input = document.getElementById('nombre');
    input.insertAdjacentElement('afterend', errorDiv);
}

function ocultarError() {
    const errorDiv = document.getElementById('error-mensaje');
    if (errorDiv) {
        errorDiv.remove();
    }
}
