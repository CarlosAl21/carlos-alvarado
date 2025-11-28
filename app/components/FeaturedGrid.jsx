"use client";
import styles from './FeaturedGrid.module.css';

export default function FeaturedGrid({ items = [], className = '' }) {
  return (
    <section className={`${styles.featured} ${className}`}>
      <div className={styles.header}>
        <h3>Destacados</h3>
      </div>

      <div className={styles.grid}>
        {items.length === 0 ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.thumb}>Destacado</div>
              <div className={styles.body}>Info placeholder</div>
            </div>
          ))
        ) : (
          items.map(i => (
            <div key={i.id} className={styles.card}>
              <div className={styles.thumb} />
              <div className={styles.body}>{i.title}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}