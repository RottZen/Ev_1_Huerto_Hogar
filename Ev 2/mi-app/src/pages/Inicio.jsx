import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Inicio = () => {
  const { products } = useContext(ProductContext);
  // Sort randomly and show only up to 4 products in "Productos destacados"
  const featuredProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <>
      <section className="hero-section text-center p-5 mb-5 rounded-4 shadow-sm bg-light">
          <div className="col-lg-8 col-md-8 mx-auto">
              <h1 className="fw-bold text-success mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Del campo a tu deleite</h1>
              <p className="lead text-muted mb-4">En HuertoHogar apoyamos la cultura local y cuidamos la salud de tu familia. Cultivamos con amor, cosechamos con cuidado. Descubre la mejor seleccion de productos directo de granjas locales a tu mesa.</p>
              <Link to="/catalogo" className="btn btn-success btn-lg px-4 rounded-pill shadow-sm">Ir al Catálogo</Link>
          </div>
      </section>

      <div className="mb-4 text-center">
          <h2 className="fw-bold mb-3 border-bottom pb-2 d-inline-block">Productos destacados</h2>
      </div>    
      
      <div className="grid-productos row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
        {featuredProducts.map(product => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <section className="mb-5 bg-white p-5 rounded-4 shadow-sm border border-light mt-5">
          <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                  <h2 className="fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#2e8b57" }}>Sobre Nosotros</h2>
                  <p className="text-muted lead mb-4">En HuertoHogar creemos en lo natural, lo fresco y lo local.</p>
                  <p className="text-secondary">Somos un equipo de desarrolladores (Equipo TRAIGANMEN AL JSON) apasionados por conectar a los agricultores y granjas locales directamente con tu mesa. Nos dedicamos a seleccionar meticulosamente los mejores productos orgánicos, frutas, verduras y lácteos para asegurar que tu familia consuma alimentos de la más alta calidad, cultivados con amor y respeto por la tierra.</p>
              </div>
              <div className="col-lg-6 text-center">
                  <img src="/assets/img/logo.png" alt="Equipo HuertoHogar" className="img-fluid rounded-3" style={{ maxHeight: "250px", objectFit: "contain" }} />
              </div>
          </div>
      </section>

      <section className="mb-5 bg-light p-5 rounded-4 shadow-sm">
          <div className="text-center mb-4">
              <h2 className="fw-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#2e8b57" }}>Contáctanos</h2>
              <p className="text-muted">¿Tienes dudas o sugerencias? Déjanos un mensaje.</p>
          </div>
          <div className="row justify-content-center">
              <div className="col-lg-8">
                  <form onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado.'); e.target.reset(); }}>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <label className="form-label text-muted small fw-bold">Nombre Completo</label>
                              <input type="text" className="form-control shadow-sm" required placeholder="Tu nombre" />
                          </div>
                          <div className="col-md-6">
                              <label className="form-label text-muted small fw-bold">Correo Electrónico</label>
                              <input type="email" className="form-control shadow-sm" required placeholder="tu@correo.cl" />
                          </div>
                      </div>
                      <div className="mb-4">
                          <label className="form-label text-muted small fw-bold">Mensaje</label>
                          <textarea className="form-control shadow-sm" rows="4" required placeholder="Escribe tu mensaje aquí..."></textarea>
                      </div>
                      <div className="text-center">
                          <button type="submit" className="btn btn-success px-5 py-2 rounded-pill fw-bold shadow-sm">Enviar Mensaje</button>
                      </div>
                  </form>
              </div>
          </div>
      </section>
    </>
  );
};

export default Inicio;
