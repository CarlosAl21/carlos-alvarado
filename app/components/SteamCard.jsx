"use client";
import React, { useCallback } from "react";
import styles from "./SteamRow.module.css";

/**
 * @typedef {{ id: string|number, title?: string, subtitle?: string, price?: string, badge?: string, image?: string }} SteamItem
 */

/**
 * SteamCard reutilizable (placeholder-friendly).
 * @param {{ item: SteamItem, onClick?: (id: string|number)=>void }} props
 */
export default function SteamCard({ item = {}, onClick = () => {} }) {
  // onLoad calcula ratio y lo coloca como variable CSS --ar en el contenedor .card
  const onImgLoad = useCallback((e) => {
    const img = e.currentTarget;
    const w = img.naturalWidth || img.width || 16;
    const h = img.naturalHeight || img.height || 9;
    const card = img.closest("[class*='card']"); // busca el wrapper .card (scoped)
    if (card) card.style.setProperty("--ar", `${w}/${h}`);
  }, []);

  return (
    // nota: el wrapper externo en SteamRow ya usa styles.card (aspect-ratio + width)
    <article className={styles.article}>
      <div className={styles.cardMedia}>
        <img
          src={item.image}
          alt={item.title}
          onLoad={onImgLoad}
          decoding="async"
        />
      </div>

      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{item.title}</h4>
        {item.subtitle && <p className={styles.cardSubtitle}>{item.subtitle}</p>}
      </div>
    </article>
  );
}