import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar/app";
import Footer from "@/components/Footer/app";
import AuthProvider from "@/components/Auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3n1t | Properties",
  description: "Your dream properties at your finger tips",
  keywords: "properties, real estate, houses, apartments, land, commercial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
