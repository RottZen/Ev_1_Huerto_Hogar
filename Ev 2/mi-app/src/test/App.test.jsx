import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { CartContext, CartProvider } from '../context/CartContext';
import { ProductContext, ProductProvider } from '../context/ProductContext';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';

const AuthTestComponent = () => {
  const { user, login, logout, register } = useContext(AuthContext);
  return (
    <div>
      <div data-testid="user">{user ? user.email : 'No user'}</div>
      <div data-testid="role">{user ? user.role : 'No role'}</div>
      <button onClick={() => login('admin@huertohogar.cl', 'admin123')}>Login Admin</button>
      <button onClick={() => register('test@test.com', '123')}>Register User</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const CartTestComponent = () => {
  const { cart, addToCart, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <button onClick={() => addToCart({ id: 1, price: 100 })}>Add 100</button>
      <button onClick={() => addToCart({ id: 2, price: 200 })}>Add 200</button>
      <button onClick={() => updateQuantity(1, 2)}>Update 1 to 2</button>
      <button onClick={() => removeFromCart(1)}>Remove 1</button>
      <button onClick={clearCart}>Clear</button>
    </div>
  );
};

const ProductTestComponent = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  return (
    <div>
      <div data-testid="products-length">{products.length}</div>
      <button onClick={() => addProduct({ name: 'New Product', price: 500 })}>Add Product</button>
      <button onClick={() => deleteProduct(products[0]?.id)}>Delete First</button>
    </div>
  );
};

describe('Contexts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('AuthContext', () => {
    it('1. should initialize without user', () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
    });

    it('2. should login correctly as admin', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );
      await act(async () => {
        screen.getByText('Login Admin').click();
      });
      expect(screen.getByTestId('user')).toHaveTextContent('admin@huertohogar.cl');
      expect(screen.getByTestId('role')).toHaveTextContent('admin');
    });

    it('3. should logout correctly', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );
      await act(async () => {
        screen.getByText('Login Admin').click();
      });
      await act(async () => {
        screen.getByText('Logout').click();
      });
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
    });

    it('4. should register correctly', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      );
      await act(async () => {
        screen.getByText('Register User').click();
      });
      expect(screen.getByTestId('user')).toHaveTextContent('test@test.com');
      expect(screen.getByTestId('role')).toHaveTextContent('user');
    });
  });

  describe('CartContext', () => {
    it('5. should add item to cart', async () => {
      render(
        <CartProvider>
          <CartTestComponent />
        </CartProvider>
      );
      await act(async () => {
        screen.getByText('Add 100').click();
      });
      expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
      expect(screen.getByTestId('cart-total')).toHaveTextContent('100');
    });

    it('6. should update quantity', async () => {
      render(
        <CartProvider>
          <CartTestComponent />
        </CartProvider>
      );
      await act(async () => {
        screen.getByText('Add 100').click();
      });
      await act(async () => {
        screen.getByText('Update 1 to 2').click();
      });
      expect(screen.getByTestId('cart-total')).toHaveTextContent('200');
    });

    it('7. should remove item from cart', async () => {
      render(
        <CartProvider>
          <CartTestComponent />
        </CartProvider>
      );
      await act(async () => {
        screen.getByText('Add 100').click();
      });
      await act(async () => {
        screen.getByText('Remove 1').click();
      });
      expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
    });

    it('8. should clear cart', async () => {
      render(
        <CartProvider>
          <CartTestComponent />
        </CartProvider>
      );
      await act(async () => {
        screen.getByText('Add 100').click();
      });
      await act(async () => {
        screen.getByText('Add 200').click();
      });
      await act(async () => {
        screen.getByText('Clear').click();
      });
      expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
    });
  });

  describe('ProductContext', () => {
    it('9. should have initial default products', () => {
      render(
        <ProductProvider>
          <ProductTestComponent />
        </ProductProvider>
      );
      // default products are 3
      expect(screen.getByTestId('products-length')).toHaveTextContent('9');
    });

    it('10. should add product and delete product', async () => {
      render(
        <ProductProvider>
          <ProductTestComponent />
        </ProductProvider>
      );
      await act(async () => {
        screen.getByText('Add Product').click();
      });
      expect(screen.getByTestId('products-length')).toHaveTextContent('10');

      await act(async () => {
        screen.getByText('Delete First').click();
      });
      expect(screen.getByTestId('products-length')).toHaveTextContent('9');
    });
  });
});
