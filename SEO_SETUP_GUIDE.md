# SEO設定ガイド - ユーザー作業手順

## ✅ 自動で実装済みの項目

以下の項目は既に実装済みです：
- ✅ メタデータの強化（OGP、Twitterカード、keywords）
- ✅ 構造化データ（JSON-LD）
- ✅ sitemap.xml（自動生成）
- ✅ robots.txt（自動生成）
- ✅ h1タグの追加（SEO用）
- ✅ 見出しタグの適切な使用（h2, h3）
- ✅ 画像のalt属性

## 📋 あなたがやる必要がある作業

### 1. Cloudflare PagesのURLを確認する

#### 手順：
1. Cloudflareダッシュボードにログイン: https://dash.cloudflare.com
2. 左メニューから「Workers & Pages」をクリック
3. 「Pages」タブを選択
4. プロジェクト「zezehihi-hp」をクリック
5. 「Deployments」タブを開く
6. 最新のデプロイメントの右側に表示されているURLを確認
   - 例: `https://zezehihi-hp.pages.dev` または `https://zezehihi-hp-xxxxx.pages.dev`
   - または、カスタムドメインを設定している場合はそのURL

#### URLを確認したら：
**このURLを教えてください。** 教えていただければ、すべてのファイルを自動で更新します。

---

### 2. Google Search Consoleの登録（重要）

Google Search Consoleに登録することで、Google検索でのサイトの表示状況を確認できます。

#### 手順：

##### Step 1: Google Search Consoleにアクセス
1. ブラウザで https://search.google.com/search-console を開く
2. Googleアカウントでログイン（会社のGoogleアカウントを使用することを推奨）

##### Step 2: プロパティを追加
1. 左上の「プロパティを追加」をクリック
2. 「URLプレフィックス」を選択（推奨）
3. Cloudflare PagesのURLを入力（例: `https://zezehihi-hp.pages.dev`）
4. 「続行」をクリック

##### Step 3: 所有権の確認
1. 「HTMLタグ」の方法を選択
2. 表示されるメタタグの内容をコピー
   - 例: `<meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxx" />`
   - この `content="..."` の中の文字列（`xxxxxxxxxxxxxxxxxxxxx`の部分）をコピー

##### Step 4: 確認コードをファイルに追加
**確認コードを教えてください。** 教えていただければ、自動でファイルに追加します。

または、自分で追加する場合：
- `app/layout.tsx` の `verification.google` の部分を以下のように変更：
  ```typescript
  verification: {
    google: "ここに確認コードを貼り付け",
  },
  ```

##### Step 5: 確認を完了
1. ファイルを保存して、GitHubにプッシュ
2. Cloudflare Pagesで自動デプロイが完了するのを待つ（数分）
3. Google Search Consoleに戻り、「確認」をクリック
4. 確認が成功したら、「URL検査」でサイトを登録

---

### 3. OGP画像の作成（オプション、推奨）

SNSでシェアされたときに表示される画像を作成します。

#### 手順：
1. **画像サイズ**: 1200px × 630px で作成
2. **内容**: 会社ロゴと会社名を含める
3. **ファイル名**: `og-image.png` として保存
4. **保存場所**: `/public/og-image.png` に配置

#### 画像を作成したら：
ファイルを `/public/og-image.png` に配置してください。コードは既に設定済みです。

---

### 4. サイトマップの送信（Google Search Console）

#### 手順：
1. Google Search Consoleにログイン
2. 左メニューから「サイトマップ」をクリック
3. 「新しいサイトマップの追加」に以下を入力：
   ```
   https://あなたのURL/sitemap.xml
   ```
   - 例: `https://zezehihi-hp.pages.dev/sitemap.xml`
4. 「送信」をクリック

---

### 5. パフォーマンスの確認

#### PageSpeed Insightsで確認：
1. https://pagespeed.web.dev/ にアクセス
2. Cloudflare PagesのURLを入力
3. 「分析」をクリック
4. スコアが90以上になることを目指す（既に最適化済みのはずです）

#### モバイルフレンドリーテスト：
1. https://search.google.com/test/mobile-friendly にアクセス
2. Cloudflare PagesのURLを入力
3. 「テストURL」をクリック
4. 「モバイルフレンドリー」と表示されればOK

---

## 📝 チェックリスト

- [ ] Cloudflare PagesのURLを確認
- [ ] URLを教えて、ファイルを更新してもらう
- [ ] Google Search Consoleに登録
- [ ] 確認コードを教えて、ファイルに追加してもらう
- [ ] Google Search Consoleで確認完了
- [ ] サイトマップを送信
- [ ] OGP画像を作成（オプション）
- [ ] PageSpeed Insightsで確認
- [ ] モバイルフレンドリーテストで確認

---

## 🚀 次のステップ（SEO改善）

### 短期（1-2週間）
1. Google Search Consoleでインデックス状況を確認
2. 検索クエリの確認（どのキーワードで検索されているか）
3. クリック率の改善（タイトルや説明文の調整）

### 中期（1-3ヶ月）
1. ブログやお知らせの定期的な更新
2. 関連キーワードでの記事作成
3. ソーシャルメディアでのシェア促進

### 長期（3ヶ月以上）
1. 被リンクの獲得（信頼できるサイトからのリンク）
2. ローカルSEO（Googleビジネスプロフィールへの登録）
3. コンテンツマーケティングの強化

---

## ❓ よくある質問

### Q: URLが分からない場合は？
A: Cloudflare Pagesのダッシュボードで確認できます。上記の手順1を参照してください。

### Q: Google Search Consoleは必須ですか？
A: 必須ではありませんが、SEO対策には非常に有効です。無料で利用できるので、登録することを強く推奨します。

### Q: OGP画像は必須ですか？
A: 必須ではありませんが、SNSでシェアされたときに見栄えが良くなります。後から追加しても問題ありません。

### Q: サイトマップは自動で送信されますか？
A: いいえ、手動で送信する必要があります。手順4を参照してください。

---

## 📞 サポート

質問や問題があれば、お気軽にお聞きください！
