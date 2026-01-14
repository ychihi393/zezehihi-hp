import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "株式会社ゼゼヒヒ | 不動産集客支援・広告業・各種代理店",
    template: "%s | 株式会社ゼゼヒヒ",
  },
  description:
    "株式会社ゼゼヒヒは「是々非々」の精神を持ち、既存の枠組みにとらわれず顧客メリットを最大化する会社です。不動産集客支援業、広告業、各種代理店、SNSアカウント運用代理店を展開しています。",
  keywords: [
    "株式会社ゼゼヒヒ",
    "不動産集客支援",
    "広告業",
    "代理店",
    "SNS運用",
    "マーケティング",
    "新宿区",
    "東京都",
  ],
  authors: [{ name: "株式会社ゼゼヒヒ" }],
  creator: "株式会社ゼゼヒヒ",
  publisher: "株式会社ゼゼヒヒ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zezehihi-hp.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://zezehihi-hp.pages.dev",
    siteName: "株式会社ゼゼヒヒ",
    title: "株式会社ゼゼヒヒ | 不動産集客支援・広告業・各種代理店",
    description:
      "株式会社ゼゼヒヒは「是々非々」の精神を持ち、既存の枠組みにとらわれず顧客メリットを最大化する会社です。",
    images: [
      {
        url: "/logo.png", // OGP画像のパス（必要に応じて変更）
        width: 1200,
        height: 630,
        alt: "株式会社ゼゼヒヒ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社ゼゼヒヒ | 不動産集客支援・広告業・各種代理店",
    description:
      "株式会社ゼゼヒヒは「是々非々」の精神を持ち、既存の枠組みにとらわれず顧客メリットを最大化する会社です。",
    images: ["/logo.png"], // Twitterカード画像のパス（必要に応じて変更）
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Consoleの認証コード（取得後に追加）
    // google: "your-google-verification-code",
  },
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
