let partida = Number(prompt("Ingrese el número de jugadores (1 o 2)"))
let seguirJugando = true

let piedra = "1"
let papel = "2"
let tijera = "3"

while(seguirJugando) {
    if (partida === 2) {
        jugador1 = prompt("Nombre del primer jugador")
        jugador2 = prompt("Nombre del segundo jugador")
    }
    
    for (let i = 1; i <= 3; i++) {
        if (partida === 1) {
            alert("ROUND " + i)
            let opcionJugador = Number(prompt("Ingrese:\n1. Piedra\n2. Papel\n3. Tijera"))
            while(opcionJugador !== 1 && opcionJugador !== 2 && opcionJugador !== 3){
                alert("Por favor, ingrese un número válido");
                opcionJugador = Number(prompt("Ingrese:\n1. Piedra\n2. Papel\n3. Tijera"))
            }
            let opcionElegida = obtenerOpcionTexto(opcionJugador)
            console.log("Elegiste " + opcionElegida)

            let opcionMaquina = Math.floor(Math.random() * 3) + 1
            maquina(opcionMaquina)

            if (opcionMaquina == opcionJugador) {
                console.log("Empate en el round " + i + " 👀")
            } else if ((opcionMaquina == 1 && opcionJugador == papel) ||
                       (opcionMaquina == 2 && opcionJugador == tijera) ||
                       (opcionMaquina == 3 && opcionJugador == piedra)) {
                console.log("Ganaste el round " + i + " 🤩")
            } else {
                console.log("Perdiste el round " + i + " 😔")
            }
        } else if (partida === 2) {
            alert("ROUND " + i);
            let opcionJugador1 = Number(prompt(jugador1 + ": Ingrese:\n1. Piedra\n2. Papel\n3. Tijera"));
            while(opcionJugador1 !== 1 && opcionJugador1 !== 2 && opcionJugador1 !== 3){
                alert("Por favor, ingrese un número válido")
                opcionJugador1 = Number(prompt(jugador1 + ": Ingrese:\n1. Piedra\n2. Papel\n3. Tijera"));
            }
            let opcionJugador2 = Number(prompt(jugador2 + ": Ingrese:\n1. Piedra\n2. Papel\n3. Tijera"));
            while(opcionJugador2 !== 1 && opcionJugador2 !== 2 && opcionJugador2 !== 3){
                alert("Por favor, ingrese un número válido")
                opcionJugador2 = Number(prompt(jugador2 + ": Ingrese:\n1. Piedra\n2. Papel\n3. Tijera"));
            }
            let opcion1 = obtenerOpcionTexto(opcionJugador1)
            let opcion2 = obtenerOpcionTexto(opcionJugador2)
            console.log(jugador1 + " eligió " + opcion1)
            console.log(jugador2 + " eligió " + opcion2)
            if (opcionJugador1 === opcionJugador2) {
                console.log("Empate en el round " + i + " 👀");
            } else if ((opcionJugador1 === 1 && opcionJugador2 === 2) ||
                       (opcionJugador1 === 2 && opcionJugador2 === 3) ||
                       (opcionJugador1 === 3 && opcionJugador2 === 1)) {
                console.log(jugador1 + " ganó el round " + i + " 🤩")
            } else {
                console.log(jugador2 + " ganó el round " + i + " 😔")
            }
        } else {
            alert("Por favor, ingrese un número válido")
            break;
        }
    }
    seguirJugando = confirm("¿Quieres volver a jugar?")
}

function obtenerOpcionTexto(opcionJugador) {
    if (opcionJugador === 1) {
        return "piedra";
    } else if (opcionJugador === 2) {
        return "papel";
    } else if (opcionJugador === 3) {
        return "tijera";
    } else {
        return "opción inválida";
    }
}

function maquina(opcionMaquina) {
    if (opcionMaquina === 1) {
        console.log("El contrincante eligió piedra");
    } else if (opcionMaquina === 2) {
        console.log("El contrincante eligió papel");
    } else {
        console.log("El contrincante eligió tijera");
    }
}
