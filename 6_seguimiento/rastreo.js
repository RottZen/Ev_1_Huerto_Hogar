/* ============================================================
   HuertoHogar - rastreo.js
   Lógica específica de la página rastreo.html.
   No hay backend real, así que simulamos un pequeño set de
   pedidos de ejemplo (mismo patrón que "productos" en datos.js).
   ============================================================ */

// Pedidos de ejemplo. "estado" es el índice (0 a 3) del arreglo
// ESTADOS de más abajo: en qué paso de la línea de tiempo está.
const pedidos = [
    {
        codigo: "HH-1001",
        estado: 1, // En Preparación
        fechaPedido: "2026-09-01",
        fechaEntregaEstimada: "2026-09-05"
    },
    {
        codigo: "HH-1002",
        estado: 3, // Entregado
        fechaPedido: "2026-08-28",
        fechaEntregaEstimada: "2026-09-02"
    },
    {
        codigo: "HH-1003",
        estado: 0, // Pedido Confirmado
        fechaPedido: "2026-09-07",
        fechaEntregaEstimada: "2026-09-10"
    }
];

const ESTADOS = ["Pedido Confirmado", "En Preparación", "En Camino", "Entregado"];

// Busca el pedido escrito por el usuario y dibuja el resultado
function buscarPedido() {
    const input = document.getElementById("input-codigo-pedido");
    const codigo = input.value.trim().toUpperCase();
    const contenedorResultado = document.getElementById("resultado-rastreo");

    if (codigo === "") {
        contenedorResultado.innerHTML = "";
        return;
    }

    const pedido = pedidos.find(p => p.codigo === codigo);

    if (!pedido) {
        contenedorResultado.innerHTML = `
            <div class="alert alert-warning">
                No encontramos ningún pedido con el código "${codigo}".
                Verifica que esté bien escrito.
            </div>
        `;
        return;
    }

    contenedorResultado.innerHTML = generarHTMLPedido(pedido);
}

// Construye la tarjeta con la línea de tiempo de estado del pedido
function generarHTMLPedido(pedido) {
    const pasosHTML = ESTADOS.map((nombrePaso, index) => {
        const completado = index <= pedido.estado;
        return `
            <div class="paso-seguimiento ${completado ? "completado" : ""}">
                <div class="circulo-paso">${completado ? "✓" : index + 1}</div>
                <p class="mb-0 small">${nombrePaso}</p>
            </div>
        `;
    }).join("");

    return `
        <div class="card shadow-sm p-4">
            <h5>Pedido ${pedido.codigo}</h5>
            <p class="text-secondary mb-4">Realizado el ${formatearFecha(pedido.fechaPedido)}</p>

            <div class="d-flex align-items-start justify-content-between pasos-container mb-4">
                ${pasosHTML}
            </div>

            <p class="mb-0"><strong>Entrega estimada:</strong> ${formatearFecha(pedido.fechaEntregaEstimada)}</p>
        </div>
    `;
}

// Convierte "2026-09-05" en "5 de septiembre de 2026"
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO + "T00:00:00"); // evita corrimiento de zona horaria
    return fecha.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

// Guarda la fecha de entrega preferida del usuario en localStorage
function guardarFechaPreferida() {
    const input = document.getElementById("fecha-entrega-preferida");

    if (!input.value) {
        alert("Selecciona una fecha antes de guardar.");
        return;
    }

    localStorage.setItem("fechaEntregaPreferida", input.value);
    alert(`Guardamos tu fecha de entrega preferida: ${formatearFecha(input.value)}`);
}

/* ------------------------------------------------------------
   Inicialización de esta página
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    const botonBuscar = document.getElementById("btn-buscar-pedido");
    if (botonBuscar) botonBuscar.addEventListener("click", buscarPedido);

    // También permite buscar apretando Enter dentro del input
    const inputCodigo = document.getElementById("input-codigo-pedido");
    if (inputCodigo) {
        inputCodigo.addEventListener("keyup", (evento) => {
            if (evento.key === "Enter") buscarPedido();
        });
    }

    const botonGuardarFecha = document.getElementById("btn-guardar-fecha");
    if (botonGuardarFecha) botonGuardarFecha.addEventListener("click", guardarFechaPreferida);

    // Si el usuario ya había guardado una fecha antes, la mostramos de entrada
    const fechaGuardada = localStorage.getItem("fechaEntregaPreferida");
    const inputFecha = document.getElementById("fecha-entrega-preferida");
    if (fechaGuardada && inputFecha) {
        inputFecha.value = fechaGuardada;
    }
});