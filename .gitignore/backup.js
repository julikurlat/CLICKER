
//VARIABLES-------------

let monedas = 0
let monedas_perseg = 0.5;
let monedas_perclick = 1


//VARIABLES DEL DOM -------------

let btn_principal = document.querySelector(`img`);
let h2 = document.querySelector(`h2`);
let perseg = document.querySelector(`#perseg`);
let perclick = document.querySelector(`#perclick`);
let section_tienda = document.querySelector(`.tienda`);
let reset = document.querySelector(`.reset`)

// POTENCIADORES ---------------

class Comprable {
    constructor(nombre, precio, nivel, beneficio, img) {
        this.nombre = nombre;
        this.precio = precio;
        this.nivel = nivel;
        this.bloqueado = true;
        this.beneficio = beneficio;

        this.nodo;
        this.img = img;
    }
}

let potenciadores = [
    new Comprable(`CURSOR`, 80, 0, "+1 por click", "./img/cursor.png"),  //80
    new Comprable(`AUTOCLICK`, 200, 0, "+1 por segundo", "./img/reloj.png"), //200
    new Comprable(`SULLIVAN`, 400, 0, "+5 por click", "./img/sulivan.png"),
    new Comprable(`RANDAL`, 800, 0, "+5 por segundo", "./img/randal.png"),
    new Comprable(`ROZ`, 1500, 0, "+50 por click", "./img/roz.png"),
    new Comprable(`CELIA`, 3000, 0, "+50 por segundo", "./img/celia.png"),
    new Comprable(`BOO`, 5000, 0, "+100 por segundo", "./img/boo.png")
]

// FUNCIONES DE STORAGE--------------


function guardarDatos() {
    let datos = {
        monedas: monedas,
        monedas_perclick: monedas_perclick,
        monedas_perseg: monedas_perseg,
    };

    localStorage.setItem('datos', JSON.stringify(datos));
}


function cargarDatos() {
    let datosGuardados = JSON.parse(localStorage.getItem('datos'));


    if (datosGuardados) {
        monedas = datosGuardados.monedas || 0;
        monedas_perclick = datosGuardados.monedas_perclick || 0;
        monedas_perseg = datosGuardados.monedas_perseg || 0;

        actualizarInterfaz();
    }
}

function actualizarInterfaz() {
    h2.innerText = "$ " + monedas.toFixed(2);
    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
    perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
    habilitar_potenciador(monedas);
}



reset.addEventListener(`click`, () => {
    Toastify({

        text: "Monedas reiniciadas",
        
        duration: 3000,
        gravity: "top",
        position: "left", 
        style: {
            background: "red",
          }
        }).showToast();
        localStorage.clear()
        monedas = 0
        monedas_perclick = 1
        monedas_perseg = 0.5
        actualizarInterfaz()
        console.log(localStorage)
    });



//ACTUALIZACION DE MONEDAS------------
setInterval(() => {
    
    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
    perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
    monedas += monedas_perseg;
    h2.innerText = "$ " + monedas.toFixed(2);
    habilitar_potenciador(monedas)
    guardarDatos()
}, 1000);

// RENDERIZAR LOS POTENCIADORES----------
potenciadores.forEach((potenciador) => {
    let clon = document.querySelector('template').content.cloneNode(true).querySelector('button');
    clon.querySelector('h5').innerText = `$ ${potenciador.precio}`;
    clon.querySelector('img').src = potenciador.img;
    clon.id = potenciador.nombre;

    section_tienda.appendChild(clon);

    potenciador.nodo = document.querySelector(`#${potenciador.nombre}`);
})


cargarDatos()

btn_principal.addEventListener(`click`, () => {
    monedas += monedas_perclick;
    h2.innerText = "$ " + monedas.toFixed(2);
    habilitar_potenciador(monedas)
    guardarDatos()
});


// HABILITAR LOS POTENCIADORES------------------------
function habilitar_potenciador(cant_monedas) {
    pot_habilitados = potenciadores.filter((elm) => (elm.precio < cant_monedas) && elm.bloqueado)

    pot_habilitados.forEach((elm) => {
        elm.bloqueado = false;
        monedas_perclick += elm.nivel;

        elm.nodo.classList.remove(`bloqueado`);
        elm.nodo.classList.add(`btn`);
        elm.nodo.querySelector('img').classList.remove("imagen_bloqueada");
        elm.nodo.querySelector('img').src = `${elm.img}`;
        elm.nodo.querySelector('h3').innerText = `${elm.nombre}`;
        elm.nodo.querySelector('h4').innerText = `${elm.beneficio}`;
        elm.nodo.querySelector("h6").innerText = elm.nivel; // Mostrar nivel actual

        elm.nodo.addEventListener('click', () => {
            if (monedas >= elm.precio) {
                monedas -= elm.precio;
                elm.nivel++;
                h2.innerText = "$ " + monedas.toFixed(2);
                elm.nodo.querySelector("h6").innerText = elm.nivel;

                if (elm == potenciadores[0]) {
                    monedas_perclick += 1;
                    perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
                }
                if (elm == potenciadores[1]) {
                    monedas_perseg += 1
                    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                }
                if (elm == potenciadores[2]) {
                    monedas_perclick += 5;
                    perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
                }
                if (elm == potenciadores[3]) {
                    monedas_perseg += 5
                    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                }
                if (elm == potenciadores[4]) {
                    monedas_perclick += 50;
                    perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
                }
                if (elm == potenciadores[5]) {
                    monedas_perseg += 50
                    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                }
                if (elm == potenciadores[6]) {
                    monedas_perseg += 100
                    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                }
                
            }
        });

        setInterval(() => {
            if (elm.precio > monedas) {
                elm.nodo.classList.add(`bloqueado`);
                elm.nodo.classList.remove(`btn`);
            } else {
                elm.nodo.classList.remove(`bloqueado`);
                elm.nodo.classList.add(`btn`);
            }
        }, 100)
        guardarDatos()
    })
}


