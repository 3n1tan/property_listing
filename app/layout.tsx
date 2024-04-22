import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar/app";
import Footer from "@/components/Footer/app";
import AuthProvider from "@/components/Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";

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
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body
            className={clsx(
              "min-h-[100lvh] bg-background font-mono antialiased",
              inter.className
            )}
          >
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "light" }}
            >
              <NavBar />
              {children}
              <Footer />
              <ToastContainer />
            </Providers>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
