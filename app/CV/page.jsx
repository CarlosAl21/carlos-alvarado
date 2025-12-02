"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
// importar imagen local (ruta relativa desde este archivo)
import bg from "../img/SteamBackground.png";

export default function CV() {
  const [showPdf, setShowPdf] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.preload = "auto";
      const p = v.play();
      if (p && typeof p.then === "function") p.catch(() => {/* ignore autoplay rejected */});
    }
  }, []);

  const collaborators = [
    { name: "@JosliBlue", url: "https://github.com/JosliBlue", avatar: "https://avatars.githubusercontent.com/u/129903903?v=4" },
    { name: "@D4rkGh057", url: "https://github.com/D4rkGh057", avatar: "https://avatars.githubusercontent.com/u/66801224?s=400&u=1" },
    { name: "@ArielTonato", url: "https://github.com/ArielTonato", avatar: "https://avatars.githubusercontent.com/u/121694409?s=150&v=1" },
    { name: "@ThomXasG", url: "https://github.com/ThomXasG", avatar: "https://avatars.githubusercontent.com/u/129432152?s=155&v=1" },
  ];

  return (
    // <main className="bg-[url('./img/SteamBackground.png')] min-h-screen bg-no-repeat bg-cover bg-fixed">
	<main className="min-h-screen bg-black">
      {/* bgWrapper ahora SOLO contiene el video */}
      <div className={styles.bgWrapper}>
        <video
          ref={videoRef}
          className={styles.bgVideo}
          src="https://shared.fastly.steamstatic.com/community_assets/images/items/1492660/3b67d75c3161ff8ebb1501f4436b839ea490e050.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* máscara para disimular bordes cuando el video no alcanza */}
        <div className={styles.bgMask} aria-hidden="true" />

        {/* overlay final: sutil degradado negro que se sobrepone al borde del video */}
        <div className={styles.bgEndFade} aria-hidden="true" />
      </div>

      {/* contenedor de contenido fuera del bgWrapper (se renderiza encima) */}
      <div className={styles.container}>
        <div className={styles.panel}>
          {/* Header: avatar + nombre (mantenemos avatarWrap) */}
          <div className={styles.header}>
            <div className={styles.avatarWrap}>
              <img className={styles.avatar} src="https://avatars.githubusercontent.com/u/108234879?s=400&u=445c9a7bef72f07f514549448544eae06e12a2e2&v=4" alt="Avatar" />
              <div className={styles.nameBlock}>
                <h1>Carlos Alvarado</h1>
              </div>
            </div>
          </div>

          {/* fila principal: columna izquierda con contenido y columna derecha con certificados */ }
          <div className={styles.mainRow}>
            <section className={styles.leftCol}>
              <div className={styles.card}>
              {/* ----- README Hero insertado ----- */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h1 style={{ fontWeight: 800 }}>
            <b>Hi , I'm Carlos Alvarado</b>
          </h1>
          <div style={{ marginTop: 8 }}>
            <img src="https://c.tenor.com/92MplgQwb80AAAAC/tenor.gif" alt="Cat coding GIF" width="80" />
          </div>
          <div style={{ marginTop: 12 }}>
            <img
              src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&center=true&lines=Software+Engineer+Student;Full-Stack+Developer;Backend+Specialist;Always+learning+new+things"
              alt="Typing SVG"
              style={{ width: "100%", maxWidth: 720, height: 50 }}
            />
          </div>
        </div>
        {/* ----- /Hero ----- */}
              <h3>🚀 About me</h3>

              {/* right-side decorative gif (como en README) */}
              <div style={{ float: "right", marginLeft: 12 }}>
                <img src="https://github.com/7oSkaaa/7oSkaaa/blob/main/Images/Right_Side.gif?raw=true" width={180} alt=" decoration " />
              </div>

              <p className={styles.lead}>
                I am an enthusiastic <strong>Software Engineering student</strong> (23) with a strong foundation in <strong>Full-Stack Development</strong>, currently specializing in building robust and scalable systems through <strong>Backend development</strong> and database architecture.
              </p>

              <ul>
                <li>I am currently in the <strong>8th semester of Software Engineering</strong> at the Universidad Técnica de Ambato.</li>
                <li>I possess skills across the entire stack, but my current focus is on designing and implementing efficient, reliable APIs, services, and complex database structures.</li>
                <li>My current focus is on <strong>Backend Development (Node.js / NestJS / Java)</strong>, architecture design, and performance optimization.</li>
              </ul>
            </div>

            {/* stats: ligeramente más grandes (maxWidth: 280) */}
            <div className={styles.card}>
              <h4>📊 Stats</h4>
              <div className={styles.stats} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <img
                  src="http://github-profile-summary-cards.vercel.app/api/cards/stats?username=CarlosAl21&theme=github_dark"
                  alt="GitHub Stats"
                  style={{ maxWidth: 325, width: "100%", height: "auto" }}
                />
                <img
                  src="http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=CarlosAl21&theme=github_dark"
                  alt="Repos per language"
                  style={{ maxWidth: 325, width: "100%", height: "auto" }}
                />
                <img
                  src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=CarlosAl21&theme=github_dark"
                  alt="Profile details"
                  style={{ maxWidth: 659, width: "100%", height: "auto" }}
                />
              </div>
            </div>
            
            {/* cierre / call to action del README */}
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <p style={{ marginBottom: 6 }}>
                <img src="https://c.tenor.com/92MplgQwb80AAAAC/tenor.gif" alt="Cat coding GIF" width="80" />
              </p>
              <p style={{ fontStyle: "italic" }}>*Thanks for visiting my profile. Check out my repositories!*</p>
            </div>
          </section>

          {/* Right column: Certificados + CV PDF (no incluir colaboradores) */}
          <aside className={styles.rightCol}>
            <div className={styles.certCard}>
              <h4>📜 Certificados</h4>
              <p className={styles.small}>Ver certificados en:</p>
              <a href="https://www.linkedin.com/in/carlos-alvarado-859a33365/" target="_blank" rel="noreferrer" className={styles.linkBtn}>LinkedIn • Carlos Alvarado</a>

              <div className={styles.certsList}>
                <div className={styles.certItem}>
                  <img src="https://images.credly.com/size/340x340/images/b93bf373-3da6-4ada-9879-a0c39d6a11f8/image.png" alt="JavaScript Essentials 1" />
                  <div className={styles.certTitle}>JavaScript Essentials 1</div>
                </div>
                <div className={styles.certItem}>
                  <img src="https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/26a595f4-f654-46ca-8c4c-357584554614.png" alt="JavaScript Essentials 2" />
                  <div className={styles.certTitle}>JavaScript Essentials 2</div>
                </div>
              </div>
            </div>

            {/* CV PDF: ver / descargar */}
            <div className={styles.card} style={{ marginTop: 12 }}>
              <h4>📄 CV </h4>
              <p className={styles.small}>Haz clic para ver mi CV.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className={styles.linkBtn} onClick={() => setShowPdf(true)} aria-label="Ver CV">Ver CV</button>
              </div>
            </div>

            {/* colaboradores (moved below CV in right column) */}
            <div className={styles.friendsCard} style={{ marginTop: 12 }}>
              <h4>Colaboradores</h4>
              <div className={styles.friendsList}>
                {collaborators.map(c => (
                  <a key={c.name} href={c.url} className={styles.friend} target="_blank" rel="noreferrer">
                    <img src={c.avatar} alt={c.name} />
                    <div className={styles.friendName}>{c.name}</div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Música / footer visual del README */}
        <div style={{ marginTop: 18 }}>
          <img src="https://i.imgur.com/dBaSKWF.gif" height="20" width="100%" alt="" />
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <p>🎵Lo Que Ha Estado Sonando🎵</p>
            <img src="https://spotify-recently-played-readme.vercel.app/api?user=12154863792&count=5" alt="Spotify recent" style={{ maxWidth: "100%" }} />
          </div>
            <img src="https://i.imgur.com/dBaSKWF.gif" height="20" width="100%" alt="" style={{ marginTop: 12 }} />
          </div>
        </div>
        </div>
  
        {/* Modal simple para mostrar el PDF */}
        {showPdf && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2,8,18,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
            padding: 24,
          }}
          onClick={() => setShowPdf(false)}
        >
          <div
            style={{ width: "90%", height: "85%", background: "#0b1a26", borderRadius: 8, overflow: "hidden", boxShadow: "0 10px 30px rgba(2,8,20,0.6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", padding: 8, background: "rgba(255,255,255,0.02)" }}>
              <button onClick={() => setShowPdf(false)} style={{ padding: "6px 10px" }}>Cerrar</button>
            </div>
            <iframe src="https://drive.google.com/file/d/1tdMJaPMEkAxk-FkV33yevOJubtUVw9Dl/preview" title="CV PDF" style={{ width: "100%", height: "100%", border: 0 }} />
          </div>
          
        </div>
        
      )}
    </main>
  );
}