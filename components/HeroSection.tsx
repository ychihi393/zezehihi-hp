"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ZezehihiLogoAnimated from "./ZezehihiLogoAnimated";

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
      {/* 背景画像 */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
          }}
        />
        {/* 濃い青から透明へのグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0044CC]/90 via-[#0044CC]/70 to-[#0044CC]/50" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center py-12 sm:py-16 md:py-20">
        {/* SEO用のh1タグ（視覚的には非表示） */}
        <h1 className="sr-only">株式会社ゼゼヒヒ | 不動産集客支援・広告業・各種代理店</h1>
        
        {/* メインロゴ - GSAPアニメーション版 */}
        <motion.div
          className="relative mb-20 sm:mb-24 md:mb-28 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.5, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <div className="w-full max-w-4xl">
            <ZezehihiLogoAnimated className="w-full h-auto" />
          </div>
        </motion.div>

        {/* 理念テキスト */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 mt-20 sm:mt-24 md:mt-28"
        >
          {/* メインコピー（是々非々） */}
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold"
            style={{
              fontFamily: "'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', 'MS PMincho', serif",
              fontWeight: 700,
              lineHeight: 1.8,
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.4)",
              letterSpacing: "0.05em",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.8, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              「良いものは良い、悪いものは悪い」
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              というシンプルな考え方である
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              「是々非々」という言葉。
            </motion.span>
          </motion.p>
          {/* 本文 */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 font-normal"
            style={{
              fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
              fontWeight: 400,
              lineHeight: 2.1,
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.5), 0 1px 5px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.05em",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 2.8, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 3.0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              当社はこの「ゼゼヒヒ」の精神を持ち、
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              既存の枠組み、風習にとらわれず
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 3.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              顧客メリットを最大化をする会社です。
            </motion.span>
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Downアニメーション */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <motion.a
          href="#services"
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("services");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-sm font-medium tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Scroll Down
          </span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </section>
  );
}
