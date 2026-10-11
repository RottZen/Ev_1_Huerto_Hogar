import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Catalogo from '../pages/Catalogo';
import Carrito from '../pages/Carrito';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '@testing-library/jest-dom';

const mockProducts = [
  { id: 1, name: 'Semillas de Tomate', price: 1500, categoria: 'organicos' },
  { id: 2, name: 'Tierra de Hoja', price: 3000, categoria: 'organicos' },
  { id: 3, name: 'Macetero', price: 5000, categoria: 'organicos' }
];

describe('Page Components', () => {
  describe('Inicio Component', () => {
    it('renders hero section and featured products', () => {
      render(
        <MemoryRouter>
          <ProductContext.Provider value={{ products: mockProducts }}>
            <CartContext.Provider value={{}}>
              <Inicio />
            </CartContext.Provider>
          </ProductContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Del campo a tu deleite/i)).toBeInTheDocument();
      expect(screen.getByText(/Productos destacados/i)).toBeInTheDocument();
      expect(screen.getByText(/Ir al Catálogo/i)).toBeInTheDocument();
      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();
      expect(screen.getByText('Tierra de Hoja')).toBeInTheDocument();
      expect(screen.getByText('Macetero')).toBeInTheDocument();
    });
  });

  describe('Catalogo Component', () => {
    it('renders products and filters by search term', () => {
      render(
        <MemoryRouter>
          <ProductContext.Provider value={{ products: mockProducts }}>
            <CartContext.Provider value={{}}>
              <Catalogo />
            </CartContext.Provider>
          </ProductContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText('Nuestro Catálogo')).toBeInTheDocument();
      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();
      expect(screen.getByText('Tierra de Hoja')).toBeInTheDocument();
      expect(screen.getByText('Macetero')).toBeInTheDocument();

      const searchInput = screen.getByPlaceholderText(/Buscar producto.../i);
      fireEvent.change(searchInput, { target: { value: 'Tomate' } });

      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();
      expect(screen.queryByText('Macetero')).not.toBeInTheDocument();
    });
  });

  describe('Carrito Component', () => {
    it('renders empty cart view when cart is empty', () => {
      render(
        <MemoryRouter>
          <CartContext.Provider value={{ cart: [], cartTotal: 0 }}>
            <Carrito />
          </CartContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/El carrito está vacío./i)).toBeInTheDocument();
    });

    it('renders cart items and handles checkout via alerts', () => {
      window.alert = vi.fn();
      const mockUpdate = vi.fn();
      const mockRemove = vi.fn();
      const mockClear = vi.fn();

      render(
        <MemoryRouter>
          <CartContext.Provider
            value={{
              cart: [{ id: 1, name: 'Semillas de Tomate', price: 1500, quantity: 2, image: '' }],
              updateQuantity: mockUpdate,
              removeFromCart: mockRemove,
              clearCart: mockClear,
              cartTotal: 3000,
            }}
          >
            <Carrito />
          </CartContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText('Tu Carrito de Compras')).toBeInTheDocument();
      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();

      const plusBtn = screen.getByText('+');
      fireEvent.click(plusBtn);
      expect(mockUpdate).toHaveBeenCalledWith(1, 3);

      const checkoutBtn = screen.getByRole('button', { name: /Confirmar pedido/i });
      fireEvent.click(checkoutBtn);
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('¡Pedido confirmado!'));
      expect(mockClear).toHaveBeenCalled();
    });
  });

  describe('Login Component', () => {
    it('renders tabs and allows login', async () => {
      window.alert = vi.fn();
      const mockLogin = vi.fn();

      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ login: mockLogin }}>
            <Login />
          </AuthContext.Provider>
        </MemoryRouter>
      );

      const emailInput = screen.getAllByPlaceholderText(/ejemplo@correo.cl/i)[0]; // First one is login
      const passwordInput = screen.getAllByPlaceholderText(/••••••••/i)[0]; // First one is login

      fireEvent.change(emailInput, { target: { value: 'test@huerto.cl' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitBtn = screen.getByRole('button', { name: /Ingresar/i });
      
      await act(async () => {
        fireEvent.click(submitBtn);
      });

      expect(mockLogin).toHaveBeenCalledWith('test@huerto.cl', 'password123');
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('¡Bienvenido/a'));
    });
  });

  describe('Admin Component', () => {
    it('blocks unauthorized access if user is not admin', () => {
      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: { email: 'user@user.com', role: 'user' } }}>
            <ProductContext.Provider value={{ products: [], addProduct: vi.fn(), deleteProduct: vi.fn() }}>
              <Admin />
            </ProductContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      // It redirects to / (so nothing renders)
      expect(screen.queryByText(/Gestión de Productos/i)).not.toBeInTheDocument();
    });

    it('renders admin dashboard and allows adding products', async () => {
      const mockAddProduct = vi.fn();
      
      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: { email: 'admin@admin.com', role: 'admin' } }}>
            <ProductContext.Provider value={{ products: mockProducts, addProduct: mockAddProduct, deleteProduct: vi.fn() }}>
              <Admin />
            </ProductContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Gestión de Productos/i)).toBeInTheDocument();
      
      const openAddBtn = screen.getByRole('button', { name: /\+ Nuevo Producto/i });
      fireEvent.click(openAddBtn);
      
      expect(screen.getByText(/Agregar Nuevo Producto/i)).toBeInTheDocument();

      fireEvent.change(screen.getByPlaceholderText(/Ej: FR004/i), { target: { value: 'FR004' } });
      fireEvent.change(screen.getByPlaceholderText(/Ej: Frutillas Frescas/i), { target: { value: 'Frutillas Frescas' } });
      
      const inputs = screen.getAllByRole('spinbutton'); // price and stock
      fireEvent.change(inputs[0], { target: { value: '8990' } }); // price
      fireEvent.change(inputs[1], { target: { value: '10' } }); // stock
      
      const textboxes = screen.getAllByRole('textbox');
      // [0] = codigo, [1] = nombre, [2] = unidad, [3] = imagen (since they are text type)
      fireEvent.change(textboxes[2], { target: { value: 'kg' } }); // unidad
      fireEvent.change(textboxes[3], { target: { value: 'https://via.placeholder.com/150' } }); // imagen
      
      const saveBtn = screen.getByRole('button', { name: /Guardar Producto en Catálogo/i });
      
      await act(async () => {
        fireEvent.click(saveBtn);
      });

      expect(mockAddProduct).toHaveBeenCalled();
    });
  });
});
