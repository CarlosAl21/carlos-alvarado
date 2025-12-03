import "./globals.css";
import Navbar from "./components/navbar";
import ChatWidget from "./components/ChatWidget";
import CompactChat from "./components/CompactChat";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

// importa la imagen desde app/img usando import.meta.url
const G4TO = new URL("./img/G4TO.png", import.meta.url).toString();

export const metadata = {
  title: "Carlos Alvarado",
  description: "Portafolio",
  icons: {
    icon: G4TO, // favicon principal
    apple: G4TO, // apple touch
    other: [
      { rel: "icon", url: G4TO, sizes: "any" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>

        {/* Chat flotante global: siempre en el DOM */}
        <CompactChat />

        <Footer />
      </body>
    </html>
  );
}