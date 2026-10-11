import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Perfil = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Helper to extract initials
  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0].split('.');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("¡Tus datos han sido actualizados con éxito!");
  };

  return (
    <div className="row g-4">
      {/* TARJETA RESUMEN DE PERFIL (IZQUIERDA) */}
      <aside className="col-lg-4">
          <div className="card shadow-sm border-0 text-center p-4 card-perfil-resumen">
              <div className="mb-3">
                  <div className="avatar-circle rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mx-auto">
                      {getInitials(user.email)}
                  </div>
              </div>
              <h3 className="mb-1">{user.email.split('@')[0]}</h3>
              <p className="text-muted small">{user.role === 'admin' ? 'Administrador' : 'Cliente Frecuente'}</p>
              <hr />
              <div className="text-start mb-3">
                  <small className="text-muted d-block">Correo Electrónico:</small>
                  <span className="fw-semibold">{user.email}</span>
              </div>
              <div className="text-start mb-3">
                  <small className="text-muted d-block">Teléfono:</small>
                  <span className="fw-semibold">+56 9 8765 4321</span>
              </div>
              
              {/* Puntos de Fidelización / Descuentos */}
              <div className="p-3 bg-light rounded text-start mt-2">
                  <span className="badge bg-warning text-dark mb-1">Programa HuertoPuntos</span>
                  <h4 className="m-0 text-success fw-bold">250 Puntos</h4>
                  <small className="text-muted">Equivale a $2.500 CLP de descuento</small>
              </div>

              {/* BOTÓN DE CERRAR SESIÓN */}
              <div className="mt-4">
                  <button onClick={logout} className="btn btn-outline-danger w-100 fw-semibold">Cerrar Sesión</button>
              </div>
          </div>
      </aside>

      {/* CONTENIDO DEL PERFIL (DERECHA) */}
      <section className="col-lg-8">
          
          {/* SECCIÓN 1: DATOS PERSONALES Y DIRECCIÓN */}
          <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                  <h3 className="card-title mb-4">Actualizar Mis Datos</h3>
                  <form onSubmit={handleSave}>
                      <div className="row g-3">
                          <div className="col-md-6">
                              <label htmlFor="perfil-nombre" className="form-label">Nombre Completo</label>
                              <input type="text" className="form-control" id="perfil-nombre" defaultValue={user.email.split('@')[0]} required />
                          </div>
                          <div className="col-md-6">
                              <label htmlFor="perfil-telefono" className="form-label">Número de Contacto</label>
                              <input type="tel" className="form-control" id="perfil-telefono" defaultValue="+56 9 8765 4321" required />
                          </div>
                          <div className="col-12">
                              <label htmlFor="perfil-direccion" className="form-label">Dirección de Entrega Predeterminada</label>
                              <input type="text" className="form-control" id="perfil-direccion" defaultValue="Av. Vicuña Mackenna 4860, San Joaquín" required />
                          </div>
                          <div className="col-md-6">
                              <label htmlFor="perfil-ciudad" className="form-label">Ciudad / Cobertura</label>
                              <select className="form-select" id="perfil-ciudad" defaultValue="Santiago">
                                  <option value="Santiago">Santiago</option>
                                  <option value="Viña del Mar">Viña del Mar</option>
                                  <option value="Valparaíso">Valparaíso</option>
                                  <option value="Concepción">Concepción</option>
                                  <option value="Nacimiento">Nacimiento</option>
                                  <option value="Villarrica">Villarrica</option>
                                  <option value="Puerto Montt">Puerto Montt</option>
                              </select>
                          </div>
                          <div className="col-12 text-end">
                              <button type="submit" className="btn btn-primary px-4">Guardar Cambios</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>

          {/* SECCIÓN 2: HISTORIAL DE COMPRAS */}
          <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                  <h3 className="card-title mb-3">Historial de Compras</h3>
                  <div className="table-responsive">
                      <table className="table table-hover align-middle">
                          <thead className="table-light">
                              <tr>
                                  <th>N° Pedido</th>
                                  <th>Fecha</th>
                                  <th>Total</th>
                                  <th>Estado</th>
                                  <th>Acciones</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td className="fw-bold">#HH-1092</td>
                                  <td>02/09/2026</td>
                                  <td>$12.500 CLP</td>
                                  <td><span className="badge bg-success">Entregado</span></td>
                                  <td><button className="btn btn-sm btn-outline-success">Repetir Pedido</button></td>
                              </tr>
                              <tr>
                                  <td className="fw-bold">#HH-1093</td>
                                  <td>06/09/2026</td>
                                  <td>$8.900 CLP</td>
                                  <td><span className="badge bg-warning text-dark">En Ruta</span></td>
                                  <td><button className="btn btn-sm btn-outline-success">Rastrear</button></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Perfil;
