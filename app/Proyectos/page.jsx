"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from './page.module.css';

// importa imágenes locales como URLs
const CTTImg = new URL('../img/fotos proyectos/CTT.png', import.meta.url).toString();
const VetcontrolImg = new URL('../img/fotos proyectos/Vetcontrol.jpg', import.meta.url).toString();
const IESImg = new URL('../img/fotos proyectos/IES.png', import.meta.url).toString();
// Variantes de Ruta 593: mantiene solo la que sí existe en disco ("Ruta 593.png")
const Ruta593Img = new URL('../img/fotos proyectos/Ruta 593.png', import.meta.url).toString();
const PillaroImg = new URL('../img/fotos proyectos/Pillaro.png', import.meta.url).toString();

export default function Proyectos(){
	// estado repos
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sortBy, setSortBy] = useState('none'); // 'none' | 'updated' | 'language'

	useEffect(() => {
		let abort = false;

		// helper: intenta varias URLs locales y devuelve la primera que responde OK
		async function firstAvailableUrl(candidates = []) {
			for (const url of candidates) {
				try {
					const res = await fetch(url, { method: 'HEAD' });
					if (res && res.ok) return url;
				} catch (e) {
					// ignora y prueba la siguiente
				}
			}
			return null;
		}

		async function load() {
			setLoading(true);
			try {
				const resp = await fetch("https://api.github.com/users/CarlosAl21/repos?per_page=100&sort=updated", {
					headers: { Accept: "application/vnd.github.v3+json" }
				});
				if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
				const data = await resp.json();
				if (abort) return;

				// mapa de candidatos (array) por nombre de repo
				const localCandidates = {
					'PaginaWebCTT': [CTTImg],
					'vet-control_backend': [VetcontrolImg],
					'Backend-IES': [IESImg],
					'backend-ruta593': [Ruta593Img], // usar solo la ruta válida
					'Backend_Cementerio_Pillaro': [PillaroImg],
				};

				const arr = (Array.isArray(data) ? data : []).filter(r => r && r.name);
				// resolver imágenes locales (comprobando existencia) en paralelo
				const mapped = await Promise.all(arr.map(async (r) => {
					// elegir candidatos para este repo (si no hay, vacío)
					const candidates = localCandidates[r.name] || [];
					let imageUrl = null;
					if (candidates.length) {
						imageUrl = await firstAvailableUrl(candidates);
					}
					// fallback a picsum si no se encontró local
					if (!imageUrl) imageUrl = `https://picsum.photos/seed/${encodeURIComponent(r.name)}/600/320`;

					return {
						id: r.id || r.name,
						title: r.name,
						subtitle: r.description || '',
						language: r.language || '',
						badge: r.stargazers_count ? `${r.stargazers_count}★` : undefined,
						image: imageUrl,
						url: r.html_url,
						updated_at: r.updated_at
					};
				}));

				if (!abort) setRepos(mapped);
			} catch (e) {
				if (!abort) setError(e.message || "Error cargando repos");
			} finally {
				if (!abort) setLoading(false);
			}
		}
		load();
		return () => { abort = true; };
	}, []);

	const items = useMemo(() => {
		const arr = [...repos];
		if (sortBy === 'updated') {
			arr.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
		} else if (sortBy === 'language') {
			arr.sort((a,b) => {
				const la = (a.language || '').toLowerCase();
				const lb = (b.language || '').toLowerCase();
				if (la === lb) return 0;
				return la > lb ? 1 : -1;
			});
		}
		return arr;
	}, [repos, sortBy]);

	// estilos (no cambian tamaños de tarjeta)
	const mainStyle = {
		background: '#2a2f38',
		color: '#dfe7ee',
		minHeight: '100vh',
		padding: 28,
		fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
	};
	const headerStyle = { marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' };
	const controlsStyle = { display: 'flex', gap: 12, alignItems: 'center' };
	const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(6, 220px)', justifyContent: 'center', gap: 28, paddingBottom: 24 };

	const cardStyle = { width: 220, background: '#23282a', borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.5)', flex: '0 0 auto', textDecoration: 'none', color: 'inherit' };
	const metaStyle = { padding: 14 };
	const titleStyle = { fontWeight: 600, fontSize: 15, color: '#eef2f5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
	const subtitleStyle = { fontSize: 12, color: '#a3a9ac', marginTop: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' };
	const infoRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 12, color: '#9aa7b3' };

	// helper para formatear fecha (esp)
	function formatDate(iso) {
		if (!iso) return '—';
		try {
			return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
		} catch {
			return iso;
		}
	}

	// Card: mostrar descripción en el subtítulo; luego fecha (primera línea) y lenguaje (segunda línea)
	function Card({item}) {
		// fallback URL helper (same pattern used cuando no hay local)
		const picsum = `https://picsum.photos/seed/${encodeURIComponent(item.title || item.id)}/600/320`;

		return (
			<a href={item.url} target="_blank" rel="noopener noreferrer" style={cardStyle}>
				{/* reemplazamos el background-image por un IMG con object-fit para mejor ajuste y manejo de errores */}
				<div style={{ position: 'relative', height: 200, width: '100%', overflow: 'hidden' }}>
					<img
						src={item.image || picsum}
						alt={item.title || ''}
						onError={(e) => {
							// evitar loop: solo reemplazar una vez
							if (!e.target.dataset.failed) {
								e.target.dataset.failed = '1';
								e.target.src = picsum;
							}
						}}
						style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'translateZ(0)' }}
					/>
					{/* overlay suave para legibilidad */}
					<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.12))', pointerEvents: 'none' }} />
				</div>

				<div style={metaStyle}>
					<div style={titleStyle}>{item.title}</div>
					<div style={subtitleStyle}>{item.subtitle}</div>

					{/* Fecha arriba, lenguaje abajo (sin repetir) */}
					<div style={{ marginTop: 10, color: '#9aa7b3', fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<span style={{ opacity: 0.95 }}>Fecha de publicación</span>
							<span style={{ marginTop: 4, fontWeight: 600, color: '#dfe7ee' }}>{formatDate(item.updated_at)}</span>
							<span style={{ marginTop: 6, color: '#c3c9cc' }}>{item.language || '—'}</span>
						</div>
						{/* badge de estrellas */}
						<div style={{ marginLeft: 12, color: '#ffd166', fontWeight: 600 }}>{item.badge || ''}</div>
					</div>
				</div>
			</a>
		);
	}

	return (
		<main style={mainStyle}>
			<header style={headerStyle}>
				<div>
					<h1 style={{margin:0}}>Mis Proyectos</h1>
				</div>

				<div style={controlsStyle}>
					<label style={{color:'#c3c9cc', fontSize:13}}>Ordenar por</label>
					<select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} style={{padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.06)', background:'#2b3032', color:'#eef2f5'}}>
						<option value="none">Ninguno</option>
						<option value="updated">Fecha (más recientes)</option>
						<option value="language">Lenguaje (A–Z)</option>
					</select>
				</div>
			</header>

			{loading ? (
				<p style={{textAlign:'center'}}>Cargando proyectos...</p>
			) : error ? (
				<p style={{textAlign:'center'}}>Error: {error}</p>
			) : (
				<div style={gridStyle}>
					{items.map(item => (
						<Card key={item.id} item={item} />
					))}
				</div>
			)}
		</main>
	);
}