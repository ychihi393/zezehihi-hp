# SEO対策ガイド

## 実装済みのSEO対策

### 1. メタデータの強化 ✅
- **タイトル**: デフォルトタイトルとテンプレートを設定
- **説明文**: 詳細な説明文を追加
- **キーワード**: 関連キーワードを設定
- **OGP（Open Graph Protocol）**: SNSでのシェア時に適切な情報を表示
- **Twitterカード**: Twitterでのシェア時に最適化

### 2. 構造化データ（JSON-LD）✅
- **Organizationスキーマ**: 会社情報を構造化データとして追加
- Google検索結果にリッチスニペットが表示される可能性があります

### 3. sitemap.xml ✅
- サイトマップを自動生成
- 検索エンジンがサイト構造を理解しやすくなります

### 4. robots.txt ✅
- 検索エンジンのクロールを制御
- サイトマップの場所を指定

## 追加で必要な設定

### 1. Cloudflare PagesのURLを更新
以下のファイルで、実際のCloudflare PagesのURLに変更してください：

- `app/layout.tsx`: `metadataBase` と `openGraph.url`、`twitter.images`
- `app/page.tsx`: `organizationSchema` の `url` と `logo`
- `app/sitemap.ts`: `baseUrl`
- `app/robots.ts`: `baseUrl`

現在の設定: `https://zezehihi-hp.pages.dev`
実際のURLに変更してください。

### 2. Google Search Consoleの登録
1. https://search.google.com/search-console にアクセス
2. プロパティを追加（URLプレフィックスで追加）
3. 所有権の確認方法を選択（HTMLタグ推奨）
4. `app/layout.tsx` の `verification.google` に確認コードを追加

### 3. OGP画像の作成
- 推奨サイズ: 1200x630px
- `/public/og-image.png` として保存
- `app/layout.tsx` の `openGraph.images` と `twitter.images` を更新

### 4. パフォーマンス最適化
- 画像の最適化（既に `unoptimized: true` ですが、必要に応じて変更）
- フォントの最適化（Google Fontsを使用中）
- コード分割（Next.jsが自動で対応）

### 5. コンテンツの最適化
- **見出しタグ（H1-H6）の適切な使用**: 各セクションに適切な見出しを追加
- **内部リンク**: 関連ページ間のリンクを追加
- **外部リンク**: 信頼できるサイトへのリンクを追加
- **画像のalt属性**: すべての画像に適切なalt属性を追加

### 6. モバイル対応
- レスポンシブデザインは既に実装済み ✅
- Googleのモバイルフレンドリーテストで確認: https://search.google.com/test/mobile-friendly

### 7. ページ速度の最適化
- Cloudflare Pagesは自動でCDN配信されるため高速 ✅
- 画像の遅延読み込み（必要に応じて実装）

### 8. ローカルビジネスの最適化（オプション）
Googleビジネスプロフィールに登録すると、地図検索での表示が改善されます。

## SEOチェックリスト

- [x] メタデータの設定
- [x] 構造化データの追加
- [x] sitemap.xmlの作成
- [x] robots.txtの作成
- [ ] Cloudflare PagesのURLを実際のURLに更新
- [ ] Google Search Consoleの登録
- [ ] OGP画像の作成
- [ ] 見出しタグの確認
- [ ] 画像のalt属性の確認
- [ ] モバイルフレンドリーテストの実行
- [ ] ページ速度の確認（PageSpeed Insights）

## 参考リンク

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [構造化データテストツール](https://search.google.com/test/rich-results)
- [モバイルフレンドリーテスト](https://search.google.com/test/mobile-friendly)

## 今後の改善ポイント

1. **ブログやお知らせの追加**: 定期的なコンテンツ更新はSEOに有効
2. **被リンクの獲得**: 信頼できるサイトからのリンク
3. **ソーシャルメディアの活用**: SNSでのシェア促進
4. **ローカルSEO**: Googleビジネスプロフィールへの登録
5. **コンテンツマーケティング**: 関連キーワードでの記事作成
