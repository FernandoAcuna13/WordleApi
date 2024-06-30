const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es"

let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let random = Math.random() * diccionario.length
random = Math.floor(random)
let palabrasecreta = diccionario [random]

fetch(API).then((response)=>{
    response.json().then((data)=>{
        palabrasecreta= data[0].toUpperCase();
        console.log(palabrasecreta)
    })
}).catch(()=>{
    console.log("ERROR")
})

let intentos = 5;
let juegoTerminado = false;

const button = document.getElementById("guess-button");

button.addEventListener("click", intentar);

function intentar() {
    if (juegoTerminado) {
        return;
    }
    
    const INTENTO = leerIntento();
    limpiarCampo();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabrasecreta) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabrasecreta[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabrasecreta.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    if (INTENTO === palabrasecreta) {
        mostrarMensaje("¡Ganaste! 😁", "ganaste");
        juegoTerminado = true;
        return;
    }

    intentos--;
    if (intentos === 0) {
        mostrarMensaje("Perdiste. La palabra era: " + palabrasecreta, "perdiste");
        juegoTerminado = true;
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function limpiarCampo() {
    document.getElementById("guess-input").value = " ";
}

function mostrarMensaje(mensaje, clase) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje ' + clase;
    mensajeDiv.innerHTML = mensaje;
    document.body.appendChild(mensajeDiv);
}



