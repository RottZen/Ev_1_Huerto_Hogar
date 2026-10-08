import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const defaultProducts = [
  { id: 1, name: 'Semillas de Tomate', price: 1500, description: 'Semillas orgánicas', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Tierra de Hoja', price: 3000, description: 'Saco de 5kg', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Macetero', price: 5000, description: 'Macetero de greda', image: 'https://via.placeholder.com/150' },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
