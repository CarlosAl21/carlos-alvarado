"use client";
import { useRef, useState, useEffect } from 'react';
import styles from './SteamRow.module.css';
import SteamCard from './SteamCard';

export default function SteamRow({ title = '', items = [] }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const check = () => {
      setCanLeft(t.scrollLeft > 8);
      setCanRight(t.scrollLeft + t.clientWidth < t.scrollWidth - 8);
    };
    check();
    t.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => {
      t.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [items]);

  function scrollByPage(dir = 1) {
    const t = trackRef.current;
    if (!t) return;
    const amount = Math.round(t.clientWidth * 0.9) * dir;
    t.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => {
      const t2 = trackRef.current;
      if (!t2) return;
      setCanLeft(t2.scrollLeft > 8);
      setCanRight(t2.scrollLeft + t2.clientWidth < t2.scrollWidth - 8);
    }, 340);
  }

  return (
    <section className={styles.row}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rowControls}>
          <button aria-label="Anterior" className={styles.rowNav} onClick={() => scrollByPage(-1)} disabled={!canLeft}>&lt;</button>
          <button aria-label="Siguiente" className={styles.rowNav} onClick={() => scrollByPage(1)} disabled={!canRight}>&gt;</button>
        </div>
      </div>

      <div className={styles.list} ref={trackRef}>
        {items.length === 0 ? (
          // render placeholder cards for visual consistency
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.card}>
              <SteamCard item={{ id: `ph-${i}`, title: `Placeholder ${i+1}`, subtitle: 'Sin datos' }} />
            </div>
          ))
        ) : (
          items.map(item => (
            <div key={item.id} className={styles.card}>
              <SteamCard item={item} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}