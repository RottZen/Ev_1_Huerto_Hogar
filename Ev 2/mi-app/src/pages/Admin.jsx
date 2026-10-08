import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import styles from './Admin.module.css';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const { products, addProduct, deleteProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Double-check protection if user navigated directly without admin role
  if (!user || user.role !== 'admin') {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.unauthorizedCard}>
          <h2 className={styles.unauthorizedTitle}>Acceso Restringido 🔒</h2>
          <p className={styles.unauthorizedText}>
            Debes iniciar sesión con una cuenta de Administrador para ver y gestionar este panel.
          </p>
          <Link to="/login" className={styles.btnBack}>
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formData.price) {
      newErrors.price = 'El precio es obligatorio.';
    } else {
      const numPrice = Number(formData.price);
      if (isNaN(numPrice) || numPrice <= 0) {
        newErrors.price = 'El precio debe ser un número mayor a 0.';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'La descripción debe tener al menos 5 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newProduct = {
      name: formData.name.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
      image: formData.image.trim() || 'https://via.placeholder.com/150',
    };

    addProduct(newProduct);
    setSuccessMessage(`Producto "${newProduct.name}" agregado exitosamente.`);

    // Reset form
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
    });

    // Clear success message after 4 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?`);
    if (confirmDelete) {
      deleteProduct(id);
      setSuccessMessage(`Producto "${name}" eliminado correctamente.`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  };

  const formatPrice = (val) => {
    return `$${(val || 0).toLocaleString('es-CL')}`;
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Panel de Administración</h1>
          <p className={styles.subtitle}>
            Gestión de inventario y catálogo de HuertoHogar
          </p>
        </div>
        <div className={styles.adminBadge}>
          <span>🛡️</span> Administrador: {user.email}
        </div>
      </header>

      {successMessage && (
        <div className={styles.successBanner} role="status">
          <span>✅</span>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form Section */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <span>➕</span> Agregar Nuevo Producto
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="prodName" className={styles.label}>
                Nombre del Producto *
              </label>
              <input
                id="prodName"
                type="text"
                name="name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Ej. Pala de Jardinería"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prodPrice" className={styles.label}>
                Precio ($ CLP) *
              </label>
              <input
                id="prodPrice"
                type="number"
                name="price"
                className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                placeholder="Ej. 4500"
                value={formData.price}
                onChange={handleChange}
                min="1"
              />
              {errors.price && (
                <span className={styles.errorMessage}>{errors.price}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="prodImage" className={styles.label}>
                URL de Imagen (Opcional)
              </label>
              <input
                id="prodImage"
                type="url"
                name="image"
                className={styles.input}
                placeholder="https://ejemplo.com/foto.jpg"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="prodDesc" className={styles.label}>
                Descripción del Producto *
              </label>
              <textarea
                id="prodDesc"
                name="description"
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                placeholder="Describe las características y uso del producto..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className={styles.errorMessage}>{errors.description}</span>
              )}
            </div>
          </div>

          <button type="submit" className={styles.btnSubmit}>
            <span>💾</span> Guardar Producto
          </button>
        </form>
      </section>

      {/* Product List Section */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <span>📦</span> Inventario Actual ({products ? products.length : 0} productos)
        </h2>

        {products && products.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={p.image || 'https://via.placeholder.com/50'}
                        alt={p.name}
                        className={styles.productThumbnail}
                      />
                    </td>
                    <td>{p.id}</td>
                    <td className={styles.productName}>{p.name}</td>
                    <td className={styles.productPrice}>{formatPrice(p.price)}</td>
                    <td>{p.description}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.btnDelete}
                        onClick={() => handleDelete(p.id, p.name)}
                        aria-label={`Eliminar producto ${p.name}`}
                      >
                        <span>🗑️</span> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.noProducts}>
            No hay productos registrados en el sistema. Agrega uno nuevo arriba.
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
