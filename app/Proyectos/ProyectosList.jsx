"use client";
import { useEffect, useState, useMemo } from "react";
import SteamCard from "../components/SteamCard";
import styles from "./proyectos.module.css";

function mapRepoToItem(r) {
  return {
    id: r.id || r.name,
    title: r.name,
    subtitle: r.language || (r.description ? r.description.slice(0, 120) : ""),
    badge: r.stargazers_count ? `${r.stargazers_count}★` : undefined,
    image: `https://picsum.photos/seed/${encodeURIComponent(r.name)}/600/320`,
    url: r.html_url,
    // preservamos estas propiedades para ordenar
    updated_at: r.updated_at,
    language: r.language || "",
  };
}

export default function ProyectosList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("updated"); // 'updated' | 'language' | 'none'

  useEffect(() => {
    let abort = false;
    async function load() {
      setLoading(true);
      try {
        const resp = await fetch(
          "https://api.github.com/users/CarlosAl21/repos?per_page=100&sort=updated",
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!resp.ok) throw new Error("GitHub API error");
        const data = await resp.json();
        if (abort) return;
        const filtered = (Array.isArray(data) ? data : [])
          .filter((r) => r && r.name)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered.map(mapRepoToItem));
      } catch (e) {
        if (!abort) setError(e.message || "Error cargando repos");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    load();
    return () => {
      abort = true;
    };
  }, []);

  // calcular lista mostrada según sortBy
  const displayedRepos = useMemo(() => {
    const copy = [...repos];
    if (sortBy === "updated") {
      copy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (sortBy === "language") {
      copy.sort((a, b) => {
        const la = (a.language || "").toLowerCase();
        const lb = (b.language || "").toLowerCase();
        if (la === lb) return 0;
        return la > lb ? 1 : -1;
      });
    }
    return copy;
  }, [repos, sortBy]);

  // estilos de grid para 6 columnas y tarjetas más anchas
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 220px)",
    justifyContent: "center",
    gap: 28, // gap aumentado
  };

  return (
    <section className={styles.wrapper} style={{ background: "#2a2f38" }}>
      <div
        className={styles.header}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1>Proyectos</h1>
          <p className={styles.sub}>Biblioteca de proyectos — datos desde GitHub</p>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label style={{ color: "#9aa7b3" }}>Ordenar por</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 6,
              background: "#2b3032",
              color: "#eef2f5",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <option value="updated">Fecha (más recientes)</option>
            <option value="language">Lenguaje (A–Z)</option>
            <option value="none">Ninguno</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className={styles.center}>Cargando proyectos...</p>
      ) : error ? (
        <p className={styles.center}>Error: {error}</p>
      ) : (
        <div style={gridStyle}>
          {displayedRepos.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              style={{ display: "block", width: 220 }} // asegura ancho fijo
            >
              <SteamCard item={r} />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}