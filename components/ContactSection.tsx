"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactSection() {

  return (
    <section id="contact" className="relative py-40 bg-gray-50 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-orange-100/70 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-100/70 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            お問い合わせ
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            ご質問やお問い合わせがございましたら、お気軽にご連絡ください
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-2xl p-12 lg:p-16 border-2 border-gray-200 text-center shadow-xl"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xl py-6 px-16 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <Send className="w-7 h-7" />
              お問い合わせフォームへ
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
