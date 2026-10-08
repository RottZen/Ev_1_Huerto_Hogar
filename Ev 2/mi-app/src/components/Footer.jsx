import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row align-items-center gy-2">
          <div className="col-12 col-md-6 text-center text-md-start">
            <span className={styles.brandTitle}>🌱 HuertoHogar</span>
            <p className={styles.tagline}>
              Tu espacio para huertos urbanos y vida sustentable.
            </p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <p className={styles.copyright}>
              &copy; {currentYear} HuertoHogar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
