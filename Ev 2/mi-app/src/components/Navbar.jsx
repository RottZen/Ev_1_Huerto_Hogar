import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const cartItemCount = cart ? cart.reduce((total, item) => total + (item.quantity || 1), 0) : 0;

  const handleNavCollapse = () => setIsNavCollapsed(prev => !prev);
  const closeNav = () => setIsNavCollapsed(true);

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        <Link to="/" className={`navbar-brand ${styles.brand}`} onClick={closeNav}>
          🌱 HuertoHogar
        </Link>

        <button
          className={`navbar-toggler ${styles.toggler}`}
          type="button"
          aria-controls="navbarContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${styles.navLink}`} onClick={closeNav}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/catalogo" className={`nav-link ${styles.navLink}`} onClick={closeNav}>
                Catálogo
              </Link>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link to="/admin" className={`nav-link ${styles.adminLink}`} onClick={closeNav}>
                  Administración
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link
              to="/carrito"
              className={`btn position-relative ${styles.cartButton}`}
              onClick={closeNav}
              aria-label="Ver carrito de compras"
            >
              🛒 <span className={styles.cartText}>Carrito</span>
              {cartItemCount > 0 && (
                <span className={`badge rounded-pill ${styles.cartBadge}`}>
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className={`d-flex align-items-center gap-2 ${styles.userSection}`}>
                <span className={styles.userEmail} title={user.email}>
                  👤 {user.email}
                </span>
                <button
                  type="button"
                  className={`btn btn-sm ${styles.logoutBtn}`}
                  onClick={() => {
                    logout();
                    closeNav();
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className={`btn btn-sm ${styles.loginBtn}`} onClick={closeNav}>
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className={`btn btn-sm ${styles.registerBtn}`} onClick={closeNav}>
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
