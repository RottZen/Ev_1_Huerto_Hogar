import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styles from './Carrito.module.css';

const Carrito = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, checkout } = useContext(CartContext);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const ok = checkout();
    if (ok) {
      setPurchaseCompleted(true);
    }
  };

  const formatPrice = (value) => {
    return `$${(value || 0).toLocaleString('es-CL')}`;
  };

  if (purchaseCompleted) {
    return (
      <div className={styles.carritoContainer}>
        <div className={styles.checkoutSuccess}>
          <span className={styles.successIcon}>🎉</span>
          <h2 className={styles.successTitle}>¡Gracias por tu compra!</h2>
          <p className={styles.successText}>
            Tu pedido ha sido procesado exitosamente. En breve recibirás los detalles en tu correo.
            ¡Gracias por cultivar un mundo más verde con HuertoHogar!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/catalogo"
              className={styles.btnPrimary}
              onClick={() => setPurchaseCompleted(false)}
            >
              Seguir Comprando 🌿
            </Link>
            <Link
              to="/"
              className={styles.btnPrimary}
              onClick={() => setPurchaseCompleted(false)}
            >
              Ir al Inicio 🏡
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className={styles.carritoContainer}>
        <div className={styles.emptyCard}>
          <span className={styles.emptyIcon}>🛒</span>
          <h2 className={styles.emptyTitle}>Tu carrito está vacío</h2>
          <p className={styles.emptyText}>
            Aún no has agregado productos a tu huerto. ¡Explora nuestro catálogo y comienza a sembrar!
          </p>
          <Link to="/catalogo" className={styles.btnPrimary}>
            Explorar Catálogo de Productos 🌱
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.carritoContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tu Carrito de Compras</h1>
        <p className={styles.subtitle}>
          Revisa y gestiona los artículos seleccionados antes de finalizar tu orden.
        </p>
      </header>

      <div className="row g-4">
        {/* Left Column: Cart items */}
        <div className="col-lg-8">
          <div className={styles.itemsCard}>
            <div className={styles.itemsHeader}>
              <span className={styles.itemsCount}>
                {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
              </span>
              <button
                type="button"
                className={styles.btnClear}
                onClick={clearCart}
                aria-label="Vaciar todo el carrito"
              >
                🗑️ Vaciar Carrito
              </button>
            </div>

            <div className={styles.itemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    className={styles.itemImage}
                  />

                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemUnitPrice}>
                      Precio unitario: {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Disminuir cantidad de ${item.name}`}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemSubtotalWrapper}>
                    <div className={styles.itemSubtotalLabel}>Subtotal</div>
                    <div className={styles.itemSubtotal}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.btnRemove}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${item.name} del carrito`}
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order summary */}
        <div className="col-lg-4">
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Despacho a Domicilio</span>
              <span className={styles.summaryHighlight}>¡Gratis! 🌱</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total Final</span>
              <span className={styles.totalAmount}>{formatPrice(cartTotal)}</span>
            </div>

            <button
              type="button"
              className={styles.btnCheckout}
              onClick={handleCheckout}
            >
              Finalizar Compra 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
