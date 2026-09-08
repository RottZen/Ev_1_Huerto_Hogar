document.addEventListener('DOMContentLoaded',() => {
    const contenedorInicio = document.querySelector(".grid-productos");
    if (contenedorInicio){
        const productosDestacados = [...productos ]
        .sort (() => Math.random() - 0.5)
        .slice(0, 4);
        renderizarProductos(productosDestacados);
    }
  });    