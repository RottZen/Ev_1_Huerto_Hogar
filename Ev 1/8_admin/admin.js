document.addEventListener('DOMContentLoaded', () => {
    renderizarTablaAdmin();

    const formNuevo = document.getElementById("form-nuevo-producto");
    if (formNuevo) {
        formNuevo.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nuevoProducto = {
                codigo: document.getElementById("prod-codigo").value.trim().toUpperCase(),
                nombre: document.getElementById("prod-nombre").value.trim(),
                categoria: document.getElementById("prod-categoria").value,
                precio: parseInt(document.getElementById("prod-precio").value),
                stock: parseInt(document.getElementById("prod-stock").value),
                unidad: document.getElementById("prod-unidad").value.trim(),
                imagen: document.getElementById("prod-imagen").value.trim(),
                descripcion: "Agregado desde el panel de administrador",
                origen: "Local"
            };

            // Agregamos el producto al inicio del arreglo global "productos" de datos.js
            productos.unshift(nuevoProducto); 
            renderizarTablaAdmin();
            
            // Cerrar el modal de Bootstrap
            const modalEl = document.getElementById('modalNuevoProducto');
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
            
            formNuevo.reset();
        });
    }
});
function renderizarTablaAdmin() {
    const tbody = document.querySelector('#tabla-admin-productos');
    if (!tbody) return;
    tbody.innerHTML = "";

    
    productos.forEach(producto => {
        
        
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td class="fw-bold text-secondary">${producto.codigo}</td>
            <td>
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-admin-miniatura">
            </td>
            <td class="fw-bold">${producto.nombre}</td>
            <td class="text-capitalize">${producto.categoria}</td>
            <td>$${producto.precio.toLocaleString("es-CL")}</td>
            <td>
                <span class="badge bg-info text-dark">${producto.stock} un.</span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="abrirModalEditar('${producto.codigo}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="abrirModalEliminar('${producto.codigo}')">Eliminar</button>
            </td>
        `;

        tbody.appendChild(fila);
    }); 
}

// Funciones para abrir los modales de Editar y Eliminar
window.abrirModalEditar = function(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;
    
    document.getElementById("edit-prod-codigo").value = producto.codigo;
    document.getElementById("edit-prod-nombre").value = producto.nombre;
    document.getElementById("edit-prod-precio").value = producto.precio;
    
    const modalEl = document.getElementById('modalEditarProducto');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.show();
};

window.abrirModalEliminar = function(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;
    
    document.getElementById("eliminar-prod-codigo").value = producto.codigo;
    document.getElementById("eliminar-prod-nombre").textContent = producto.nombre;
    
    const modalEl = document.getElementById('modalEliminarProducto');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.show();
};

// Event Listeners para enviar los formularios de Editar y Eliminar
document.addEventListener('DOMContentLoaded', () => {
    const formEditar = document.getElementById("form-editar-producto");
    if (formEditar) {
        formEditar.addEventListener("submit", (e) => {
            e.preventDefault();
            const codigo = document.getElementById("edit-prod-codigo").value;
            const productoIndex = productos.findIndex(p => p.codigo === codigo);
            
            if (productoIndex !== -1) {
                productos[productoIndex].nombre = document.getElementById("edit-prod-nombre").value.trim();
                productos[productoIndex].precio = parseInt(document.getElementById("edit-prod-precio").value);
                
                renderizarTablaAdmin();
                
                const modalEl = document.getElementById('modalEditarProducto');
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
        });
    }

    const btnConfirmarEliminar = document.getElementById("btn-confirmar-eliminar");
    if (btnConfirmarEliminar) {
        btnConfirmarEliminar.addEventListener("click", () => {
            const codigo = document.getElementById("eliminar-prod-codigo").value;
            const productoIndex = productos.findIndex(p => p.codigo === codigo);
            
            if (productoIndex !== -1) {
                productos.splice(productoIndex, 1);
                
                renderizarTablaAdmin();
                
                const modalEl = document.getElementById('modalEliminarProducto');
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
        });
    }
});