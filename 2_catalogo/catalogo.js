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
 