import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { HoverProvider } from "@/context/HoverContext";

const geistSans = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Abdullah Mahmood | Full Stack & UI/UX Engineer",
  description: "Portfolio of Mohammed Abdullah Mahmood, a Full Stack Developer & AI Integrator specializing in scalable systems and interactive UI/UX design.",
  openGraph: {
    title: "Mohammed Abdullah Mahmood | Full Stack & UI/UX Engineer",
    description: "Portfolio of Mohammed Abdullah Mahmood, a Full Stack Developer & AI Integrator specializing in scalable systems and interactive UI/UX design.",
    url: "https://your-domain.com",
    siteName: "Mohammed Abdullah Mahmood Portfolio",
    type: "website",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--color-canvas-dark)] text-foreground selection:bg-neon-cyan/30">
        <SmoothScroll>
          <HoverProvider>
            <ScrollProgress />
            <CustomCursor />
            {children}
          </HoverProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
