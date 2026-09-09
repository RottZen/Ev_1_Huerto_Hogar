
function buscarProductos(texto) {
    const textoBusqueda = texto.trim().toLowerCase();

    if (textoBusqueda === "") {
        renderizarProductos(productos); 
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
    filtrarPorCategoria(categoria); 
    marcarFiltroActivo(boton);

    const buscador = document.getElementById("buscador-productos");
    if (buscador) buscador.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    
    if (document.querySelector(".grid-productos")) {
        renderizarProductos(productos);
    }
});
