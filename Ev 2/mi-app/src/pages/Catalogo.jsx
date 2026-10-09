import { useContext, useState, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Catalogo = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'todos') {
      result = result.filter(p => p.categoria === activeCategory);
    }
    if (searchTerm.trim() !== '') {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    }
    return result;
  }, [products, searchTerm, activeCategory]);

  return (
    <main className="container my-5 flex-grow-1">
        <div className="text-center p-5 mb-5 rounded-4 shadow-sm bg-light">
            <h2 className="fw-bold text-success mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestro Catálogo</h2>
            <p className="text-secondary lead mb-0">Productos frescos, directo desde el campo hasta tu mesa.</p>
        </div>

        <div className="row mb-4 g-3 align-items-center">
            <div className="col-md-5">
                <input
                    type="text"
                    id="buscador-productos"
                    className="form-control"
                    placeholder="Buscar producto... (ej: manzanas)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="col-md-7 text-md-end">
                <div className="btn-group flex-wrap" role="group">
                    <button className={`btn btn-outline-success ${activeCategory === 'todos' ? 'active' : ''}`} onClick={() => setActiveCategory('todos')}>Todos</button>
                    <button className={`btn btn-outline-success ${activeCategory === 'frutas' ? 'active' : ''}`} onClick={() => setActiveCategory('frutas')}>Frutas Frescas</button>
                    <button className={`btn btn-outline-success ${activeCategory === 'verduras' ? 'active' : ''}`} onClick={() => setActiveCategory('verduras')}>Verduras Orgánicas</button>
                    <button className={`btn btn-outline-success ${activeCategory === 'organicos' ? 'active' : ''}`} onClick={() => setActiveCategory('organicos')}>Productos Orgánicos</button>
                    <button className={`btn btn-outline-success ${activeCategory === 'lacteos' ? 'active' : ''}`} onClick={() => setActiveCategory('lacteos')}>Productos Lácteos</button>
                </div>
            </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 grid-productos">
            {filteredProducts.length === 0 ? (
                <div className="col-12"><p className="text-center text-secondary">No se encontraron productos.</p></div>
            ) : (
                filteredProducts.map(product => (
                    <div className="col" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))
            )}
        </div>
    </main>
  );
};

export default Catalogo;
