import SteamHero from "./components/SteamHero";
import SteamRow from "./components/SteamRow";
import CategoryCarousel from "./components/CategoryCarousel";
import FeaturedGrid from "./components/FeaturedGrid";

// Ejemplos / placeholders interactivos para ver el carrusel y tarjetas.
const heroItems = [
  {
    id: "h1",
    title: "Oferta de la semana",
    subtitle: "¡Hasta 75% OFF!",
    badge: "Oferta",
  },
  {
    id: "h2",
    title: "Nuevo lanzamiento",
    subtitle: "Reserva ahora",
    badge: "Nuevo",
  },
  {
    id: "h3",
    title: "Indie destacado",
    subtitle: "Recomendado por la comunidad",
    badge: "Top",
  },
];

// Usar skillicons (los mismos del README) para cada categoría
const rows = [
  // Languages
  [
    {
      id: "lang-js",
      title: "JavaScript",
      subtitle: "Language",
      image: "https://skillicons.dev/icons?i=js",
    },
    {
      id: "lang-ts",
      title: "TypeScript",
      subtitle: "Language",
      image: "https://skillicons.dev/icons?i=ts",
    },
    {
      id: "lang-java",
      title: "Java",
      subtitle: "Language",
      image: "https://skillicons.dev/icons?i=java",
    },
    {
      id: "lang-kotlin",
      title: "Kotlin",
      subtitle: "Language",
      image: "https://skillicons.dev/icons?i=kotlin",
    },
    {
      id: "lang-html",
      title: "HTML5",
      subtitle: "Markup",
      image: "https://skillicons.dev/icons?i=html",
    },
    {
      id: "lang-css",
      title: "CSS3",
      subtitle: "Styles",
      image: "https://skillicons.dev/icons?i=css",
    },
  ],

  // Frameworks & Libraries
  [
    {
      id: "fw-node",
      title: "Node.js",
      subtitle: "Backend",
      image: "https://skillicons.dev/icons?i=nodejs",
    },
    {
      id: "fw-nest",
      title: "NestJS",
      subtitle: "Backend",
      image: "https://skillicons.dev/icons?i=nestjs",
    },
    {
      id: "fw-react",
      title: "React",
      subtitle: "Frontend",
      image: "https://skillicons.dev/icons?i=react",
    },
    {
      id: "fw-next",
      title: "Next.js",
      subtitle: "Frontend",
      image: "https://skillicons.dev/icons?i=nextjs",
    },
    {
      id: "fw-rn",
      title: "React Native",
      subtitle: "Mobile",
      image: "https://skillicons.dev/icons?i=react",
    },
    {
      id: "fw-ionic",
      title: "Ionic",
      subtitle: "Mobile",
      image: "https://icons.veryicon.com/png/o/business/vscode-program-item-icon/ionic-4.png",
    },
    {
      id: "fw-godot",
      title: "Godot",
      subtitle: "Game Engine",
      image: "https://skillicons.dev/icons?i=godot",
    },
  ],

  // Databases
  [
    {
      id: "db-postgres",
      title: "PostgreSQL",
      subtitle: "DB",
      image: "https://skillicons.dev/icons?i=postgresql",
    },
    {
      id: "db-mongo",
      title: "MongoDB",
      subtitle: "NoSQL",
      image: "https://skillicons.dev/icons?i=mongodb",
    },
    {
      id: "db-mysql",
      title: "MySQL",
      subtitle: "DB",
      image: "https://skillicons.dev/icons?i=mysql",
    },
    {
      id: "db-sqlite",
      title: "SQLite",
      subtitle: "DB",
      image: "https://skillicons.dev/icons?i=sqlite",
    },
  ],

  // Tools / Design
  [
    {
      id: "tool-figma",
      title: "Figma",
      subtitle: "Design",
      image: "https://skillicons.dev/icons?i=figma",
    },
    {
      id: "tool-ai",
      title: "Illustrator",
      subtitle: "Design",
      image: "https://skillicons.dev/icons?i=ai",
    },
    {
      id: "tool-vscode",
      title: "VSCode",
      subtitle: "Editor",
      image: "https://skillicons.dev/icons?i=vscode",
    },
    {
      id: "tool-git",
      title: "Git",
      subtitle: "VCS",
      image: "https://skillicons.dev/icons?i=git",
    },
    {
      id: "tool-postman",
      title: "Postman",
      subtitle: "API",
      image: "https://skillicons.dev/icons?i=postman",
    },
  ],
];

const categories = [
  {
    id: "c-github",
    name: "GitHub",
    url: "https://github.com/CarlosAl21",
    image:
      "https://skillicons.dev/icons?i=github",
  },
  {
    id: "c-linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/carlos-alvarado-859a33365",
    image:
      "https://skillicons.dev/icons?i=linkedin",
  },
  {
    id: "c-instagram",
    name: "Instagram",
    url: "https://www.instagram.com/carlos.alvarado.21?igsh=M3Qxdm9nNzJvY2xm",
    image:
      "https://skillicons.dev/icons?i=instagram",
  },
];

// Featured: ejemplos sugeridos (puedes sustituir por tus repos/proyectos reales)
const featured = [
  {
    id: "feat-1",
    title: "Proyecto: API REST de reservas",
    subtitle: "Node.js / NestJS / PostgreSQL",
    image: "https://img.shields.io/badge/-API-1B6EFF?style=flat",
  },
  {
    id: "feat-2",
    title: "Sistema de gestión",
    subtitle: "Java / Spring (arquitectura)",
    image: "https://img.shields.io/badge/-Java-ED8B00?style=flat",
  },
  {
    id: "feat-3",
    title: "App móvil (PWA/React Native)",
    subtitle: "React Native / Next.js",
    image: "https://img.shields.io/badge/-Mobile-61DAFB?style=flat",
  },
  {
    id: "feat-4",
    title: "Análisis de BD",
    subtitle: "Modelado y optimización PostgreSQL",
    image: "https://img.shields.io/badge/-DB-316192?style=flat",
  },
  {
    id: "feat-5",
    title: "Integración CI/CD",
    subtitle: "GitHub Actions / Deploy",
    image: "https://img.shields.io/badge/-CI%2FCD-222?style=flat",
  },
  {
    id: "feat-6",
    title: "Proyecto personal",
    subtitle: "Repositorio con documentación y demo",
    image: "https://img.shields.io/badge/-Proyecto-2b2b2b?style=flat",
  },
];

export default function Page() {
  return (
    <main className="bg-[url('./img/SteamBackground.png')] min-h-screen bg-no-repeat bg-cover bg-fixed">
      <div className="max-w-[1250px] mx-auto px-4">

        <SteamHero />

        <section className="mt-8">
          {/* Ahora usamos skillicons para cada fila */}
          <SteamRow title="Languages" items={rows[0]} />
          <SteamRow title="Frameworks & Libraries" items={rows[1]} />
          <SteamRow title="Databases" items={rows[2]} />
          <SteamRow title="Tools & Design" items={rows[3]} />
        </section>

        <CategoryCarousel items={categories} className="mt-10" />
        {/* <FeaturedGrid items={featured} className="mt-10" /> */}
      </div>
    </main>
  );
}
