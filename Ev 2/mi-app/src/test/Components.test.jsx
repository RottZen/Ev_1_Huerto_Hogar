import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

describe('Reusable Components', () => {
  describe('Navbar Component', () => {
    it('renders logo and basic navigation links', () => {
      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: null, logout: vi.fn() }}>
            <CartContext.Provider value={{ cart: [] }}>
              <Navbar />
            </CartContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByRole('link', { name: /^Inicio$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^Catalogo$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Mi Cuenta/i })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /Panel de Control/i })).not.toBeInTheDocument();
    });

    it('displays cart item count badge when items are in cart', () => {
      const mockCart = [
        { id: 1, name: 'Semillas', quantity: 2 },
        { id: 2, name: 'Tierra', quantity: 3 },
      ];

      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: null, logout: vi.fn() }}>
            <CartContext.Provider value={{ cart: mockCart }}>
              <Navbar />
            </CartContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders user and logout button when user is logged in', () => {
      const mockLogout = vi.fn();
      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: { email: 'test@example.com', role: 'user' }, logout: mockLogout }}>
            <CartContext.Provider value={{ cart: [] }}>
              <Navbar />
            </CartContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      const logoutBtn = screen.getByRole('button', { name: /Salir/i });
      expect(logoutBtn).toBeInTheDocument();

      fireEvent.click(logoutBtn);
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('renders admin link when user role is admin', () => {
      render(
        <MemoryRouter>
          <AuthContext.Provider value={{ user: { email: 'admin@example.com', role: 'admin' }, logout: vi.fn() }}>
            <CartContext.Provider value={{ cart: [] }}>
              <Navbar />
            </CartContext.Provider>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      expect(screen.getByRole('link', { name: /Panel de Control/i })).toBeInTheDocument();
    });
  });

  describe('Footer Component', () => {
    it('renders copyright with current year and brand name', () => {
      render(<Footer />);
      expect(screen.getByText(/HuertoHogar/i)).toBeInTheDocument();
      expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
    });
  });

  describe('ProductCard Component', () => {
    const mockProduct = {
      id: 101,
      name: 'Macetero Ecológico',
      price: 4500,
      description: 'Macetero biodegradable para huerto urbano.',
      image: 'https://example.com/macetero.jpg',
    };

    it('renders product details correctly', () => {
      render(
        <CartContext.Provider value={{ addToCart: vi.fn() }}>
          <ProductCard product={mockProduct} />
        </CartContext.Provider>
      );

      expect(screen.getByText('Macetero Ecológico')).toBeInTheDocument();
      expect(screen.getByText('$4.500')).toBeInTheDocument();

      const image = screen.getByRole('img', { name: 'Macetero Ecológico' });
      expect(image).toHaveAttribute('src', 'https://example.com/macetero.jpg');
    });

    it('calls custom onAddToCart callback when add button is clicked', () => {
      const handleAddToCart = vi.fn();
      render(
        <CartContext.Provider value={{ addToCart: vi.fn() }}>
          <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
        </CartContext.Provider>
      );

      const button = screen.getByRole('button', { name: /Agregar al carrito/i });
      fireEvent.click(button);

      expect(handleAddToCart).toHaveBeenCalledTimes(1);
      expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('calls CartContext.addToCart when no custom callback is provided', () => {
      window.alert = vi.fn();
      const mockContextAddToCart = vi.fn();
      render(
        <CartContext.Provider value={{ addToCart: mockContextAddToCart }}>
          <ProductCard product={mockProduct} />
        </CartContext.Provider>
      );

      const button = screen.getByRole('button', { name: /Agregar al carrito/i });
      fireEvent.click(button);

      expect(mockContextAddToCart).toHaveBeenCalledTimes(1);
      expect(mockContextAddToCart).toHaveBeenCalledWith(mockProduct);
      expect(window.alert).toHaveBeenCalledWith('¡Producto agregado al carrito!');
    });
  });
});
