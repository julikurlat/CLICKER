// - **Lista de tareas**
//     - Se pueden agregar tareas, enlistar las agregadas, eliminar y al enlistar ver la actualización de las tareas existentes (es decir que no veremos las que se eliminaron)+

let tareas = []


while (true){
    let accion = Number(prompt(`Seleeccione la opción que desea:
    1. Agregar nueva tarea
    2. Eliminar tarea
    3. Ver lista de tareas
    4. Salir del sistema
    `))


if(accion == 1){
let nueva_tarea = prompt("Escriba la tarea que desea agregar a la lista")
tareas.push({tarea: nueva_tarea ,orden: tareas.length + 1},)
// console.log(tareas[tareas.length - 1].orden + "- " + tareas[tareas.length - 1].tarea)
reordenar_lista()
mostrar_lista_tareas()

} else if (accion == 2){
    let tarea_eliminada = Number(prompt("Escriba el número de tarea que desea eliminar de la lista"))
    let buscar_tarea = tareas.find((tarea)=> tarea.orden == tarea_eliminada)
    if (buscar_tarea !== undefined){
        tareas = tareas.filter(tarea => tarea !== buscar_tarea);
        reordenar_lista()
        console.log(`La tarea número "${tarea_eliminada}" ha sido eliminada.`)
    }else{
        alert("Ese número de tarea no existe")
    }
    
} else if( accion == 3){
    reordenar_lista()
mostrar_lista_tareas()

} else if (accion == 4){
    break
} else {
alert("Elija una de las opciones existentes")
}
}


function mostrar_lista_tareas() {
    console.log("Lista de tareas:")
    tareas.forEach(tarea => {
        console.log(`${tarea.orden} - ${tarea.tarea}`);
    })
}

function reordenar_lista(){
    for (let i = 0; i < tareas.length; i++) {
        tareas[i].orden = i + 1;
    }
}