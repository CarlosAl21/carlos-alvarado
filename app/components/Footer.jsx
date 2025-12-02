"use client";
import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.brand}>
          <h3 className={styles.name}>Carlos Alvarado</h3>
          <p className={styles.role}>Fullstack Developer</p>
        </div>

        

        <div className={styles.meta}>
          <span>© {new Date().getFullYear()} Carlos Alvarado</span>
          <span className={styles.sep}>·</span>
          <span>Hecho con Next.js</span>
        </div>
      </div>
    </footer>
  );
}