株式会社ゼゼヒヒ | SEO強化対策まとめ

## ✅ 実施済みの対策

### 1. メタデータの強化（app/layout.tsx）
- `title.absolute`: サイト名を明示的に指定
- `applicationName`: アプリケーション名として「株式会社ゼゼヒヒ」を指定
- `appleWebApp.title`: Apple端末でのタイトル指定
- `manifest`: manifest.jsonファイルへのリンク追加
- `openGraph.siteName`: OGPでのサイト名を「株式会社ゼゼヒヒ」に明示
- `creator`, `publisher`: 作成者・発行者として会社名を指定

### 2. 構造化データ（JSON-LD）の強化（app/page.tsx）
- **Organization型スキーマ**:
  - `name`: "株式会社ゼゼヒヒ"
  - `alternateName`: "ゼゼヒヒ"
  - `brand`: ブランド名として会社名を指定
  - 住所、連絡先、創業日、創業者などの詳細情報

- **WebSite型スキーマ**:
  - `name`: "株式会社ゼゼヒヒ"
  - `alternateName`: "ゼゼヒヒ"
  - `publisher`: 発行者情報（Organization型）
  - `potentialAction`: 検索機能の構造化データ

### 3. Web App Manifest（public/manifest.json）
- `name`: "株式会社ゼゼヒヒ"
- `short_name`: "ゼゼヒヒ"
- PWAとしてのアプリ名を明示

---

## 🚀 次に実施すべきこと（重要）

### 【必須】Google Search Consoleで再クロールをリクエスト

変更をデプロイした後、すぐに以下を実行してください：

#### 手順：
1. https://search.google.com/search-console にアクセス
2. 左メニューから「URL検査」を選択
3. `https://zezehihi-hp.pages.dev` を入力
4. 「インデックス登録をリクエスト」をクリック
5. 数分待つ（Googleがクロールするまで）

**これを実行しないと、Googleは古い情報を数週間保持します。**

---

## 📊 確認方法

### 1. 構造化データのテスト
以下のURLで確認：
https://search.google.com/test/rich-results

- サイトURL: `https://zezehihi-hp.pages.dev`
- Organization型とWebSite型のスキーマが正しく認識されているか確認

### 2. Open Graphのテスト
以下のURLで確認：
https://www.opengraph.xyz/

- サイトURL: `https://zezehihi-hp.pages.dev`
- サイト名が「株式会社ゼゼヒヒ」と表示されているか確認

### 3. Google検索結果の確認
以下のクエリで検索：
- `site:zezehihi-hp.pages.dev`
- `株式会社ゼゼヒヒ`

数日後にサイト名が変更されているか確認。

---

## ⏰ タイムライン

- **即時（デプロイ後すぐ）**: Google Search Consoleで再クロールをリクエスト
- **1-3日後**: Googleがサイトを再クロール
- **3-7日後**: 検索結果に変更が反映され始める
- **1-2週間後**: 完全に反映される

---

## ❓ それでも変わらない場合

以下を追加で実施：

### 1. カスタムドメインの設定（推奨）
`.pages.dev` ドメインは Cloudflare のサブドメインのため、Googleが「Cloudflare」として認識する可能性があります。

**推奨**: 独自ドメイン（例: `zezehihi.com` or `zezehihi.co.jp`）を取得し、Cloudflare Pagesに設定する。

#### 手順：
1. ドメインを取得（お名前.com、ムームードメインなど）
2. Cloudflare Pagesダッシュボードで「Custom domains」を開く
3. 取得したドメインを追加
4. DNSレコードを設定
5. すべてのメタデータとURLを新しいドメインに更新

### 2. Google My Businessへの登録
会社の正式な情報をGoogleに登録：
https://www.google.com/business/

### 3. より強力なバックリンク
- 信頼できるサイトからのリンクを獲得
- SNSでの定期的な投稿とリンク共有

---

## 📝 現在の設定値まとめ

| 項目 | 値 |
|------|-----|
| サイト名 | 株式会社ゼゼヒヒ |
| 短縮名 | ゼゼヒヒ |
| URL | https://zezehihi-hp.pages.dev |
| タイトル | 株式会社ゼゼヒヒ \| 不動産集客支援・広告業・各種代理店 |
| 説明文 | 株式会社ゼゼヒヒは「是々非々」の精神を持ち、既存の枠組みにとらわれず顧客メリットを最大化する会社です。不動産集客支援業、広告業、各種代理店、SNSアカウント運用代理店を展開しています。 |
| Google Search Console 確認済み | ✅ (verification code: MHiBu8oAjPQtX1-2EecE6Z79fZYAWqlFteLyIa97GWI) |

---

## 🎯 最重要アクション

**1. このコードをコミット・プッシュしてデプロイ**
**2. Google Search Consoleで即座に再クロールをリクエスト**
**3. 数日待つ**
**4. 変わらない場合はカスタムドメインの導入を検討**

このファイルは進捗管理用です。チェックリストとして活用してください。
