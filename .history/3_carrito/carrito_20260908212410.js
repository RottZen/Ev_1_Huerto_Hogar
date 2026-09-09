function renderizarTablaCarrito() {
    const tabla = document.getElementById("tabla-carrito");
    const carrito = obtenerCarrito(); // función de datos.js

    tabla.innerHTML = ""; // limpiamos antes de redibujar

    if (carrito.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">El carrito está vacío.</td>
            </tr>
        `;
    } else {
        carrito.forEach(item => {
            const fila = document.createElement("tr");
            const totalItem = item.precio * item.cantidad;

            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>$${item.precio.toLocaleString("es-CL")}</td>
                <td style="max-width: 90px;">
                    <input
                        type="number"
                        min="1"
                        value="${item.cantidad}"
                        class="form-control form-control-sm"
                        onchange="cambiarCantidad('${item.codigo}', this.value)">
                </td>
                <td>$${totalItem.toLocaleString("es-CL")}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger"
                        onclick="quitarProducto('${item.codigo}')">
                        Eliminar
                    </button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    actualizarTotales();
}

// Actualiza el Subtotal y el Total a pagar en la columna derecha
function actualizarTotales() {
    const total = calcularTotalCarrito(); // función de datos.js

    document.getElementById("subtotal-carrito").textContent =
        `$${total.toLocaleString("es-CL")} CLP`;

    document.getElementById("total-pagar").textContent =
        `$${total.toLocaleString("es-CL")} CLP`;
    //FIX DEL CONTADOR DEL CARRITO EN EL HEADER
    const carrito = obtenerCarrito();
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badgeHeader = document.getElementById("contador-carrito");
    if (badgeHeader) {
        badgeHeader.textContent = cantidadTotal;
    }    
}

// Wrapper: cambia la cantidad y vuelve a dibujar la tabla completa
function cambiarCantidad(codProducto, nuevaCantidad) {
    const cantidad = parseInt(nuevaCantidad);

    if (isNaN(cantidad) || cantidad < 1) return; // ignora valores inválidos

    actualizarCantidad(codProducto, cantidad); // función de datos.js
    renderizarTablaCarrito();
}

// Wrapper: elimina el producto y vuelve a dibujar la tabla completa
function quitarProducto(codProducto) {
    eliminarDelCarrito(codProducto); // función de datos.js
    renderizarTablaCarrito();
}

function confirmarPedido() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de confirmar.");
        return;
    }

    // Aquí, más adelante, iría la lógica real de checkout
    // (guardar el pedido, generar boleta, redirigir, etc.)
    alert("¡Pedido confirmado! Gracias por tu compra en HuertoHogar.");

    localStorage.removeItem("carritoHuertoHogar");
    renderizarTablaCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarTablaCarrito();

    const botonConfirmar = document.getElementById("btn-confirmar");
    if (botonConfirmar) {
        botonConfirmar.addEventListener("click", confirmarPedido);
    }
});