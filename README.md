# 株式会社ゼゼヒヒ コーポレートサイト

株式会社ゼゼヒヒのコーポレートサイトです。

## 技術スタック

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## プロジェクト構成

```
.
├── app/
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # トップページ
├── components/
│   ├── Header.tsx       # ヘッダーコンポーネント
│   ├── Footer.tsx       # フッターコンポーネント
│   ├── HeroSection.tsx  # ヒーローセクション
│   ├── ServicesSection.tsx  # 事業内容セクション
│   ├── CompanySection.tsx  # 会社概要セクション
│   ├── NewsSection.tsx     # お知らせセクション
│   └── ContactSection.tsx  # お問い合わせセクション
└── package.json
```

## 機能

- ✅ レスポンシブデザイン対応
- ✅ スムーズなスクロールアニメーション
- ✅ モバイル対応ナビゲーション
- ✅ お問い合わせフォーム
- ✅ 事業内容の紹介
- ✅ 会社概要の表示
- ✅ お知らせセクション

## デザインコンセプト

サウナイキタイの世界観を参考にした、シンプルでポップ、少しレトロな雰囲気のデザインです。

- 余白を大きく取り、タイポグラフィを重視
- グリッドを感じさせる整然としたレイアウト
- 清潔感がありつつ印象に残る配色
- 遊び心がありつつも信頼感のあるデザイン
