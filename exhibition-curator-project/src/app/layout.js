import "./globals.css";
import Navbar from "./ui/navbar";

export const metadata = {
  title: "Exhibit Ease",
  description: "Browse through a wide collection of stunning historical artworks and create personalized exhibitions that enhance your appreciation of art.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar />
        {children}
      </body>
    </html>
  );
}
