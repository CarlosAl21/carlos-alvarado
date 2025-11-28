import "./globals.css";
import Navbar from "./components/navbar";
import ChatWidget from "./components/ChatWidget";
import CompactChat from "./components/CompactChat";
import Footer from "./components/Footer";

export const metadata = {
  title: "Carlos Alvarado",
  description: "Portafolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>

        {/* Chat flotante global: siempre en el DOM */}
        <CompactChat />

        <Footer />
      </body>
    </html>
  );
}