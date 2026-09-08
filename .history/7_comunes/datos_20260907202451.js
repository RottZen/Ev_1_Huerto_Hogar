const productos = [
    {
        "Codigo": "FR001",
        "nombre": "Manzanas fuji",
        "categoria": "frutas",
        "precio": 1200,
        "unidad": "kg",
        "imagen": "../img/manzanas-fuji.jpg",
        "descripcion": "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.",
        "origen": "Chile",
        "stock": 200
    },
    {
        "Codigo": "FR002",
        "nombre": "Naranjas Valencia",
        "categoria": "frutas",
        "precio": 1000,
        "unidad": "kg",
        "imagen": "../img/naranjas-valencia.jpg",
        "descripcion": "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.",
        "origen": "Chile",
        "stock": 200
    },
    {
        "Codigo": "FR003",
        "nombre": "Plátanos Cavendish",
        "categoria": "frutas",
        "precio": 800,
        "unidad": "kg",
        "imagen": "../img/platanos-cavendish.jpg",
        "descripcion": "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.",
        "origen": "Chile",
        "stock": 250
    },
    {
        "Codigo": "VR001",
        "nombre": "Zanahorias Orgánicas",
        "categoria": "verduras",
        "precio": 900,
        "unidad": "kg",
        "imagen": "../img/zanahorias-organicas.jpg",
        "descripcion": "Zanahorias crujientes cultivadas sin pesticidas. Excelente fuente de vitamina A y fibra.",
        "origen": "Región de O'Higgins",
        "stock": 100
    },
    {
        "Codigo": "VR002",
        "nombre": "Espinacas Frescas",
        "categoria": "verduras",
        "precio": 700,
        "unidad": "bolsa 500g",
        "imagen": "../img/espinacas-frescas.jpg",
        "descripcion": "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.",
        "origen": "Chile",
        "stock": 80
    },
    {
        "Codigo": "VR003",
        "nombre": "Pimientos Tricolores",
        "categoria": "verduras",
        "precio": 1500,
        "unidad": "kg",
        "imagen": "../img/pimientos-tricolores.jpg",
        "descripcion": "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.",
        "origen": "Chile",
        "stock": 120
    },
    {
        "Codigo": "PO001",
        "nombre": "Miel Orgánica",
        "categoria": "organicos",
        "precio": 5000,
        "unidad": "frasco 500g",
        "imagen": "../img/miel-organica.jpg",
        "descripcion": "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.",
        "origen": "Región de La Araucanía",
        "stock": 50
    },
    {
        "Codigo": "PO003",
        "nombre": "Quinua Orgánica",
        "categoria": "organicos",
        "precio": 3200,
        "unidad": "bolsa 1kg",
        "imagen": "../img/quinua-organica.jpg",
        "descripcion": "Quinua orgánica, alta en proteínas y libre de gluten, ideal para una alimentación saludable.",
        "origen": "Chile",
        "stock": 35
    },
    {
        "Codigo": "PL001",
        "nombre": "Leche Entera",
        "categoria": "lacteos",
        "precio": 1100,
        "unidad": "litro",
        "imagen": "../img/leche-entera.jpg",
        "descripcion": "Leche entera proveniente de granjas locales, rica en calcio y nutrientes esenciales.",
        "origen": "Chile",
        "stock": 90
    }
];


function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem("carritoHuertoHogar");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoHuertoHogar",JSON.stringify(carrito));
    actualizarContadorCarrito()
}

function agregarAlCarrito(codProducto,cantidad = 1) {
    const producto = productos.find(p => p.Codigo == codProducto);
    if (!producto){
        console.error("Producto no encontrado");
        return;
    }
    const carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.Codigo == codProducto);
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            "Codigo" : producto.Codigo,
            "nombre" : producto.nombre,
            "precio" : producto.precio,
            "imagen" : producto.imagen,
            "cantidad" : cantidad
        });
    }
    guardarCarrito()
}

function eliminarDelCarrito(codProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.Codigo !== codProducto);
    guardarCarrito(carrito);
    renderizarCarrito();
}

function actualizarCantidad(codProducto, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(item => item.Codigo === codProducto);
 
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
    const contador = document.querySelector(".contador-carrito");
    if (!contador) {
        return;
    }
    const carrito = obtenerCarrito();
    const productostotales = carrito.reduce((total, item) => total + item.cantidad, 0);
    contador.textContent = productostotales;
}

function renderizarProductos(listaProductos = productos) {
    const contenedor = document.querySelector(".grid-productos");
    if (!contenedor) return;
 
    contenedor.innerHTML = "";
 
    listaProductos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="origen">${producto.origen}</p>
            <p class="precio">$${producto.precio.toLocaleString("es-CL")} / ${producto.unidad}</p>
            <button class="btn" onclick="agregarAlCarrito(${producto.Codigo})">Agregar al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
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
 
// Dibuja el contenido del carrito en carrito.html
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
                    onchange="actualizarCantidad(${item.Codigo}, parseInt(this.value))">
                <span>$${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                <button onclick="eliminarDelCarrito(${item.Codigo})">Eliminar</button>
            `;
            contenedor.appendChild(fila);
        });
    }
 
    const totalElemento = document.querySelector(".total-carrito");
    if (totalElemento) {
        totalElemento.textContent = `Total: $${calcularTotalCarrito().toLocaleString("es-CL")}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarProductos();
    renderizarCarrito();
})