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
  title: "Holy Grain files",
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
      className={`${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="h-full flex bg-background text-foreground selection:bg-primary/30 font-mono transition-colors duration-300">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 h-full overflow-y-auto bg-background relative">
          {children}
        </main>
      </body>
    </html>
  );
}
