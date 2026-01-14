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
    <section id="news" className="relative py-40 bg-white overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-gradient-to-r from-purple-100/70 to-transparent rounded-full blur-3xl"></div>
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
            お知らせ
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            最新の情報をお届けします
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {newsItems.map((news, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, x: -50, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ x: 8, scale: 1.02 }}
              className="group block bg-white rounded-2xl p-8 lg:p-10 hover:shadow-xl transition-all duration-500 border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50/20 shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-light">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 border border-blue-200 transition-colors duration-300">
                      <Calendar className="w-5 h-5 text-blue-700 group-hover:text-blue-800 transition-colors duration-300" />
                    </div>
                    <span className="tracking-wide">{news.date}</span>
                  </div>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs font-semibold rounded-full shadow-sm border border-blue-300">
                    {news.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-between">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 tracking-tight">
                    {news.title}
                  </h3>
                  <ArrowRight className="w-6 h-6 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
