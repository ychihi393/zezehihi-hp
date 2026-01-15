"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    date: "2025.10.29",
    title: "会社設立いたしました",
    category: "お知らせ",
  },
  {
    date: "2026.01.01",
    title: "ホームページをリニューアルいたしました",
    category: "お知らせ",
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-[#f5f7fa] overflow-hidden">
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
            お知らせ
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto font-normal tracking-wide"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            最新の情報をお届けします
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden">
            {newsItems.map((news, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="group block px-6 sm:px-8 py-6 sm:py-8 border-b border-[#e5e7eb] last:border-b-0 hover:bg-[#0044CC]/5 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span 
                    className="text-sm sm:text-base text-[#6b7280] font-normal min-w-[100px]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {news.date}
                  </span>
                  <h3 
                    className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1f2937] group-hover:text-[#0044CC] transition-colors duration-300 flex-1"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {news.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-[#0044CC] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
