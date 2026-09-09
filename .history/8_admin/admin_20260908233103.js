document.addEventListener('DOMContentLoaded', ()=> {
    renderizarTablaAdmin()
});

function renderizarTablaAdmin(){
    const tbody = document.querySelector('#tabla-admin-productos');
    if (!tbody) return;
    fila.innerHTML = `
            <td class="fw-bold text-secondary">${producto.Codigo}</td>
            <td>
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-admin-miniatura">
            </td>
            <td class="fw-bold">${producto.nombre}</td>
            <td class="text-capitalize">${producto.categoria}</td>
            <td>$${producto.precio.toLocaleString("es-CL")}</td>
            <td>
                <!-- Le ponemos un badge (etiqueta) para que el stock resalte -->
                <span class="badge bg-info text-dark">${producto.stock} un.</span>
            </td>
            <td>
                <!-- Botones de acción falsos por ahora, pero listos para programarse después -->
                <button class="btn btn-sm btn-outline-primary me-1">Editar</button>
                <button class="btn btn-sm btn-outline-danger">Borrar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}   
