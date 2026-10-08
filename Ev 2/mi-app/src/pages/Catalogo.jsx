import { useContext, useState, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import styles from './Catalogo.module.css';

const Catalogo = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let list = products.filter((p) => {
      const matchName = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDesc = p.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchName || matchDesc;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return list;
  }, [products, searchTerm, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortBy('default');
  };

  return (
    <div className={styles.catalogoContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Catálogo de Productos</h1>
        <p className={styles.subtitle}>
          Explora nuestra selección completa de insumos, semillas y herramientas para tu huerto
        </p>
      </header>

      {/* Search and Sort controls */}
      <div className={styles.filterCard}>
        <div className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>

          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Ordenar productos"
          >
            <option value="default">Orden por defecto</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A - Z</option>
          </select>

          <div className={styles.countBadge}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🌱</span>
          <h2 className={styles.emptyTitle}>No encontramos productos</h2>
          <p className={styles.emptyText}>
            Intenta con otro término de búsqueda o restablece los filtros.
          </p>
          <button
            type="button"
            className={styles.btnReset}
            onClick={handleClearFilters}
          >
            Restablecer Búsqueda
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
