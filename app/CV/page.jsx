"use client";
import React from "react";
import styles from "./page.module.css";
// importar imagen local (ruta relativa desde este archivo)
import bg from "../img/SteamBackground.png";

export default function CV() {
	// colaboradores provistos
	const collaborators = [
		{ name: "@badilleins", url: "https://github.com/badilleins", avatar: "https://avatars.githubusercontent.com/u/72108507?s=150" },
		{ name: "@D4rkGh057", url: "https://github.com/D4rkGh057", avatar: "https://avatars.githubusercontent.com/u/66801224?s=400&u=1" },
		{ name: "@ArielTonato", url: "https://github.com/ArielTonato", avatar: "https://avatars.githubusercontent.com/u/121694409?s=150&v=1" },
		{ name: "@ThomXasG", url: "https://github.com/ThomXasG", avatar: "https://avatars.githubusercontent.com/u/129432152?s=155&v=1" },
	];

	return (
		// aplicamos la imagen importada como background inline para asegurar que se cargue
		<main className="bg-[url('./img/SteamBackground.png')] min-h-screen bg-no-repeat bg-cover bg-fixed">
			{/* Se removió el <video> y el overlay; ahora el fondo usa la imagen local vía CSS */}

			{/* contenedor centrado */}
			<div className={styles.container}>
				{/* panel central con fondo propio (como el perfil de Steam) */}
				<div className={styles.panel}>

					{/* Header: avatar + nombre (mantenemos avatarWrap pero sin la rightPanel aquí) */}
					<div className={styles.header}>
						<div className={styles.avatarWrap}>
							<img className={styles.avatar} src="https://avatars.githubusercontent.com/u/108234879?s=400&u=445c9a7bef72f07f514549448544eae06e12a2e2&v=4" alt="Avatar" />
							<div className={styles.nameBlock}>
								<h1>Carlos Alvarado</h1>
							</div>
						</div>
					</div>

					{/* fila principal: columna izquierda con contenido y columna derecha con certificados/amigos */}
					<div className={styles.mainRow}>
						<section className={styles.leftCol}>

							<div className={styles.card}>
								<h3>🚀 Hi there! I'm Carlos Alvarado</h3>
								<p className={styles.lead}>
									I am an enthusiastic <strong>Software Engineering student</strong> (23) with a strong foundation in{" "}
									<strong>Full-Stack Development</strong>, currently specializing in building robust and scalable systems through{" "}
									<strong>Backend development</strong> and database architecture.
								</p>

								<hr />

								<h4>👨‍💻 About Me</h4>
								<ul>
									<li>Always learning new concepts and technologies.</li>
									<li>
										Current focus: <strong>Backend Development (Node.js / NestJS / Java)</strong>, architecture design, and performance optimization.
									</li>
									<li>I am currently in the <strong>8th semester of Software Engineering</strong> at the Universidad Técnica de Ambato.</li>
								</ul>
							</div>

							<div className={styles.card}>
								<h4>📊 GitHub Stats</h4>
								<div className={styles.stats}>
									<a href="https://github.com/CarlosAl21" target="_blank" rel="noreferrer">
										<img
											src="https://github-readme-stats.vercel.app/api?username=CarlosAl21&show_icons=true&theme=dark"
											alt="GitHub Stats"
										/>
									</a>
									<a href="https://github.com/CarlosAl21" target="_blank" rel="noreferrer">
										<img
											src="https://github-readme-stats.vercel.app/api/top-langs/?username=CarlosAl21&layout=compact&hide=HTML,CSS&theme=dark"
											alt="Top Langs"
										/>
									</a>
								</div>
							</div>
						</section>

						{/* Right column: aquí agrupamos Certificados y Amigos como bloques independientes */}
						<aside className={styles.rightCol}>
							<div className={styles.certCard}>
								<h4>Certificados</h4>
								<p className={styles.small}>Ver certificados en:</p>
								<a href="https://www.linkedin.com/in/carlos-alvarado-859a33365/" target="_blank" rel="noreferrer" className={styles.linkBtn}>LinkedIn • Carlos Alvarado</a>

								{/* certificados como items con imagen + título */}
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

							<div className={styles.friendsCard}>
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
				</div>
			</div>
		</main>
	);
}