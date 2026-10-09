import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const cartItemCount = cart ? cart.reduce((total, item) => total + (item.quantity || 1), 0) : 0;

  const handleNavCollapse = () => setIsNavCollapsed(prev => !prev);
  const closeNav = () => setIsNavCollapsed(true);

  return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/" onClick={closeNav}>
                    <img src="/assets/img/logo.png" alt="Logo HuertoHogar" className="logo-header d-inline-block align-text-center" />
                </Link>
                <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/" onClick={closeNav}>Inicio</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/catalogo" onClick={closeNav}>Catalogo</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/seguimiento" onClick={closeNav}>Seguimiento</Link></li>
                    </ul>
                    <div className="d-flex gap-2">
                        {user ? (
                           <>
                             {user.role === 'admin' ? (
                               <Link to="/admin" className="btn btn-outline-success" onClick={closeNav}>Panel de Control</Link>
                             ) : (
                               <Link to="/perfil" className="btn btn-outline-success" onClick={closeNav}>Mi Perfil</Link>
                             )}
                             <button type="button" className="btn btn-outline-danger" onClick={() => { logout(); closeNav(); }}>Salir</button>
                           </>
                        ) : (
                           <Link to="/login" className="btn btn-outline-success" onClick={closeNav}>Mi Cuenta</Link>
                        )}
                        <Link to="/carrito" className="btn btn-warning" onClick={closeNav}>
                            Carrito <span className="badge bg-dark ms-1">{cartItemCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  );
};

export default Navbar;
