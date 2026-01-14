import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社ゼゼヒヒ",
  description: "株式会社ゼゼヒヒのコーポレートサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
