let items = JSON.parse(localStorage.getItem("items"))  || []

const agregarItem = (nombre,cantidad,precio) => {
    const item = {
        id:crypto.randomUUID(),
        fecha: new Date(),
        nombre,
        cantidad,
        precio
    }
    items.push(item)
    localStorage.setItem("items",JSON.stringify(items))
    return item
}

const borrarTarea = (id) => {
    items = items.filter(item => item.id != id)
    localStorage.setItem("items",JSON.stringify(items))
}

const actualizarItem = (id, nombreNuevoItem, cantidadNuevoItem, precioNuevoItem) => {
    items = items.map(item => {
        if (item.id === id) {
            return {
                ...item,
                nombre: nombreNuevoItem,
                cantidad: cantidadNuevoItem,
                precio: precioNuevoItem
            }
        }
        return item
    })
    localStorage.setItem("items", JSON.stringify(items))
}

const tarjetaItems = (item) => {
    const app = document.getElementById("app")
    const element = document.createElement("div")
    element.className = "contenido"
    element.innerHTML = `
        <input type="text" class="input input-nombre" value="${item.nombre}">
        <input type="number" class="input input-cantidad" value="${item.cantidad}">
        <input type="number" class="input input-precio" value="${item.precio}">
        <button class="boton btn-actualizar">Actualizar</button>
        <button class="boton btn-borrar" data-id="${item.id}">Borrar</button>
    `
    app.append(element)

    const btnBorrar = element.querySelector(".btn-borrar")
    btnBorrar.addEventListener("click", () => {
        borrarTarea(item.id)
        element.remove()
    })

    const btnActualizar = element.querySelector(".btn-actualizar")
    btnActualizar.addEventListener("click", () => {
        const nombreNuevoItem = element.querySelector(".input-nombre").value
        const cantidadNuevoItem = element.querySelector(".input-cantidad").value
        const precioNuevoItem = element.querySelector(".input-precio").value
        actualizarItem(item.id, nombreNuevoItem, cantidadNuevoItem, precioNuevoItem)
    })
}

const principal = () =>{

    items.forEach(item => {
        tarjetaItems(item)
    })
    const btnAgregarItem = document.getElementById("btnAgregarItem")
    btnAgregarItem.addEventListener("click",()=>{
        const nombreNuevoItem = document.getElementById("nombreNuevoItem")
        const cantidadNuevoItem = document.getElementById("cantidadNuevoItem")
        const precioNuevoItem = document.getElementById("precioNuevoItem")
        const item = agregarItem(nombreNuevoItem.value ,cantidadNuevoItem.value,precioNuevoItem.value)
        tarjetaItems(item)
        nombreNuevoItem.value = ""
        cantidadNuevoItem.value = ""
        precioNuevoItem.value = ""

    })

}

principal()