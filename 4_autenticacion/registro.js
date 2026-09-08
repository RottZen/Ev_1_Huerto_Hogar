document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formRegistro = document.getElementById("form-registro");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "../5_perfil/perfil.html";
        });
    }

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Registro exitoso en HuertoHogar! Redirigiendo a tu perfil...");
            window.location.href = "../5_perfil/perfil.html";
        });
    }
});