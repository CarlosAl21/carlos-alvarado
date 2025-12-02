import "./globals.css";
import Navbar from "./components/navbar";
import ChatWidget from "./components/ChatWidget";
import CompactChat from "./components/CompactChat";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "Carlos Alvarado",
  description: "Portafolio",
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