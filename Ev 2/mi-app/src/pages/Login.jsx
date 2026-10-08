import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un formato de correo electrónico válido.';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const result = login(formData.email.trim(), formData.password);

    if (result.success) {
      // If admin, navigate to admin or home
      if (formData.email.trim() === 'admin@admin.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setServerError(result.message || 'Credenciales inválidas. Verifica correo y contraseña.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>
            Ingresa a tu cuenta para continuar cultivando tu huerto
          </p>
        </header>

        {serverError && (
          <div className={styles.errorBanner} role="alert">
            <span>⚠️</span>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="ejemplo@huertohogar.cl"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Ingresar a HuertoHogar
          </button>
        </form>

        <p className={styles.footerText}>
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className={styles.link}>
            Regístrate aquí
          </Link>
        </p>

        <div className={styles.demoBox}>
          <span className={styles.demoTitle}>💡 Credenciales de prueba:</span>
          <div><strong>Admin:</strong> admin@admin.com / admin123</div>
          <div><strong>Usuario:</strong> cualquier correo y contraseña válida</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
