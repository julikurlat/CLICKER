// Armar un quizz (juego de preguntas)
// Tiene que tener 3 a 4 preguntas
// Si se falla una pregunta, se termina el quizz
// Hacer un conteo de la cantidad de preguntas correctamente contestadas
// Si se superan los 2 puntos hay que regalar un jamón


let resultado = 0
let pregunta1 = prompt ( " de que color son los tomates? ").toLowerCase()
if (pregunta1 == "rojo"){
    resultado = resultado + 1
    let pregunta2 = prompt ( " de que color son las hormigas? ").toLowerCase()
    if (pregunta2 == "negro") {
        resultado = resultado + 1
        let pregunta3 = prompt ( " de que color es el cielo? ").toLowerCase()
        if (pregunta3 == "celeste" || pregunta3 == "azul"){
            resultado = resultado + 1
            let pregunta4 = prompt ( " de que color es el pasto? ").toLowerCase()
            if(pregunta4 == "verde"){
                resultado = resultado + 1
            alert (" completaste el quizz correctamente 🎉")
            }  else {
                alert ("perdiste, contestaste correctamente " + resultado + " preguntas")
            }
            
        } else {
            alert ("perdiste, contestaste correctamente " + resultado + " preguntas")
        }
        
    } else {
        alert ("perdiste, contestaste correctamente " + resultado + " preguntas")
    }
    
} else {
    alert ("perdiste, contestaste correctamente " + resultado + " preguntas")
}

if (resultado > 2){
    alert(" Te ganaste un jamón🐖")
}
