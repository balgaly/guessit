import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GuessIt",
  description: "Social prediction platform for competing with friends on sports events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
