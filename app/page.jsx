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

const rows = [
  // Lenguajes (añadí image: logo-badge)
  [
    {
      id: "lang-sql",
      title: "SQL",
      subtitle: "Bases de datos",
      image:
        "https://img.shields.io/badge/-SQL-386B94?style=flat&logo=mysql&logoColor=white",
    },
    {
      id: "lang-js",
      title: "JavaScript",
      subtitle: "Lenguaje",
      image:
        "https://img.shields.io/badge/-JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E",
    },
    {
      id: "lang-ts",
      title: "TypeScript",
      subtitle: "Lenguaje",
      image:
        "https://img.shields.io/badge/-TypeScript-007ACC?style=flat&logo=typescript&logoColor=white",
    },
    {
      id: "lang-java",
      title: "Java",
      subtitle: "Lenguaje",
      image:
        "https://img.shields.io/badge/-Java-ED8B00?style=flat&logo=openjdk&logoColor=white",
    },
    {
      id: "lang-kotlin",
      title: "Kotlin",
      subtitle: "Lenguaje",
      image:
        "https://img.shields.io/badge/-Kotlin-7F52FF?style=flat&logo=kotlin&logoColor=white",
    },
    {
      id: "lang-html",
      title: "HTML5",
      subtitle: "Markup",
      image:
        "https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white",
    },
    {
      id: "lang-css",
      title: "CSS3",
      subtitle: "Estilos",
      image:
        "https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white",
    },
  ],

  // Frameworks / librerías (image: logo-badge)
  [
    {
      id: "fw-node",
      title: "Node.js",
      subtitle: "Backend",
      image:
        "https://img.shields.io/badge/-Node.js-339933?style=flat&logo=nodedotjs&logoColor=white",
    },
    {
      id: "fw-nest",
      title: "NestJS",
      subtitle: "Backend",
      image:
        "https://img.shields.io/badge/-NestJS-E0234E?style=flat&logo=nestjs&logoColor=white",
    },
    {
      id: "fw-react",
      title: "React",
      subtitle: "Frontend",
      image:
        "https://img.shields.io/badge/-React-20232A?style=flat&logo=react&logoColor=61DAFB",
    },
    {
      id: "fw-next",
      title: "Next.js",
      subtitle: "Frontend",
      image:
        "https://img.shields.io/badge/-Next.js-000000?style=flat&logo=nextdotjs&logoColor=white",
    },
    {
      id: "fw-rn",
      title: "React Native",
      subtitle: "Mobile",
      image:
        "https://img.shields.io/badge/-React_Native-20232A?style=flat&logo=react&logoColor=61DAFB",
    },
    {
      id: "fw-ionic",
      title: "Ionic",
      subtitle: "Mobile",
      image:
        "https://img.shields.io/badge/-Ionic-3880FF?style=flat&logo=ionic&logoColor=white",
    },
  ],

  // Bases de datos (image: logo-badge)
  [
    {
      id: "db-postgres",
      title: "PostgreSQL",
      subtitle: "Base de datos",
      image:
        "https://img.shields.io/badge/-PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white",
    },
    {
      id: "db-mongo",
      title: "MongoDB",
      subtitle: "NoSQL",
      image:
        "https://img.shields.io/badge/-MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white",
    },
    {
      id: "db-mysql",
      title: "MySQL",
      subtitle: "Base de datos",
      image:
        "https://img.shields.io/badge/-MySQL-005C84?style=flat&logo=mysql&logoColor=white",
    },
    {
      id: "db-xampp",
      title: "XAMPP",
      subtitle: "Servidor local",
      image:
        "https://img.shields.io/badge/-XAMPP-F37623?style=flat&logo=xampp&logoColor=white",
    },
  ],
];

const categories = [
  {
    id: "c-github",
    name: "GitHub",
    url: "https://github.com/CarlosAl21",
    image:
      "https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white",
  },
  {
    id: "c-linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/carlos-alvarado-859a33365",
    image:
      "https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white",
  },
  {
    id: "c-instagram",
    name: "Instagram",
    url: "https://www.instagram.com/carlos.alvarado.21?igsh=M3Qxdm9nNzJvY2xm",
    image:
      "https://img.shields.io/badge/-Instagram-E4405F?style=flat&logo=instagram&logoColor=white",
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
        <h2 className="text-sm font-bold text-white mb-0">
          PROYECTOS RECIENTES
        </h2>
        <SteamHero />
        <section className="mt-8">
          <SteamRow title="Lenguajes que manejo" items={rows[0]} />
          <SteamRow title="Frameworks y librerías" items={rows[1]} />
          <SteamRow title="Bases de datos" items={rows[2]} />
        </section>
        <CategoryCarousel items={categories} className="mt-10" />
        {/* <FeaturedGrid items={featured} className="mt-10" /> */}
      </div>
    </main>
  );
}
