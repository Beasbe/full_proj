import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import ThemeTransitionProvider from "../src/components/ThemeTransitionProvider";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "АйТи Проект",
  description: "Системный Интегратор",
  icons: {
    icon: "/globe.svg",
    shortcut: "/globe.svg",
    apple: "/globe.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="it-project-theme"
          disableTransitionOnChange={false}
        >
          <ThemeTransitionProvider>
            <div className="min-h-screen bg-background text-copy-primary transition-colors duration-300">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
