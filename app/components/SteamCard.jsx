"use client";
import styles from './SteamCard.module.css';

/**
 * @typedef {{ id: string|number, title?: string, subtitle?: string, price?: string, badge?: string, image?: string }} SteamItem
 */

/**
 * SteamCard reutilizable (placeholder-friendly).
 * @param {{ item: SteamItem, onClick?: (id: string|number)=>void }} props
 */
export default function SteamCard({ item = {}, onClick = () => {} }) {
  return (
    <article className={styles.card} onClick={() => onClick(item.id)}>
      <div className={styles.thumb} style={{ backgroundImage: item.image ? `url(${item.image})` : undefined }}>
        {!item.image && <span className={styles.thumbLabel}>{item.title || 'Imagen'}</span>}
        {item.badge && <span className={styles.badge}>{item.badge}</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{item.title || 'Título del juego'}</div>
        <div className={styles.subtitle}>{item.subtitle || 'Subtítulo / desarrollador'}</div>
        {item.price && <div className={styles.price}>{item.price}</div>}
      </div>
    </article>
  );
}