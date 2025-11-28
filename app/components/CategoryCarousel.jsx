"use client";
import { useRef, useEffect, useState } from 'react';
import styles from './CategoryCarousel.module.css';

export default function CategoryCarousel({ items = [], className = '' }) {
  const trackRef = useRef(null);
  useEffect(() => {
    const check = () => {
      const t = trackRef.current;
      if (!t) return;
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [items]);

  return (
    <section className={`${styles.carousel} ${className}`}>
      <div className={styles.header}>
        <h3>Social Networks</h3>
      </div>

      <div className={styles.track} ref={trackRef}>
        {items.length === 0 ? (
          <>
            <div className={styles.cat}>Categoría 1</div>
            <div className={styles.cat}>Categoría 2</div>
            <div className={styles.cat}>Categoría 3</div>
            <div className={styles.cat}>Categoría 4</div>
          </>
        ) : (
          items.map((c) => {
            // Si el item tiene url (redes sociales) mostramos sólo el logo centrado y clicable
            if (c.url) {
              return (
                <a key={c.id} className={`${styles.cat} ${styles.iconOnly}`} href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                  {c.image && <img src={c.image} alt={c.name} className={styles.logo} />}
                </a>
              );
            }

            // items sin url mantienen logo + label
            return (
              <div key={c.id} className={styles.cat}>
                {c.image && <img src={c.image} alt={c.name} className={styles.logo} />}
                <span className={styles.catLabel}>{c.name}</span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}