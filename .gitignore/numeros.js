let continuar = true

while (continuar) {
let parametro1 = Number(prompt("Ingrese el primer parámetro del número aleatorio que desea obtener"));

while (isNaN(parametro1)) { 
    alert('Por favor ingrese un número' ) 
    parametro1 = Number(prompt("Ingrese el primer parámetro del número aleatorio que desea obtener"))
    continue 
}

let parametro2 = Number(prompt("Ingrese el segundo parámetro del número aleatorio que desea obtener"));

while (isNaN(parametro2) ) { 
    alert('Por favor ingrese un número' ) 
    parametro2 = Number(prompt("Ingrese el segundo parámetro del número aleatorio que desea obtener"))
    continue 
}

function numeroAleatorio(parametro1, parametro2) {
    return Math.floor(Math.random() * (parametro2 - parametro1 + 1)) + parametro1;
}

function esParOImpar(numero) {
    if (numero % 2 === 0) {
        return "Tu número es par";
    } else {
        return "Tu número es impar";
    }
}

let numero = numeroAleatorio(parametro1, parametro2);
console.log(numero);
console.log(esParOImpar(numero));

while (confirm("¿Desea obtener otro número entre esos parámetros?")) {
    numero = numeroAleatorio(parametro1, parametro2);
    console.log(numero);
    console.log(esParOImpar(numero));
}

continuar = confirm( "Desea ingresar nuevos paramretros?")

}

console.log("Fin del programa")




