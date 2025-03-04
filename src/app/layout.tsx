import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APE Les Mômes - Cagnotte en ligne",
  description: "Plateforme de financement participatif pour les projets de l'APE Les Mômes de l'école de Vair-sur-Loire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="px-4 md:px-0">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
