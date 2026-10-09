import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
    alert(`¡Bienvenido/a ${loginEmail}!`);
    navigate('/');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    alert("¡Registro exitoso! Iniciando sesión...");
    login(regEmail, regPassword);
    navigate('/');
  };

  return (
    <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0 card-auth">
                    <div className="card-body p-4">
                        <ul className="nav nav-pills nav-justified mb-4" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')} type="button">Iniciar Sesión</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'registro' ? 'active' : ''}`} onClick={() => setActiveTab('registro')} type="button">Registrarse</button>
                            </li>
                        </ul>

                        <div className="tab-content">
                            {activeTab === 'login' && (
                              <div className="tab-pane fade show active" role="tabpanel">
                                  <h3 className="text-center mb-3">¡Bienvenido de vuelta!</h3>
                                  <form onSubmit={handleLoginSubmit}>
                                      <div className="mb-3">
                                          <label className="form-label">Correo Electrónico</label>
                                          <input type="email" className="form-control" placeholder="ejemplo@correo.cl" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                                      </div>
                                      <div className="mb-3">
                                          <label className="form-label">Contraseña</label>
                                          <input type="password" className="form-control" placeholder="••••••••" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center mb-3">
                                          <div className="form-check">
                                              <input type="checkbox" className="form-check-input" id="recordarme" />
                                              <label className="form-check-label small" htmlFor="recordarme">Recordarme</label>
                                          </div>
                                          <a href="#" className="small text-decoration-none text-muted">¿Olvidaste tu contraseña?</a>
                                      </div>
                                      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">Ingresar</button>
                                  </form>
                              </div>
                            )}

                            {activeTab === 'registro' && (
                              <div className="tab-pane fade show active" role="tabpanel">
                                  <h3 className="text-center mb-3">Crea tu cuenta</h3>
                                  <form onSubmit={handleRegisterSubmit}>
                                      <div className="mb-3">
                                          <label className="form-label">Nombre Completo</label>
                                          <input type="text" className="form-control" placeholder="Juan Pérez" required value={regName} onChange={e => setRegName(e.target.value)} />
                                      </div>
                                      <div className="mb-3">
                                          <label className="form-label">Correo Electrónico</label>
                                          <input type="email" className="form-control" placeholder="ejemplo@correo.cl" required value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                                      </div>
                                      <div className="mb-3">
                                          <label className="form-label">Contraseña</label>
                                          <input type="password" className="form-control" placeholder="••••••••" required value={regPassword} onChange={e => setRegPassword(e.target.value)} />
                                      </div>
                                      <div className="mb-4">
                                          <label className="form-label">Confirmar Contraseña</label>
                                          <input type="password" className="form-control" placeholder="••••••••" required value={regConfirm} onChange={e => setRegConfirm(e.target.value)} />
                                      </div>
                                      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">Crear Cuenta</button>
                                  </form>
                              </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default Login;
