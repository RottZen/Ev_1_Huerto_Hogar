document.addEventListener("DOMContentLoaded", () => {
    cargarDatosUsuario();

    const formPerfil = document.getElementById("form-perfil");
    if (formPerfil) {
        formPerfil.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Obtener el usuario actual y actualizar con los nuevos datos del formulario
            const usuario = JSON.parse(localStorage.getItem("usuarioHuertoHogar")) || {};
            usuario.nombre = document.getElementById("perfil-nombre").value.trim();
            usuario.telefono = document.getElementById("perfil-telefono").value.trim();
            usuario.direccion = document.getElementById("perfil-direccion").value.trim();
            usuario.ciudad = document.getElementById("perfil-ciudad").value;

            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
            
            // Volver a renderizar la vista actualizada
            cargarDatosUsuario();
            alert("Tus datos han sido actualizados exitosamente.");
        });
    }
});

function cargarDatosUsuario() {
    const usuarioGuardado = localStorage.getItem("usuarioHuertoHogar");
    if (!usuarioGuardado) return;

    const usuario = JSON.parse(usuarioGuardado);

    const avatar = document.querySelector(".avatar-circle");
    if (avatar && usuario.nombre) {
        const iniciales = usuario.nombre.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
        avatar.textContent = iniciales;
    }

    const elemNombre = document.querySelector(".card-perfil-resumen h3");
    if (elemNombre) elemNombre.textContent = usuario.nombre;

    const elemEmail = document.querySelector(".card-perfil-resumen span:nth-of-type(1)");
    if (elemEmail) elemEmail.textContent = usuario.email;

    const elemTelResumen = document.querySelector(".card-perfil-resumen span:nth-of-type(2)");
    if (elemTelResumen) elemTelResumen.textContent = usuario.telefono;

    const elemPuntos = document.querySelector(".card-perfil-resumen h4");
    if (elemPuntos && usuario.puntos !== undefined) {
        elemPuntos.textContent = `${usuario.puntos} Puntos`;
    }

    // Actualizar Campos del Formulario
    const inputNombre = document.getElementById("perfil-nombre");
    if (inputNombre) inputNombre.value = usuario.nombre || "";

    const inputTel = document.getElementById("perfil-telefono");
    if (inputTel) inputTel.value = usuario.telefono || "";

    const inputDir = document.getElementById("perfil-direccion");
    if (inputDir) inputDir.value = usuario.direccion || "";

    const selectCiudad = document.getElementById("perfil-ciudad");
    if (selectCiudad && usuario.ciudad) selectCiudad.value = usuario.ciudad;
}