# Cloudflare Pages デプロイ手順

## 1. GitHubリポジトリの作成とプッシュ

### GitHubでリポジトリを作成
1. https://github.com にアクセス
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `zezehihi-hp`）
4. 「Create repository」をクリック
5. 表示されるURLをコピー（例: `https://github.com/yourusername/zezehihi-hp.git`）

### ローカルからプッシュ
```bash
# リモートリポジトリを追加
git remote add origin https://github.com/yourusername/zezehihi-hp.git

# ブランチ名をmainに変更
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

## 2. Cloudflare Pagesでの設定

### プロジェクト作成
1. Cloudflareダッシュボードにログイン: https://dash.cloudflare.com
2. 左メニューから「Workers & Pages」を選択
3. 「Create application」→「Pages」→「Connect to Git」をクリック
4. GitHubを選択して認証（初回のみ）
5. 作成したリポジトリを選択

### ビルド設定
- **Framework preset**: `Next.js (Static HTML Export)`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/` (空白のまま)
- **Node.js version**: `18` または `20`

### 環境変数（必要に応じて）
- 環境変数は通常不要ですが、必要に応じて設定できます

## 3. デプロイ

設定を保存すると、自動的にビルドとデプロイが開始されます。
完了後、Cloudflare PagesのURLが表示されます。

## 4. カスタムドメイン設定（オプション）

1. Cloudflare Pagesのプロジェクトページで「Custom domains」をクリック
2. ドメインを入力して設定

## 注意事項

- Next.jsの静的エクスポートを使用しているため、サーバーサイド機能は使用できません
- 画像は`unoptimized: true`に設定されているため、最適化されません
- 問い合わせフォームは`mailto:`リンクを使用しています
