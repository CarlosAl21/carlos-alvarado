"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './SteamHero.module.css';
import SteamCard from './SteamCard';

export default function SteamHero({ items = [] }) {
  // placeholders por defecto (si no hay items ni github)
  const defaultSlides = [
    { id: 'p1', title: 'Oferta Spotlight 1', subtitle: 'Evento', price: null, badge: 'Nuevo' },
    { id: 'p2', title: 'Juego destacado 2', subtitle: 'Popular', price: null, badge: '75% OFF' },
    { id: 'p3', title: 'Lanzamiento 3', subtitle: 'Nuevo lanzamiento', price: null, badge: 'Próximamente' },
    { id: 'p4', title: 'Indie 4', subtitle: 'Recomendado', price: null, badge: 'Trending' },
  ];

  const MAX_SLIDES = 4; // máximo a mostrar
  const [slides, setSlides] = useState(items.length ? items : defaultSlides.slice(0, MAX_SLIDES));
  const [loadingRepos, setLoadingRepos] = useState(false);

  // solo 1 visible a la vez (no tocar CSS)
  const [perView] = useState(1);

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const rootRef = useRef(null);

  // número de páginas = número de slides cuando perView === 1
  const pagesCount = Math.max(1, slides.length);

  useEffect(() => {
    if (index > pagesCount - 1) setIndex(pagesCount - 1);
    if (index < 0) setIndex(0);
  }, [pagesCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, pagesCount, slides.length]);

  function startAuto() {
    stopAuto();
    if (pagesCount > 1) {
      intervalRef.current = setInterval(() => {
        setIndex(i => (pagesCount ? (i + 1) % pagesCount : 0));
      }, 4200);
    }
  }
  function stopAuto() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function go(delta) {
    if (!pagesCount) return;
    setIndex(i => {
      const n = (i + delta + pagesCount) % pagesCount;
      return n;
    });
  }

  // Fetch últimos repos de GitHub (excluyendo "CarlosAl21") y mapear a slides.
  useEffect(() => {
    if (items && items.length) {
      setSlides(items.slice(0, MAX_SLIDES));
      return;
    }

    let abort = false;
    async function loadRepos() {
      setLoadingRepos(true);
      try {
        const resp = await fetch('https://api.github.com/users/CarlosAl21/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!resp.ok) throw new Error('GitHub API error');
        const repos = await resp.json();

        const filtered = (Array.isArray(repos) ? repos : [])
          .filter(r => r && r.name && r.name !== 'CarlosAl21')
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // limitar a MAX_SLIDES
        const mapped = filtered.slice(0, MAX_SLIDES).map(r => ({
          id: r.id || r.name,
          title: r.name,
          subtitle: r.language || (r.description ? r.description.slice(0, 80) : ''),
          badge: r.stargazers_count ? `${r.stargazers_count}★` : undefined,
          image: `https://picsum.photos/seed/${encodeURIComponent(r.name)}/800/450`,
          url: r.html_url
        }));

        if (!abort && mapped.length) {
          setSlides(mapped);
          setIndex(0);
        }
      } catch (e) {
        // silencioso: mantenemos placeholders si falla la petición
      } finally {
        if (!abort) setLoadingRepos(false);
      }
    }

    loadRepos();
    return () => { abort = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // translate por porcentaje (100% por slide porque perView === 1)
  const translatePercent = index * 100;

  return (
    <section className={styles.hero} ref={rootRef}>
      <div className={styles.left}>
        <div
          className={styles.carousel}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div
            className={styles.viewport}
            style={{ transform: `translateX(-${translatePercent}%)` }}
          >
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className={`${styles.slide} ${idx === index ? styles.active : ''}`}
                aria-hidden={idx !== index}
                style={{ width: `100%` }}
              >
                <a
                  className={styles.slideLink}
                  href={s.url || '#'}
                  target={s.url ? "_blank" : undefined}
                  rel={s.url ? "noopener noreferrer" : undefined}
                  onClick={(e) => { if (!s.url) e.preventDefault(); }}
                >
                  <div className={styles.slideContent}>
                    <h2 className={styles.slideTitle}>{s.title}</h2>
                    <p className={styles.slideSubtitle}>{s.subtitle}</p>
                  </div>
                  {s.image && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }} aria-hidden="true" />}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLES MOVIMOS AQUÍ, DEBAJO DEL CARRUSEL */}
        <div className={styles.controls}>
          <button aria-label="Anterior" onClick={() => go(-1)} className={styles.ctrlBtn}>&lt;</button>

          <div className={styles.dots}>
            {Array.from({ length: pagesCount }).map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === index ? styles.dotActive : ''}`} onClick={() => setIndex(i)} />
            ))}
          </div>

          <button aria-label="Siguiente" onClick={() => go(1)} className={styles.ctrlBtn}>&gt;</button>
        </div>
        
      </div>

      {/* <aside className={styles.right}>
        <div className={styles.sideBlock}>
          <div className={styles.sideList}>
            {slides.slice(0, 3).map(s => (
              <SteamCard
                key={s.id}
                item={{ id: s.id, title: s.title, subtitle: s.subtitle, badge: s.badge, image: s.image }}
                onClick={() => { if (s.url) window.open(s.url, '_blank'); }}
              />
            ))}
          </div>
        </div>

        <div className={styles.sideBlock}>Side module placeholder 2</div>
      </aside> */}
    </section>
  );
}