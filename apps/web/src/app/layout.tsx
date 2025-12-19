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
      <body className="antialiased bg-neutral-50">
        {children}
      </body>
    </html>
  );
}
