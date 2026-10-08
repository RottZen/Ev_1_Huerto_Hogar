import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onAddToCart, ...restProps }) => {
  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart;

  // Support both <ProductCard product={product} /> and <ProductCard {...product} />
  const currentProduct = product || restProps;
  const { name, price, description, image } = currentProduct;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(currentProduct);
    } else if (addToCart) {
      addToCart(currentProduct);
    }
  };

  const formattedPrice = typeof price === 'number'
    ? `$${price.toLocaleString('es-CL')}`
    : `$${price || 0}`;

  const imageSrc = image || 'https://via.placeholder.com/250x200?text=HuertoHogar';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={name || 'Producto'}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.priceWrapper}>
          <span className={styles.price}>{formattedPrice}</span>
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddToCart}
          aria-label={`Agregar ${name} al carrito`}
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
