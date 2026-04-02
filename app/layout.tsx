import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import PageTransitionWrapper from "./components/site/PageTransitionWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Линия Гранита",
  description: "Линия Гранита — архитектура памяти",
  metadataBase: new URL("https://linia-granita.vercel.app"),
  openGraph: {
    title: "Линия Гранита",
    description: "Архитектура памяти: каталог памятников и благоустройство.",
    type: "website",
    url: "https://linia-granita.vercel.app",
    siteName: "Линия Гранита",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Линия Гранита",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Линия Гранита",
    description: "Архитектура памяти: каталог памятников и благоустройство.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-site-theme="dark" suppressHydrationWarning>
      <script
        // Устанавливаем тему до гидрации, чтобы не было "мигания" и проблем с читаемостью.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          try {
            const stored = window.localStorage.getItem('site_theme');
            const nextTheme = stored === 'light' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-site-theme', nextTheme);
          } catch (e) {}
        `,
        }}
      />
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </body>
    </html>
  );
}
