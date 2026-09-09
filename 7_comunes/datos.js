document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener o crear usuario por defecto para mantener sesión activa
    let usuario = JSON.parse(localStorage.getItem("usuarioHuertoHogar"));

    if (!usuario) {
        usuario = {
            nombre: "Juan Pérez",
            email: "juan.perez@email.cl",
            telefono: "+56 9 8765 4321",
            direccion: "Av. Vicuña Mackenna 4860, San Joaquín",
            ciudad: "Santiago",
            puntos: 250
        };
        localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
    }

    // 2. Renderizar los datos guardados en la interfaz
    renderizarDatosPerfil(usuario);

    // 3. Escuchar la actualización del formulario
    const formPerfil = document.getElementById("form-perfil");
    if (formPerfil) {
        formPerfil.addEventListener("submit", (e) => {
            e.preventDefault();

            // Leer nuevos datos ingresados
            const usuarioActualizado = {
                ...usuario,
                nombre: document.getElementById("perfil-nombre").value.trim(),
                telefono: document.getElementById("perfil-telefono").value.trim(),
                direccion: document.getElementById("perfil-direccion").value.trim(),
                ciudad: document.getElementById("perfil-ciudad").value
            };

            // Guardar permanentemente en localStorage
            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuarioActualizado));

            // Actualizar vista
            renderizarDatosPerfil(usuarioActualizado);
            alert("¡Tus datos han sido guardados y actualizados con éxito!");
        });
    }
});

function renderizarDatosPerfil(usuario) {
    if (!usuario) return;

    // Actualizar Iniciales en Avatar
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

    // Actualizar tarjeta de resumen izquierda
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

    // Cargar valores dentro del formulario derecha
    const inputNombre = document.getElementById("perfil-nombre");
    if (inputNombre) inputNombre.value = usuario.nombre || "";

    const inputTel = document.getElementById("perfil-telefono");
    if (inputTel) inputTel.value = usuario.telefono || "";

    const inputDir = document.getElementById("perfil-direccion");
    if (inputDir) inputDir.value = usuario.direccion || "";

    const selectCiudad = document.getElementById("perfil-ciudad");
    if (selectCiudad && usuario.ciudad) selectCiudad.value = usuario.ciudad;
}