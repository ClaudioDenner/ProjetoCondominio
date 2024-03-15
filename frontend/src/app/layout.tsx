import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SidebarMobile from "@/components/sidebarMobile";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Área do Condômino",
  description: "Painel Administrativo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className=" bg-gray-100 flex justify-center items-center">
          <div className="flex w-full min-h-screen flex-row bg-gray-100 text-gray-800 max-w-screen-2xl">
            <Sidebar/>
            <SidebarMobile/>
            <main className="w-full md:w-4/5 main ml-0 md: -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
            {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
