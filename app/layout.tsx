import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABZAN — Digital Analytics Portfolio",
  description: "A monochrome 3D portfolio exploring data, technology and digital experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}