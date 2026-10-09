import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product, onAddToCart, ...restProps }) => {
  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart;

  const currentProduct = product || restProps;
  const { name, price, description, image, origen, unidad } = currentProduct;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(currentProduct);
    } else if (addToCart) {
      addToCart(currentProduct);
      alert(`¡Producto agregado al carrito!`); // Popup de EV 1 (?)
    }
  };

  const formattedPrice = typeof price === 'number'
    ? `$${price.toLocaleString('es-CL')}`
    : `$${price || 0}`;

  const imageSrc = image || 'https://via.placeholder.com/250x200?text=HuertoHogar';

  return (
    <div className="card h-100 shadow-sm tarjeta-producto">
      <img src={imageSrc} className="card-img-top" alt={name || 'Producto'} />
      <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          {origen && <p className="card-text text-secondary small mb-1">{origen}</p>}
          <p className="card-text fw-semibold">
              {formattedPrice} {unidad ? `/ ${unidad}` : ''}
          </p>
          <button className="btn btn-success mt-auto" onClick={handleAddToCart}>
              Agregar al carrito
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
