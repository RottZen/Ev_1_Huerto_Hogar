document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formRegistro = document.getElementById("form-registro");

    // LÓGICA DE REGISTRO
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            // Capturar datos del formulario
            const nuevoUsuario = {
                nombre: document.getElementById("registro-nombre").value.trim(),
                email: document.getElementById("registro-email").value.trim(),
                telefono: "+56 " + document.getElementById("registro-telefono").value.trim(),
                direccion: "Dirección por definir",
                ciudad: "Santiago",
                puntos: 50 // Puntos de bienvenida
            };

            // Guardar usuario en localStorage
            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(nuevoUsuario));

            alert("¡Registro exitoso! Te hemos regalado 50 HuertoPuntos de bienvenida.");
            window.location.href = "../5_perfil/perfil.html";
        });
    }

    // LÓGICA DE INICIO DE SESIÓN
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value.trim();

            // Si ya existe un usuario guardado, mantener sus datos; si no, crear una sesión básica
            let usuario = JSON.parse(localStorage.getItem("usuarioHuertoHogar"));
            if (!usuario || usuario.email !== email) {
                usuario = {
                    nombre: email.split("@")[0],
                    email: email,
                    telefono: "+56 9 1234 5678",
                    direccion: "Av. Ejemplo 123",
                    ciudad: "Santiago",
                    puntos: 100
                };
                localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));
            }

            window.location.href = "../5_perfil/perfil.html";
        });
    }
});