"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1f2937] mb-6 tracking-tight"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            お問い合わせ
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto font-normal tracking-wide"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            ご質問やお問い合わせがございましたら、お気軽にご連絡ください
          </motion.p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-3 bg-[#0044CC] hover:bg-[#003399] text-white font-bold text-lg sm:text-xl py-5 sm:py-6 px-12 sm:px-16 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>お問い合わせフォームへ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
