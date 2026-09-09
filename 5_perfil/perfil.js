document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener usuario o crear uno base con compras iniciales
    let usuario = JSON.parse(localStorage.getItem("usuarioHuertoHogar"));

    if (!usuario) {
        usuario = {
            nombre: "Juan Pérez",
            email: "juan.perez@email.cl",
            telefono: "+56 9 8765 4321",
            direccion: "Av. Vicuña Mackenna 4860, San Joaquín",
            ciudad: "Santiago",
            puntos: 250,
            sesionActiva: true,
            historialCompras: [
                { id: "#HH-1092", fecha: "02/09/2026", total: "$12.500 CLP", estado: "Entregado" },
                { id: "#HH-1045", fecha: "18/08/2026", total: "$8.900 CLP", estado: "Entregado" }
            ]
        };
        localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
    }

    // Asegurar que exista el arreglo de historial
    if (!usuario.historialCompras) {
        usuario.historialCompras = [
            { id: "#HH-1092", fecha: "02/09/2026", total: "$12.500 CLP", estado: "Entregado" }
        ];
        localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
    }

    // 2. Renderizar Datos de Usuario y Compras
    renderizarDatosPerfil(usuario);
    renderizarHistorialCompras(usuario.historialCompras);

    // 3. Guardar Formulario de Perfil
    const formPerfil = document.getElementById("form-perfil");
    if (formPerfil) {
        formPerfil.addEventListener("submit", (e) => {
            e.preventDefault();

            usuario.nombre = document.getElementById("perfil-nombre").value.trim();
            usuario.telefono = document.getElementById("perfil-telefono").value.trim();
            usuario.direccion = document.getElementById("perfil-direccion").value.trim();
            usuario.ciudad = document.getElementById("perfil-ciudad").value;

            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));

            renderizarDatosPerfil(usuario);
            alert("¡Tus datos han sido actualizados con éxito!");
        });
    }

    // 4. Cerrar Sesión
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            if (usuario) {
                usuario.sesionActiva = false;
                localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
            }
            alert("Has cerrado sesión exitosamente.");
            window.location.href = "../4_autenticacion/registro.html";
        });
    }
});

function renderizarDatosPerfil(usuario) {
    if (!usuario) return;

    // Avatar
    const avatar = document.querySelector(".avatar-circle");
    if (avatar && usuario.nombre) {
        const iniciales = usuario.nombre
            .split(" ")
            .map(n => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
        avatar.textContent = iniciales || "U";
    }

    // Datos Tarjeta
    const elemNombre = document.querySelector(".card-perfil-resumen h3");
    if (elemNombre) elemNombre.textContent = usuario.nombre;

    const elemEmail = document.querySelector(".card-perfil-resumen span:nth-of-type(1)");
    if (elemEmail) elemEmail.textContent = usuario.email;

    const elemTel = document.querySelector(".card-perfil-resumen span:nth-of-type(2)");
    if (elemTel) elemTel.textContent = usuario.telefono;

    const elemPuntos = document.querySelector(".card-perfil-resumen h4");
    if (elemPuntos && usuario.puntos !== undefined) {
        elemPuntos.textContent = `${usuario.puntos} Puntos`;
    }

    // Inputs
    const inputNombre = document.getElementById("perfil-nombre");
    if (inputNombre) inputNombre.value = usuario.nombre || "";

    const inputTel = document.getElementById("perfil-telefono");
    if (inputTel) inputTel.value = usuario.telefono || "";

    const inputDir = document.getElementById("perfil-direccion");
    if (inputDir) inputDir.value = usuario.direccion || "";

    const selectCiudad = document.getElementById("perfil-ciudad");
    if (selectCiudad && usuario.ciudad) selectCiudad.value = usuario.ciudad;
}

// Función para pintar la tabla de compras dinámica
function renderizarHistorialCompras(compras) {
    const tbody = document.querySelector("table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (compras.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Aún no has realizado compras.</td></tr>`;
        return;
    }

    compras.forEach(compra => {
        const colorBadge = compra.estado === "Entregado" ? "bg-success" : "bg-warning text-dark";
        
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="fw-bold">${compra.id}</td>
            <td>${compra.fecha}</td>
            <td>${compra.total}</td>
            <td><span class="badge ${colorBadge}">${compra.estado}</span></td>
            <td><button class="btn btn-sm btn-outline-success btn-repetir">Repetir Pedido</button></td>
        `;
        tbody.appendChild(fila);
    });
}