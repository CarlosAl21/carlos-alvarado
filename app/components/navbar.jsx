"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import CompactChat from "./CompactChat";

export default function Navbar() {
  const pathname = usePathname() || '/';
  
  const goBack = () => {
    if (typeof window !== 'undefined') window.history.back();
  };
  
  const goForward = () => {
    if (typeof window !== 'undefined') window.history.forward();
  };

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/Proyectos' },
    { name: 'Carlos Alvarado', path: '/CV' },
  ];

  return (
    <>
      <header className={styles.steamHeader}>
        <div className={styles.steamTopbar}>
          <div className={styles.steamContainer}>
            {/* Left section - arrows + navigation */}
            <div className={styles.steamLeft}>
              <div className={styles.steamNavArrows}>
                <button aria-label="Atrás" onClick={goBack} className={styles.steamArrowButton}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                <button aria-label="Adelante" onClick={goForward} className={styles.steamArrowButton}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <nav className={styles.steamCenter}>
                <ul className={styles.steamNavList}>
                  {navItems.map((item) => (
                    <li key={item.name} className={`${styles.steamNavItem} ${pathname === item.path ? styles.steamActive : ''}`}>
                      <Link href={item.path} className={styles.steamNavLink}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right section - user info */}
            <div className={styles.steamRight}>
              <div className={styles.steamUser}>
                {/* avatar + nombre como enlace al perfil de Steam */}
                <a
                  href="https://steamcommunity.com/id/g4to101/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: 0 }} // gap reducido
                >
                  <img
                    src="https://avatars.fastly.steamstatic.com/6130db294e1a9b984df986d9af90a9c794138a69_full.jpg"
                    alt="G4TO avatar"
                    style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }} // marginRight eliminado
                  />
                  <div className={styles.steamAvatar} style={{ marginLeft: 0 }}>G4TO</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      
    </>
  );
}