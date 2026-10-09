import { useState } from 'react';

const pedidosOriginales = [
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

const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + "T00:00:00"); 
    return fecha.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
};

const Seguimiento = () => {
  const [codigo, setCodigo] = useState('');
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
  const [errorBuscando, setErrorBuscando] = useState(false);

  const buscarPedido = (e) => {
      e?.preventDefault();
      const codigoBuscado = codigo.trim().toUpperCase();

      if (codigoBuscado === "") {
          setPedidoEncontrado(null);
          setErrorBuscando(false);
          return;
      }

      const pedido = pedidosOriginales.find(p => p.codigo === codigoBuscado);

      if (!pedido) {
          setPedidoEncontrado(null);
          setErrorBuscando(true);
          return;
      }

      setErrorBuscando(false);
      setPedidoEncontrado(pedido);
  };

  return (
    <main className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">Seguimiento de Pedido</h2>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm p-4">
                    <div className="mb-3">
                        <label htmlFor="input-codigo-pedido" className="form-label">Ingrese su número de pedido</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="input-codigo-pedido" 
                          placeholder="Ej: HH-1001"
                          value={codigo}
                          onChange={(e) => setCodigo(e.target.value)}
                          onKeyUp={(e) => e.key === 'Enter' && buscarPedido()}
                        />
                    </div>
                    <button id="btn-buscar-pedido" className="btn btn-success w-100" onClick={buscarPedido}>Consultar Estado</button>
                </div>

                <div id="resultado-rastreo" className="mt-4">
                  {errorBuscando && (
                      <div className="alert alert-warning">
                          No encontramos ningún pedido con el código "{codigo.trim().toUpperCase()}".
                          Verifica que esté bien escrito.
                      </div>
                  )}

                  {pedidoEncontrado && (
                      <div className="card shadow-sm p-4">
                          <h5>Pedido {pedidoEncontrado.codigo}</h5>
                          <p className="text-secondary mb-4">Realizado el {formatearFecha(pedidoEncontrado.fechaPedido)}</p>

                          <div className="d-flex align-items-start justify-content-between pasos-container mb-4">
                              {ESTADOS.map((nombrePaso, index) => {
                                  const completado = index <= pedidoEncontrado.estado;
                                  return (
                                      <div key={index} className={`paso-seguimiento ${completado ? "completado" : ""}`}>
                                          <div className="circulo-paso">{completado ? "✓" : index + 1}</div>
                                          <p className="mb-0 small">{nombrePaso}</p>
                                      </div>
                                  );
                              })}
                          </div>

                          <p className="mb-0"><strong>Entrega estimada:</strong> {formatearFecha(pedidoEncontrado.fechaEntregaEstimada)}</p>
                      </div>
                  )}
                </div>
            </div>
        </div>
    </main>
  );
};

export default Seguimiento;
