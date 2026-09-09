document.addEventListener("DOMContentLoaded", () => {
    const formPerfil = document.getElementById("form-perfil");
    
    if (formPerfil) {
        formPerfil.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Tus datos personales y de envío han sido actualizados exitosamente.");
        });
    }

    const botonesRepetir = document.querySelectorAll(".btn-repetir");
    botonesRepetir.forEach((boton) => {
        boton.addEventListener("click", () => {
            alert("Los productos del pedido han sido agregados nuevamente a tu carrito.");
        });
    });
});