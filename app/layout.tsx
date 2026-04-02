import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Layout/Sidebar";
import { generateSidebar } from "@/lib/sidebar";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algorithmica - Next.js Knowledge Base",
  description: "Next-generation software architecture patterns",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarItems = await generateSidebar();

  return (
    <html
      lang="en"
      className={`${spaceMono.variable} h-full antialiased dark`}
    >
      <body className="h-full flex bg-[#09090b] text-zinc-100 selection:bg-blue-500/30 font-mono">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 h-full overflow-y-auto bg-[#09090b] shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.5)]">
          {children}
        </main>
      </body>
    </html>
  );
}
