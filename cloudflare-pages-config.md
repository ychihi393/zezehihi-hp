# Cloudflare Pages デプロイ設定ガイド

## 1. GitHubリポジトリの作成

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `zezehihi-hp`）
4. 「Create repository」をクリック
5. 表示されるリポジトリURLをコピー（例: `https://github.com/yourusername/zezehihi-hp.git`）

## 2. ローカルリポジトリをGitHubにプッシュ

```bash
# リモートリポジトリを追加（上記のURLを使用）
git remote add origin https://github.com/yourusername/zezehihi-hp.git

# ブランチ名をmainに変更（GitHubのデフォルト）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

## 3. Cloudflare Pagesでの設定

1. Cloudflareダッシュボードにログイン
2. 「Workers & Pages」→「Create application」→「Pages」→「Connect to Git」
3. GitHubを選択して認証
4. リポジトリを選択
5. ビルド設定：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (プロジェクトルート)

## 4. Next.jsの設定（Static Export用）

`next.config.mjs`に以下を追加：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

## 5. 環境変数（必要に応じて）

Cloudflare Pagesのダッシュボードで環境変数を設定できます。

## 6. カスタムドメイン設定（オプション）

Cloudflare Pagesのダッシュボードでカスタムドメインを設定できます。
