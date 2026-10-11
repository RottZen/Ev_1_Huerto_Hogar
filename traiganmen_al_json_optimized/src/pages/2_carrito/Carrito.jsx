import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Carrito = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useContext(CartContext);

  const formatPrice = (value) => `$${(value || 0).toLocaleString('es-CL')}`;

  const handleConfirm = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de confirmar.");
      return;
    }
    alert("¡Pedido confirmado! Gracias por tu compra en HuertoHogar. Puedes revisar el estado de tu pedido en tu Cuenta.");
    clearCart();
  };

  return (
    <main className="container my-5 flex-grow-1">
        <h2 className="mb-4 text-center">Tu Carrito de Compras</h2>
        <div className="row">
             <div className="col-lg-8 mb-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                 <tbody>
                                    {cart.length === 0 ? (
                                      <tr>
                                          <td colSpan="5" className="text-center">El carrito está vacío.</td>
                                      </tr>
                                    ) : (
                                      cart.map(item => (
                                        <tr key={item.id}>
                                          <td>
                                            <div className="d-flex align-items-center">
                                              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} className="rounded" />
                                              <span>{item.name}</span>
                                            </div>
                                          </td>
                                          <td>{formatPrice(item.price)}</td>
                                          <td>
                                            <div className="d-flex align-items-center">
                                              <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                              <span className="mx-2">{item.quantity}</span>
                                              <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                          </td>
                                          <td>{formatPrice(item.price * item.quantity)}</td>
                                          <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                 </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>
        
        <div className="col-lg-4">
            <div className="card shadow-sm p-4">
                <h4 className="card-title mb-4">Resumen del pedido</h4>
                <div className="d-flex justify-content-between mb-3 text-secondary">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartTotal)} CLP</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                    <strong>Total a pagar:</strong>
                    <strong className="fs-4 text-dark">{formatPrice(cartTotal)} CLP</strong>
                </div>
                <button className="btn btn-primary w-100 btn-lg" onClick={handleConfirm}>Confirmar pedido</button>
            </div>
        </div>
        </div>
    </main>
  );
};

export default Carrito;
