const productos = [
    {
        "Codigo": "FR001",
        "nombre": "Manzanas fuji",
        "categoria": "frutas",
        "precio": 1200,
        "unidad": "kg",
        "imagen": "../assets/img/manzana-fuji.jpg",
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
        "imagen": "../asset/img/naranjas-valencia.jpg",
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
        "imagen": "Ev_1_Huerto_Hogar\assets\img\Plátanos Cavendish.webp",
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
    guardarCarrito(carrito)
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
    const contador = document.querySelector("#contador-carrito");
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
        tarjeta.className = "col-12 col-md-6 col-lg-4 mb-4"; // Clases de grilla Bootstrap
        tarjeta.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-success">${producto.nombre}</h5>
                    <p class="text-muted small mb-2">${producto.origen}</p>
                    <p class="fs-5 fw-bold mb-3">$${producto.precio.toLocaleString("es-CL")} <span class="fs-6 fw-normal text-secondary">/ ${producto.unidad}</span></p>
                    <button class="btn btn-outline-success mt-auto w-100" onclick="agregarAlCarrito('${producto.Codigo}')">Agregar al carrito</button>
                </div>
            </div>
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
    const contenedor = document.querySelector("#tabla-carrito");
    if (!contenedor) return;
 
    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";
 
    if (carrito.length === 0) {
        contenedor.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">El carrito está vacío</td></tr>';
    } else {
        carrito.forEach(item => {
            const fila = document.createElement("tr");
            fila.classList.add("item-carrito");
            fila.innerHTML = `
                <td class="d-flex align-items-center">
                    <img src="${item.imagen}" alt="${item.nombre}" style="width : 50px; height: 50px; object-fit: cover;" class= "rounded me-2">
                    <span>${item.nombre}</span>
                </td>  
                <td>$${item.precio.toLocaleString("es-CL")}</td>
                <td>  
                    <input type="number" class="form-control form-control-sm" style="width: 70px;" min="1" value="${item.cantidad}"
                        onchange="actualizarCantidad('${item.Codigo}', parseInt(this.value))">

                </td>
                <td>
                    <span class="fw-bold text-success ms-2">
                    $${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                </td>
                <td>    
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${item.Codigo}')">Eliminar</button>
                </td>    
                `;
                contenedor.appendChild(fila);
            });
        }
    
    const totalElemento = document.querySelector("#total-carrito");
    const subtotalElemento = document.querySelector("#subtotal-carrito");

    if (totalElemento && subtotalElemento) {
        const totalCalculado = calcularTotalCarrito().toLocaleString("es-CL");
        subtotalElemento.textContent = `$${totalCalculado} CLP`;  
        totalElemento.textContent = `$${calcularTotalCarrito().toLocaleString("es-CL")}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarProductos();
    renderizarCarrito();
})