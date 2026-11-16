/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

export const ProductContext = createContext();

// URL de API en Spring Boot
const API_URL = 'http://localhost:8080/api/productos';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener productos desde la API en Spring Boot
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error conectando a Spring Boot:', error);
        setLoading(false);
      });
  }, []);

  // Agregar producto a la BD
  const addProduct = useCallback(async (product) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        const nuevoProducto = await res.json();
        setProducts((prev) => [...prev, nuevoProducto]);
      }
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  }, []);

  // Actualizar producto en la BD
  const updateProduct = useCallback(async (id, updatedProduct) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        const productoModificado = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? productoModificado : p)));
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  }, []);

  // Eliminar producto en la BD
  const deleteProduct = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }, []);

  const value = useMemo(
    () => ({ products, loading, addProduct, updateProduct, deleteProduct }),
    [products, loading, addProduct, updateProduct, deleteProduct]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};