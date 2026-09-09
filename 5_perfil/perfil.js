document.addEventListener("DOMContentLoaded", () => {
    // 1. Verificar si hay un usuario cargado o crear uno por defecto activo
    let usuario = JSON.parse(localStorage.getItem("usuarioHuertoHogar"));

    if (!usuario) {
        usuario = {
            nombre: "Juan Pérez",
            email: "juan.perez@email.cl",
            telefono: "+56 9 8765 4321",
            direccion: "Av. Vicuña Mackenna 4860, San Joaquín",
            ciudad: "Santiago",
            puntos: 250,
            sesionActiva: true
        };
        localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
    }

    // 2. Renderizar los datos iniciales
    renderizarDatosPerfil(usuario);

    // 3. Manejar envío del formulario de actualización
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

    // 4. Manejar botón de CERRAR SESIÓN
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

    // Actualizar Avatar
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

    // Actualizar Resumen Izquierdo
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

    // Llenar Formulario Derecho
    const inputNombre = document.getElementById("perfil-nombre");
    if (inputNombre) inputNombre.value = usuario.nombre || "";

    const inputTel = document.getElementById("perfil-telefono");
    if (inputTel) inputTel.value = usuario.telefono || "";

    const inputDir = document.getElementById("perfil-direccion");
    if (inputDir) inputDir.value = usuario.direccion || "";

    const selectCiudad = document.getElementById("perfil-ciudad");
    if (selectCiudad && usuario.ciudad) selectCiudad.value = usuario.ciudad;
}