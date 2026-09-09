document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formRegistro = document.getElementById("form-registro");

    // LÓGICA DE REGISTRO
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoUsuario = {
                nombre: document.getElementById("registro-nombre").value.trim(),
                email: document.getElementById("registro-email").value.trim(),
                telefono: "+56 " + document.getElementById("registro-telefono").value.trim(),
                direccion: "Dirección por definir",
                ciudad: "Santiago",
                puntos: 50,
                sesionActiva: true // <--- Marcamos sesión como activa
            };

            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(nuevoUsuario));
            alert("¡Registro exitoso! Redirigiendo a tu cuenta...");
            window.location.href = "../5_perfil/perfil.html";
        });
    }

    // LÓGICA DE INICIO DE SESIÓN
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value.trim();

            let usuario = JSON.parse(localStorage.getItem("usuarioHuertoHogar"));
            
            if (!usuario) {
                usuario = {
                    nombre: email.split("@")[0],
                    email: email,
                    telefono: "+56 9 1234 5678",
                    direccion: "Av. Ejemplo 123",
                    ciudad: "Santiago",
                    puntos: 100
                };
            }
            
            usuario.sesionActiva = true; // <--- Marcamos sesión como activa
            localStorage.setItem("usuarioHuertoHogar", JSON.stringify(usuario));

            window.location.href = "../5_perfil/perfil.html";
        });
    }
});