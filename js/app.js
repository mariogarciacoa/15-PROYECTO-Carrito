//VARIABLES
const carrito = document.querySelector("#carrito")
const listaCursos = document.querySelector("#lista-cursos")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
let articulosCarrito = []

//Eventos

cargarEventListeners()

function cargarEventListeners() {

    // Agregar curso al carrtio
  listaCursos.addEventListener("click", agregarCurso)
    //Eliminar curso del carrito
  carrito.addEventListener("click", eliminarCurso)

    //Recupera los articulos guardados en localStorage
  document.addEventListener("DOMContentLoaded", () => {
    
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHtml()
  })

    //vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
     articulosCarrito = []

     limpiarHtml()
  })
}

//FUNCIONES

function agregarCurso(e) {
  e.preventDefault()

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado)
  }
}

//Eliminar Curso

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id")

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId)

    carritoHtml()
  }
}

//LEER DATOS DEL CURSO

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  }

  //Revisa si ya existe el articulo en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id)

  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++
        return curso //retorna el objeto actualizado
      } else {
        return curso //retorna el objeto no actualizado
      }
    })

    articulosCarrito = [...cursos]
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso]
  }

  console.log(articulosCarrito)

  carritoHtml()
}

function carritoHtml() {
  //Limpia el Html
  limpiarHtml()

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso

    const row = document.createElement("tr")
    row.innerHTML = `
        <td><img src="${imagen}" width="100px"'></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>`

    contenedorCarrito.appendChild(row)
  })

  //Sincronizar con LocalStorage
  sincronizarStorage()

}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}


//Limpia el tbody
function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}
