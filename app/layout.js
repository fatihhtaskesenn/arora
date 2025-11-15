import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/templates/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Arora - Modern Yaşam İçin Kaliteli Ürünler",
  description: "Hayatınızı kolaylaştıran, modern tasarımlı ve yüksek kaliteli ürünler. E-ticaret ve portfolyo sitesi.",
  keywords: "e-ticaret, online alışveriş, kaliteli ürünler, modern tasarım",
  authors: [{ name: "Arora" }],
  openGraph: {
    title: "Arora - Modern Yaşam İçin Kaliteli Ürünler",
    description: "Hayatınızı kolaylaştıran, modern tasarımlı ve yüksek kaliteli ürünler.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
