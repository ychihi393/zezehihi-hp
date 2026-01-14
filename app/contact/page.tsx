"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("すべての項目を入力してください。");
      return;
    }
    
    // メール本文を作成
    const emailBody = `お名前: ${formData.name}\nメールアドレス: ${formData.email}\n\n${formData.message}`;
    
    // メールクライアントを開く（入力内容を自動入力）
    const mailtoLink = `mailto:zezehihi.line@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // メールクライアントを開く
    window.location.href = mailtoLink;
    
    // フォームをリセット（少し遅延させてメールクライアントが開くのを待つ）
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>戻る</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              お問い合わせ
            </h1>
            <p className="text-lg text-gray-600 font-light">
              ご質問やお問い合わせがございましたら、お気軽にご連絡ください
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass shadow-luxury-lg rounded-2xl p-8 lg:p-12 border border-gray-200/50"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-gray-900 mb-3 tracking-tight">
                  お名前 <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 font-light bg-white/50 backdrop-blur-sm hover:border-gray-300"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-900 mb-3 tracking-tight">
                  メールアドレス <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 font-light bg-white/50 backdrop-blur-sm hover:border-gray-300"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-base font-semibold text-gray-900 mb-3 tracking-tight">
                  件名 <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 font-light bg-white/50 backdrop-blur-sm hover:border-gray-300"
                  placeholder="お問い合わせ件名"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-semibold text-gray-900 mb-3 tracking-tight">
                  お問い合わせ内容 <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={8}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 resize-none font-light bg-white/50 backdrop-blur-sm hover:border-gray-300"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 tracking-tight shadow-lg hover:shadow-xl"
              >
                <Send className="w-6 h-6" />
                送信する
              </button>
            </div>
          </motion.form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
