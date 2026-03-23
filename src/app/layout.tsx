import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Devs - Structured Execution System for Future Developers",
  description: "AI-powered learning platform for engineering students. Build skills, track progress, and launch your career with personalized roadmaps.",
  keywords: ["learning", "engineering", "programming", "AI", "roadmap", "career"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-50 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
