let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    
    if (!nombre) {
        alert("Por favor, inserte un nombre.");
        return;
    }
    
    if (!amigos.includes(nombre)) {
        amigos.push(nombre);
        actualizarLista();
        input.value = "";
    }
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos dos participantes.");
        return;
    }
    
    let participantes = [...amigos];
    let asignaciones = {};
    let disponibles = [...amigos];
    
    for (let nombre of participantes) {
        let posibles = disponibles.filter(n => n !== nombre);
        
        if (posibles.length === 0) {
            sortearAmigo(); // Reiniciar si hay bloqueo
            return;
        }
        
        let indice = Math.floor(Math.random() * posibles.length);
        let asignado = posibles[indice];
        
        asignaciones[nombre] = asignado;
        disponibles.splice(disponibles.indexOf(asignado), 1);
    }
    
    mostrarResultados(asignaciones);
}

function mostrarResultados(asignaciones) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";
    
    for (let [amigo, asignado] of Object.entries(asignaciones)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        resultadoLista.appendChild(li);
    }
}
