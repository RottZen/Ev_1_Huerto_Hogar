import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const defaultProducts = [
    {
        id: "FR001",
        codigo: "FR001",
        name: "Manzanas Fuji",
        categoria: "frutas",
        price: 1200,
        unidad: "kg",
        image: "/assets/img/manzana-fuji.jpg",
        description: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.",
        origen: "Valle del Maule",
        stock: 150
    },
    {
        id: "FR002",
        codigo: "FR002",
        name: "Naranjas Valencia",
        categoria: "frutas",
        price: 1000,
        unidad: "kg",
        image: "/assets/img/naranjas-valencia.jpg",
        description: "Jugosas y ricas en vitamina C, ideales para zumos frescos.",
        origen: "Chile",
        stock: 200
    },
    {
        id: "FR003",
        codigo: "FR003",
        name: "Plátanos Cavendish",
        categoria: "frutas",
        price: 800,
        unidad: "kg",
        image: "/assets/img/platanos-cavendish.jpg",
        description: "Plátanos maduros y dulces, perfectos para el desayuno.",
        origen: "Chile",
        stock: 250
    },
    {
        id: "VR001",
        codigo: "VR001",
        name: "Zanahorias Orgánicas",
        categoria: "verduras",
        price: 900,
        unidad: "kg",
        image: "/assets/img/zanahorias-organicas.jpg",
        description: "Zanahorias crujientes cultivadas sin pesticidas.",
        origen: "Región de O'Higgins",
        stock: 100
    },
    {
        id: "VR002",
        codigo: "VR002",
        name: "Espinacas Frescas",
        categoria: "verduras",
        price: 700,
        unidad: "bolsa 500g",
        image: "/assets/img/espinacas-frescas.jpg",
        description: "Espinacas frescas y nutritivas.",
        origen: "Chile",
        stock: 80
    },
    {
        id: "VR003",
        codigo: "VR003",
        name: "Pimientos Tricolores",
        categoria: "verduras",
        price: 1500,
        unidad: "kg",
        image: "/assets/img/pimientos-tricolores.jpg",
        description: "Pimientos rojos, amarillos y verdes.",
        origen: "Chile",
        stock: 120
    },
    {
        id: "PO001",
        codigo: "PO001",
        name: "Miel Orgánica",
        categoria: "organicos",
        price: 5000,
        unidad: "frasco 500g",
        image: "/assets/img/miel-organica.jpg",
        description: "Miel pura y orgánica producida por apicultores locales.",
        origen: "Región de La Araucanía",
        stock: 50
    },
    {
        id: "PO003",
        codigo: "PO003",
        name: "Quinua Orgánica",
        categoria: "organicos",
        price: 3200,
        unidad: "bolsa 1kg",
        image: "/assets/img/quinua-organica.jpg",
        description: "Quinua orgánica, alta en proteínas y libre de gluten.",
        origen: "Chile",
        stock: 35
    },
    {
        id: "PL001",
        codigo: "PL001",
        name: "Leche Entera",
        categoria: "lacteos",
        price: 1100,
        unidad: "litro",
        image: "/assets/img/leche-entera.jpg",
        description: "Leche entera proveniente de granjas locales.",
        origen: "Chile",
        stock: 90
    }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('huerto_productos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error parsing localStorage products", e);
    }
    return defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem('huerto_productos', JSON.stringify(products));
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
