import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "No-Code Builder - Build Websites Visually",
  description: "Create stunning websites without code using our drag-and-drop visual editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className="antialiased bg-neutral-50">
        {children}
      </body>
    </html>
  );
}
