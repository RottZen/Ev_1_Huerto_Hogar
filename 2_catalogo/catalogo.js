
function buscarProductos(texto) {
    const textoBusqueda = texto.trim().toLowerCase();

    if (textoBusqueda === "") {
        renderizarProductos(productos); // sin texto, muestra todo
        return;
    }

    const resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    renderizarProductos(resultados);
}


function marcarFiltroActivo(botonSeleccionado) {
    document.querySelectorAll(".filtros-categoria .btn, .btn-group .btn")
        .forEach(boton => boton.classList.remove("active"));

    botonSeleccionado.classList.add("active");
}

function seleccionarCategoria(categoria, boton) {
    filtrarPorCategoria(categoria); // función de datos.js
    marcarFiltroActivo(boton);

    const buscador = document.getElementById("buscador-productos");
    if (buscador) buscador.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar catálogo mostrando todos los productos
    if (document.querySelector(".grid-productos")) {
        renderizarProductos(productos);
    }
});
