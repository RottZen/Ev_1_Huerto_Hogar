document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formRegistro = document.getElementById("form-registro");

    // LOGIN
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailIngresado = document.getElementById("login-email").value.trim();
            const passIngresada = document.getElementById("login-password").value.trim();

            // Buscar coincidencia en usuariosBase (que viene de datos.js)
            const usuarioEncontrado = usuariosBase.find(
                u => u.email.toLowerCase() === emailIngresado.toLowerCase() && u.password === passIngresada
            );

            if (usuarioEncontrado) {
                const sesionUsuario = {
                    ...usuarioEncontrado,
                    sesionActiva: true,
                    historialCompras: usuarioEncontrado.historialCompras || []
                };

                // Guardar usuario en localStorage
                localStorage.setItem("usuarioHuertoHogar", JSON.stringify(sesionUsuario));

                alert(`¡Bienvenido/a ${sesionUsuario.nombre}!`);

                // REDIRECCIÓN SEGÚN EL ROL
                if (sesionUsuario.rol === "admin") {
                    window.location.href = "../8_admin/admin.html";
                } else {
                    window.location.href = "../2_catalogo/catalogo.html";
                }
            } else {
                alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
            }
        });
    }

    // REGISTRO (Siempre crea usuarios con rol 'cliente')
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoNombre = document.getElementById("registro-nombre").value.trim();
            const nuevoEmail = document.getElementById("registro-email").value.trim();
            const nuevoTel = document.getElementById("registro-telefono").value.trim();
            const nuevaPass = document.getElementById("registro-password").value.trim();

            const nuevoUsuario = {
                email: nuevoEmail,
                password: nuevaPass,
                nombre: nuevoNombre,
                telefono: "+56 " + nuevoTel,
                direccion: "Dirección no registrada",
                ciudad: "Santiago",
                puntos: 50,
                rol: "cliente",
                sesionActiva: true,
                historialCompras: []
            };

            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(nuevoUsuario));

            alert("¡Registro exitoso! Iniciando sesión...");
            window.location.href = "../5_perfil/perfil.html";
        });
    }
});