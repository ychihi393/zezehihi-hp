# メール自動送信について

## 現在の実装

現在、問い合わせフォームは`mailto:`リンクを使用してメールクライアントを開く方式になっています。これは、ユーザーのメールソフト（Outlook、Gmail、Apple Mailなど）を開いて、フォームの内容を自動で入力する方法です。

## メール自動送信を実装する場合

メールを自動で送信するには、以下のいずれかの方法が必要です：

### 1. バックエンドAPI + メール送信サービス

**必要なもの：**
- バックエンドサーバー（Node.js、Python、PHPなど）
- メール送信サービス（SendGrid、Mailgun、AWS SES、Gmail APIなど）

**実装例：**
```typescript
// API Route (app/api/contact/route.ts)
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: 'zezehihi.line@gmail.com',
    subject: subject,
    text: `お名前: ${name}\nメール: ${email}\n\n${message}`,
  });

  return NextResponse.json({ success: true });
}
```

### 2. サーバーレス関数（Vercel、Netlify Functions）

VercelやNetlifyなどのホスティングサービスを使用している場合、サーバーレス関数でメール送信を実装できます。

### 3. フォームサービス（Formspree、FormSubmit、Google Forms）

外部のフォームサービスを使用する方法：
- **Formspree**: 無料プランあり、簡単に実装可能
- **FormSubmit**: 無料、設定不要
- **Google Forms**: Googleスプレッドシートに自動保存

**Formspreeの例：**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- フォームフィールド -->
</form>
```

## 推奨事項

現在の`mailto:`方式は：
- ✅ 実装が簡単
- ✅ サーバー不要
- ✅ セキュリティリスクが低い
- ❌ ユーザーがメールソフトを設定している必要がある

自動送信を実装する場合：
- ✅ ユーザー体験が向上
- ✅ メールソフト不要
- ❌ バックエンドまたは外部サービスが必要
- ❌ コストがかかる場合がある

## 次のステップ

自動送信を実装する場合は、以下を検討してください：
1. ホスティング環境の確認（Vercel、Netlifyなど）
2. メール送信サービスの選択（SendGrid、Mailgunなど）
3. 環境変数の設定（APIキーなど）
4. スパム対策（reCAPTCHAなど）
