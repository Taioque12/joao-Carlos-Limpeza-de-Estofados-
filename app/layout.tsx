import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Carlos Limpeza de Estofados | Higienização Profissional",
  description:
    "Higienização profissional de sofás, colchões e estofados com produtos biodegradáveis. Atendimento a domicílio, secagem rápida. Agende agora!",
  keywords: "limpeza de estofados, higienização sofá, limpeza colchão, higienização domicílio",
  openGraph: {
    title: "João Carlos Limpeza de Estofados",
    description: "Higienização profissional de sofás e colchões com atendimento a domicílio.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased bg-neutral-50 text-neutral-800">
        {children}
      </body>
    </html>
  );
}
