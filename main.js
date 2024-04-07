
// VARIABLES-------------

let monedas = 0;
let monedas_perseg = 0.5;
let monedas_perclick = 1;

// VARIABLES DEL DOM -------------

let btn_principal = document.querySelector(`img`);
let h2 = document.querySelector(`h2`);
let perseg = document.querySelector(`#perseg`);
let perclick = document.querySelector(`#perclick`);
let section_tienda = document.querySelector(`.tienda`);
let reset = document.querySelector(`.reset`);

// POTENCIADORES ---------------

class Comprable {
    constructor(nombre, precio, nivel, beneficio, img) {
        this.nombre = nombre;
        this.precio = precio;
        this.nivel = nivel;
        this.bloqueado = true;
        this.beneficio = beneficio;
        this.img = img;
        this.nodo;
    }
}

let potenciadores = [];

// FUNCIONES DE STORAGE--------------

function guardarDatos() {
    let datos = {
        monedas: monedas,
        monedas_perclick: monedas_perclick,
        monedas_perseg: monedas_perseg,
    };

    localStorage.setItem('datos', JSON.stringify(datos));
}

async function cargarDatos() {
    try {
        let response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Error al obtener los datos del archivo JSON');
        }
        let data = await response.json();

        
        potenciadores = data.potenciadores.map(pot => {
            return new Comprable(pot.nombre, pot.precio, pot.nivel, pot.beneficio, pot.img);
        });

        
        let datosGuardados = JSON.parse(localStorage.getItem('datos'));
        if (datosGuardados) {
            monedas = datosGuardados.monedas || 0;
            monedas_perclick = datosGuardados.monedas_perclick || 0;
            monedas_perseg = datosGuardados.monedas_perseg || 0;
        }

        actualizarInterfaz();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
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
    localStorage.clear();
    monedas = 0;
    monedas_perclick = 1;
    monedas_perseg = 0.5;
    actualizarInterfaz();
});

// ACTUALIZACION DE MONEDAS------------
setInterval(() => {
    perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
    perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
    monedas += monedas_perseg;
    h2.innerText = "$ " + monedas.toFixed(2);
    habilitar_potenciador(monedas);
    guardarDatos();
}, 1000);

// RENDERIZAR LOS POTENCIADORES----------
async function renderizarPotenciadores() {
    try {
        await cargarDatos(); 
        potenciadores.forEach(potenciador => {
            let clon = document.querySelector('template').content.cloneNode(true).querySelector('button');
            clon.querySelector('h5').innerText = `$ ${potenciador.precio}`;
            clon.querySelector('img').src = potenciador.img;
            clon.id = potenciador.nombre;
            section_tienda.appendChild(clon);
            potenciador.nodo = document.querySelector(`#${potenciador.nombre}`);
        });
    } catch (error) {
        console.error('Error al renderizar los potenciadores:', error);
    }
}

renderizarPotenciadores();

btn_principal.addEventListener(`click`, () => {
    monedas += monedas_perclick;
    h2.innerText = "$ " + monedas.toFixed(2);
    habilitar_potenciador(monedas);
    guardarDatos();
});

// HABILITAR LOS POTENCIADORES------------------------
function habilitar_potenciador(cant_monedas) {
    potenciadores.forEach(elm => {
        if (elm.precio < cant_monedas && elm.bloqueado) {
            elm.bloqueado = false;
            monedas_perclick += elm.nivel;

            let nodo = elm.nodo;
            nodo.classList.remove(`bloqueado`);
            nodo.classList.add(`btn`);
            nodo.querySelector('img').classList.remove("imagen_bloqueada");
            nodo.querySelector('img').src = elm.img;
            nodo.querySelector('h3').innerText = elm.nombre;
            nodo.querySelector('h4').innerText = elm.beneficio;
            nodo.querySelector("h6").innerText = elm.nivel; // Mostrar nivel actual

            nodo.addEventListener('click', () => {
                if (monedas >= elm.precio) {
                    monedas -= elm.precio;
                    elm.nivel++;
                    h2.innerText = "$ " + monedas.toFixed(2);
                    nodo.querySelector("h6").innerText = elm.nivel;
                    if (elm == potenciadores[0]) {
                        monedas_perclick += 1;
                        perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
                    } else if (elm == potenciadores[1]) {
                        monedas_perseg += 1;
                        perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                    } else if (elm == potenciadores[2]) {
                        monedas_perclick += 5;
                        perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
                    } else if (elm == potenciadores[3]) {
                        monedas_perseg += 5;
                        perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                    } else if (elm == potenciadores[4]) {
                        monedas_perclick += 50;
                        perclick.innerText = "CLICK POWER: + $" + monedas_perclick;
                    } else if (elm == potenciadores[5]) {
                        monedas_perseg += 50;
                        perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                    } else if (elm == potenciadores[6]) {
                        monedas_perseg += 100;
                        perseg.innerText = "$ " + monedas_perseg + ` por segundo`;
                    }
                    guardarDatos();
                }
            });

            setInterval(() => {
                if (elm.precio > monedas) {
                    nodo.classList.add(`bloqueado`);
                    nodo.classList.remove(`btn`);
                } else {
                    nodo.classList.remove(`bloqueado`);
                    nodo.classList.add(`btn`);
                }
            }, 100);
        }
    });
}