"use client";

import { motion } from "framer-motion";
import ZezehihiLogoAnimated from "./ZezehihiLogoAnimated";

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
        {/* 青い透過オーバーレイ（グラデーション） */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0000FF]/75 via-[#0000FF]/70 to-[#0000FF]/80" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* メインロゴ - GSAPアニメーション版 */}
        <motion.div
          className="relative mb-12 flex justify-center items-center"
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
          className="max-w-4xl mx-auto space-y-6 mt-16 sm:mt-20"
        >
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white font-light tracking-wider"
            style={{
              fontFamily: "'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', 'MS PMincho', serif",
              lineHeight: 1.6,
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
              letterSpacing: "0.05em",
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
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/95 font-light tracking-wider"
            style={{
              fontFamily: "'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', 'MS PMincho', serif",
              lineHeight: 1.6,
              textShadow: "0 2px 15px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.05em",
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
    </section>
  );
}
