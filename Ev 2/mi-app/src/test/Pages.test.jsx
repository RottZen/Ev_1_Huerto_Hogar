import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import Inicio from '../pages/Inicio';
import Catalogo from '../pages/Catalogo';
import Carrito from '../pages/Carrito';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Admin from '../pages/Admin';

const mockProducts = [
  { id: 1, name: 'Semillas de Tomate', price: 1500, description: 'Semillas orgánicas', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Tierra de Hoja', price: 3000, description: 'Saco de 5kg', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Macetero', price: 5000, description: 'Macetero de greda', image: 'https://via.placeholder.com/150' },
];

describe('Page Components', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Inicio Component', () => {
    it('renders hero section and featured products from ProductContext', () => {
      render(
        <MemoryRouter>
          <ProductContext.Provider value={{ products: mockProducts }}>
            <CartContext.Provider value={{ addToCart: vi.fn() }}>
              <Inicio />
            </CartContext.Provider>
          </ProductContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Cultiva tu propio bienestar con HuertoHogar/i)).toBeInTheDocument();
      expect(screen.getByText(/Productos Destacados/i)).toBeInTheDocument();
      expect(screen.getByText(/Ver Catálogo Completo/i)).toBeInTheDocument();
    });
  });

  describe('Catalogo Component', () => {
    it('renders all products from ProductContext and filters by search', () => {
      render(
        <MemoryRouter>
          <ProductContext.Provider value={{ products: mockProducts }}>
            <CartContext.Provider value={{ addToCart: vi.fn() }}>
              <Catalogo />
            </CartContext.Provider>
          </ProductContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText('Catálogo de Productos')).toBeInTheDocument();
      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();
      expect(screen.getByText('Tierra de Hoja')).toBeInTheDocument();
      expect(screen.getByText('Macetero')).toBeInTheDocument();

      const searchInput = screen.getByPlaceholderText(/Buscar productos/i);
      fireEvent.change(searchInput, { target: { value: 'Tomate' } });

      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();
      expect(screen.queryByText('Macetero')).not.toBeInTheDocument();
    });
  });

  describe('Carrito Component', () => {
    it('renders empty cart view when cart is empty', () => {
      render(
        <MemoryRouter>
          <CartContext.Provider
            value={{
              cart: [],
              updateQuantity: vi.fn(),
              removeFromCart: vi.fn(),
              clearCart: vi.fn(),
              cartTotal: 0,
              checkout: vi.fn(),
            }}
          >
            <Carrito />
          </CartContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
    });

    it('renders cart items and handles checkout', () => {
      const mockCheckout = vi.fn(() => true);
      const mockUpdate = vi.fn();
      const mockRemove = vi.fn();

      render(
        <MemoryRouter>
          <CartContext.Provider
            value={{
              cart: [
                { id: 1, name: 'Semillas de Tomate', price: 1500, quantity: 2, image: '' }
              ],
              updateQuantity: mockUpdate,
              removeFromCart: mockRemove,
              clearCart: vi.fn(),
              cartTotal: 3000,
              checkout: mockCheckout,
            }}
          >
            <Carrito />
          </CartContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText('Tu Carrito de Compras')).toBeInTheDocument();
      expect(screen.getByText('Semillas de Tomate')).toBeInTheDocument();

      // Test quantity increment button
      const plusBtn = screen.getByText('+');
      fireEvent.click(plusBtn);
      expect(mockUpdate).toHaveBeenCalledWith(1, 3);

      // Test checkout button
      const checkoutBtn = screen.getByRole('button', { name: /Finalizar Compra/i });
      fireEvent.click(checkoutBtn);
      expect(mockCheckout).toHaveBeenCalled();
      expect(screen.getByText(/¡Gracias por tu compra!/i)).toBeInTheDocument();
    });
  });

  describe('Login Component', () => {
    it('validates email and password and calls AuthContext.login', async () => {
      const mockLogin = vi.fn(() => ({ success: true }));

      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ login: mockLogin }}>
            <Login />
          </AuthContext.Provider>
        </MemoryRouter>
      );

      const submitBtn = screen.getByRole('button', { name: /Ingresar a HuertoHogar/i });

      // Submit with empty inputs
      await act(async () => {
        fireEvent.click(submitBtn);
      });
      expect(screen.getByText(/El correo electrónico es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña es requerida/i)).toBeInTheDocument();

      // Fill inputs correctly
      const emailInput = screen.getByPlaceholderText(/ejemplo@huertohogar.cl/i);
      const passwordInput = screen.getByPlaceholderText(/••••••••/i);

      fireEvent.change(emailInput, { target: { value: 'test@huerto.cl' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      await act(async () => {
        fireEvent.click(submitBtn);
      });

      expect(mockLogin).toHaveBeenCalledWith('test@huerto.cl', 'password123');
    });
  });

  describe('Registro Component', () => {
    it('validates registration form and calls AuthContext.register', async () => {
      const mockRegister = vi.fn(() => ({ success: true }));

      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ register: mockRegister }}>
            <Registro />
          </AuthContext.Provider>
        </MemoryRouter>
      );

      const submitBtn = screen.getByRole('button', { name: /Crear mi Cuenta/i });

      // Submit empty
      await act(async () => {
        fireEvent.click(submitBtn);
      });
      expect(screen.getByText(/El nombre completo es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes aceptar los términos/i)).toBeInTheDocument();

      // Fill with valid data
      fireEvent.change(screen.getByPlaceholderText(/María González/i), { target: { value: 'Juan Perez' } });
      fireEvent.change(screen.getByPlaceholderText(/maria@ejemplo.cl/i), { target: { value: 'juan@perez.cl' } });
      fireEvent.change(screen.getByPlaceholderText(/Mínimo 6 caracteres/i), { target: { value: 'secret123' } });
      fireEvent.change(screen.getByPlaceholderText(/Repite tu contraseña/i), { target: { value: 'secret123' } });
      fireEvent.click(screen.getByRole('checkbox'));

      await act(async () => {
        fireEvent.click(submitBtn);
      });

      expect(mockRegister).toHaveBeenCalledWith('juan@perez.cl', 'secret123');
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

      expect(screen.getByText(/Acceso Restringido/i)).toBeInTheDocument();
    });

    it('renders admin dashboard and allows adding and deleting products', async () => {
      const mockAddProduct = vi.fn();
      const mockDeleteProduct = vi.fn();
      window.confirm = vi.fn(() => true);

      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: { email: 'admin@admin.com', role: 'admin' } }}>
            <ProductContext.Provider
              value={{
                products: mockProducts,
                addProduct: mockAddProduct,
                deleteProduct: mockDeleteProduct,
              }}
            >
              <Admin />
            </ProductContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Panel de Administración/i)).toBeInTheDocument();
      expect(screen.getByText(/Inventario Actual/i)).toBeInTheDocument();

      // Test delete
      const deleteButtons = screen.getAllByRole('button', { name: /Eliminar producto/i });
      fireEvent.click(deleteButtons[0]);
      expect(mockDeleteProduct).toHaveBeenCalledWith(1);

      // Test form validation and adding product
      const saveBtn = screen.getByRole('button', { name: /Guardar Producto/i });
      await act(async () => {
        fireEvent.click(saveBtn);
      });
      expect(screen.getByText(/El nombre del producto es obligatorio/i)).toBeInTheDocument();

      fireEvent.change(screen.getByPlaceholderText(/Ej. Pala de Jardinería/i), { target: { value: 'Regadera Metálica' } });
      fireEvent.change(screen.getByPlaceholderText(/Ej. 4500/i), { target: { value: '8990' } });
      fireEvent.change(screen.getByPlaceholderText(/Describe las características/i), { target: { value: 'Regadera de 5 litros resistente' } });

      await act(async () => {
        fireEvent.click(saveBtn);
      });

      expect(mockAddProduct).toHaveBeenCalledWith({
        name: 'Regadera Metálica',
        price: 8990,
        description: 'Regadera de 5 litros resistente',
        image: 'https://via.placeholder.com/150',
      });
    });
  });
});
