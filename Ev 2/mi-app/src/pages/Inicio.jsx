import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import heroImg from '../assets/hero.png';
import styles from './Inicio.module.css';

// Pure deterministic pseudo-random shuffle using linear congruential generator
const getFeaturedProducts = (items) => {
  if (!items || items.length === 0) return [];
  if (items.length <= 3) return items;
  return [...items]
    .sort((a, b) => {
      const hashA = ((Number(a.id || 0) * 9301 + 49297) % 233280);
      const hashB = ((Number(b.id || 0) * 9301 + 49297) % 233280);
      return hashA - hashB;
    })
    .slice(0, 3);
};

const Inicio = () => {
  const { products } = useContext(ProductContext);

  const featuredProducts = useMemo(() => {
    return getFeaturedProducts(products);
  }, [products]);

  return (
    <div className={styles.inicioContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>🌱 Huerto Sustentable en Casa</span>
              <h1 className={styles.heroTitle}>
                Cultiva tu propio bienestar con HuertoHogar
              </h1>
              <p className={styles.heroSubtitle}>
                Encuentra semillas orgánicas certificadas, tierras enriquecidas y
                las mejores herramientas para hacer crecer tu propio huerto urbano hoy mismo.
              </p>
              <div className={styles.heroCtaGroup}>
                <Link to="/catalogo" className={styles.btnPrimary}>
                  Ver Catálogo Completo 🌿
                </Link>
                <Link to="/carrito" className={styles.btnSecondary}>
                  Ir al Carrito 🛒
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className={styles.heroImageWrapper}>
              <img
                src={heroImg}
                alt="Huerto Urbano HuertoHogar"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Random Products Section */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Productos Destacados</h2>
          <p className={styles.sectionSubtitle}>
            Una selección especial de nuestros mejores productos para inspirar tu siembra
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.noProducts}>
            <p>No hay productos disponibles por el momento.</p>
          </div>
        )}

        <div className={styles.viewAllWrapper}>
          <Link to="/catalogo" className={styles.btnPrimary}>
            Explorar todos los productos ({products ? products.length : 0}) &rarr;
          </Link>
        </div>
      </section>

      {/* Benefits / Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>¿Por qué elegir HuertoHogar?</h2>
          <p className={styles.sectionSubtitle}>
            Comprometidos con el medio ambiente y la alimentación natural
          </p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🌿</span>
            <h3 className={styles.featureTitle}>100% Orgánico</h3>
            <p className={styles.featureText}>
              Semillas sin pesticidas ni químicos nocivos, listas para germinar vida sana.
            </p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🚚</span>
            <h3 className={styles.featureTitle}>Envíos a todo Chile</h3>
            <p className={styles.featureText}>
              Despachos seguros y rápidos directo a la puerta de tu hogar o departamento.
            </p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>👩‍🌾</span>
            <h3 className={styles.featureTitle}>Asesoría Experta</h3>
            <p className={styles.featureText}>
              Consejos prácticos de jardineros urbanos para que tus plantas crezcan fuertes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
