const productos = [
    {
        codigo: "FR001",
        nombre: "Manzanas Fuji",
        categoria: "frutas",
        precio: 1200,
        unidad: "kg",
        imagen: "../assets/img/manzana-fuji.jpg",
        descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.",
        origen: "Valle del Maule",
        stock: 150
    },
    {
        codigo: "FR002",
        nombre: "Naranjas Valencia",
        categoria: "frutas",
        precio: 1000,
        unidad: "kg",
        imagen: "../assets/img/naranjas-valencia.jpg",
        descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.",
        origen: "Chile",
        stock: 200
    },
    {
        codigo: "FR003",
        nombre: "Plátanos Cavendish",
        categoria: "frutas",
        precio: 800,
        unidad: "kg",
        imagen: "../assets/img/platanos-cavendish.jpg",
        descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.",
        origen: "Chile",
        stock: 250
    },
    {
        codigo: "VR001",
        nombre: "Zanahorias Orgánicas",
        categoria: "verduras",
        precio: 900,
        unidad: "kg",
        imagen: "../assets/img/zanahorias-organicas.jpg",
        descripcion: "Zanahorias crujientes cultivadas sin pesticidas. Excelente fuente de vitamina A y fibra.",
        origen: "Región de O'Higgins",
        stock: 100
    },
    {
        codigo: "VR002",
        nombre: "Espinacas Frescas",
        categoria: "verduras",
        precio: 700,
        unidad: "bolsa 500g",
        imagen: "../assets/img/espinacas-frescas.jpg",
        descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.",
        origen: "Chile",
        stock: 80
    },
    {
        codigo: "VR003",
        nombre: "Pimientos Tricolores",
        categoria: "verduras",
        precio: 1500,
        unidad: "kg",
        imagen: "../assets/img/pimientos-tricolores.jpg",
        descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.",
        origen: "Chile",
        stock: 120
    },
    {
        codigo: "PO001",
        nombre: "Miel Orgánica",
        categoria: "organicos",
        precio: 5000,
        unidad: "frasco 500g",
        imagen: "../assets/img/miel-organica.jpg",
        descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.",
        origen: "Región de La Araucanía",
        stock: 50
    },
    {
        codigo: "PO003",
        nombre: "Quinua Orgánica",
        categoria: "organicos",
        precio: 3200,
        unidad: "bolsa 1kg",
        imagen: "../assets/img/quinua-organica.jpg",
        descripcion: "Quinua orgánica, alta en proteínas y libre de gluten, ideal para una alimentación saludable.",
        origen: "Chile",
        stock: 35
    },
    {
        codigo: "PL001",
        nombre: "Leche Entera",
        categoria: "lacteos",
        precio: 1100,
        unidad: "litro",
        imagen: "../assets/img/leche-entera.jpg",
        descripcion: "Leche entera proveniente de granjas locales, rica en calcio y nutrientes esenciales.",
        origen: "Chile",
        stock: 90
    }
];
 
 
/* ------------------------------------------------------------
   2. FUNCIONES DEL CARRITO DE COMPRAS
   ------------------------------------------------------------ */
 
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem("carritoHuertoHogar");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}
 
function guardarCarrito(carrito) {
    localStorage.setItem("carritoHuertoHogar", JSON.stringify(carrito));
    actualizarContadorCarrito();
}
 
function agregarAlCarrito(codProducto, cantidad = 1) {
    const producto = productos.find(p => p.codigo === codProducto);
    if (!producto) {
        console.error("Producto no encontrado:", codProducto);
        return;
    }
 
    const carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.codigo === codProducto);
 
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }
 
    guardarCarrito(carrito); // antes se llamaba sin argumento y borraba el carrito
}
 
function eliminarDelCarrito(codProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.codigo !== codProducto);
    guardarCarrito(carrito);
    renderizarCarrito();
}
 
function actualizarCantidad(codProducto, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(item => item.codigo === codProducto);
 
    if (item && nuevaCantidad > 0) {
        item.cantidad = nuevaCantidad;
        guardarCarrito(carrito);
        renderizarCarrito();
    }
}
 
function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}
 
function actualizarContadorCarrito() {
    const contador = document.querySelector("#contador-carrito");
    if (!contador) return;
 
    const carrito = obtenerCarrito();
    const productosTotales = carrito.reduce((total, item) => total + item.cantidad, 0);
    contador.textContent = productosTotales;
}
 
 
/* ------------------------------------------------------------
   3. FUNCIONES DE RENDERIZADO (mostrar datos en el HTML)
   ------------------------------------------------------------ */
 
// Dibuja las tarjetas de productos (Bootstrap) en catalogo.html
function renderizarProductos(listaProductos = productos) {
    const contenedor = document.querySelector(".grid-productos");
    if (!contenedor) return;
 
    contenedor.innerHTML = "";
 
    if (listaProductos.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-secondary">No se encontraron productos.</p>`;
        return;
    }
 
    listaProductos.forEach(producto => {
        const columna = document.createElement("div");
        columna.classList.add("col");
        columna.innerHTML = `
            <div class="card h-100 shadow-sm tarjeta-producto">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-secondary small mb-1">${producto.origen}</p>
                    <p class="card-text fw-semibold">
                        $${producto.precio.toLocaleString("es-CL")} / ${producto.unidad}
                    </p>
                    <button class="btn btn-success mt-auto"
                        onclick="agregarAlCarrito('${producto.codigo}')">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(columna);
    });
}
 
function filtrarPorCategoria(categoria) {
    if (categoria === "todos") {
        renderizarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
}
 
// Dibuja el contenido del carrito en páginas que usen .lista-carrito
// (si carrito.html usa su propia tabla Bootstrap, ver carrito.js en su lugar)
function renderizarCarrito() {
    const contenedor = document.querySelector(".lista-carrito");
    if (!contenedor) return;
 
    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";
 
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        carrito.forEach(item => {
            const fila = document.createElement("div");
            fila.classList.add("item-carrito");
            fila.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <span>${item.nombre}</span>
                <input type="number" min="1" value="${item.cantidad}"
                    onchange="actualizarCantidad('${item.codigo}', parseInt(this.value))">
                <span>$${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                <button onclick="eliminarDelCarrito('${item.codigo}')">Eliminar</button>
            `;
            contenedor.appendChild(fila);
        });
    }
 
    const totalElemento = document.querySelector(".total-carrito");
    if (totalElemento) {
        totalElemento.textContent = `Total: $${calcularTotalCarrito().toLocaleString("es-CL")}`;
    }
}
 
 
/* ------------------------------------------------------------
   4. INICIALIZACIÓN
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarProductos();
    renderizarCarrito();
});
 