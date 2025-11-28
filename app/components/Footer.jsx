"use client";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandLogo}>VALVE</span>
          </div>

          <div className={styles.legal}>
            <p>© {new Date().getFullYear()} TuNombre. Todos los derechos reservados.</p>
            <p className={styles.smallLinks}>
              <a href="#" aria-label="Politica de privacidad">Política de Privacidad</a>
              <span> | </span>
              <a href="#" aria-label="Información legal">Información legal</a>
              <span> | </span>
              <a href="#" aria-label="Cookies">Cookies</a>
            </p>
          </div>
        </div>

        <nav className={styles.bottom}>
          <ul className={styles.links}>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Empleo</a></li>
            <li><a href="#">Distribución</a></li>
            <li><a href="#">Soporte</a></li>
            <li><a href="#">Tarjetas regalo</a></li>
          </ul>

          <div className={styles.social}>
            {/* simple SVG icons para mantener sin dependencias */}
            <a aria-label="Facebook" href="#" dangerouslySetInnerHTML={{__html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 12.07C22 6.488 17.523 2 12 2S2 6.488 2 12.07c0 4.99 3.657 9.128 8.438 9.93v-7.03H7.898v-2.9h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.563v1.874h2.773l-.443 2.9h-2.33v7.03C18.343 21.198 22 17.06 22 12.07z" fill="#cfe3ff"/></svg>' }} />
            <a aria-label="Twitter" href="#" dangerouslySetInnerHTML={{__html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 5.92c-.63.28-1.31.46-2.02.54.73-.44 1.29-1.13 1.55-1.96-.69.4-1.45.7-2.25.86C18.7 4.3 17.78 4 16.78 4c-1.64 0-2.97 1.33-2.97 2.97 0 .23.02.45.07.67C10.66 7.5 7.1 5.67 4.6 2.9c-.25.43-.39.93-.39 1.47 0 1.01.51 1.9 1.29 2.43-.47-.01-.91-.14-1.3-.36v.04c0 1.42 1.01 2.6 2.35 2.87-.24.06-.49.09-.75.09-.18 0-.36-.02-.54-.05.36 1.12 1.41 1.94 2.66 1.96C7.5 16 6.09 16.71 4.56 16.71c-.29 0-.57-.02-.85-.05 1.61 1.03 3.52 1.63 5.58 1.63 6.7 0 10.36-5.56 10.36-10.36v-.47C21.1 7.3 21.6 6.67 22 5.92z" fill="#cfe3ff"/></svg>' }} />
          </div>
        </nav>
      </div>
    </footer>
  );
}