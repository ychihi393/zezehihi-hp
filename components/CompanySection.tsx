"use client";

import { motion } from "framer-motion";

export default function CompanySection() {
  const companyInfo = [
    { label: "会社名", value: "株式会社ゼゼヒヒ" },
    { label: "代表者名", value: "小林 俊介" },
    { label: "資本金", value: "100万円" },
    { label: "設立年月日", value: "2025年10月29日" },
    { label: "本社住所", value: "〒160-0023 東京都新宿区西新宿３丁目３番１３号 西新宿水間ビル６階" },
    { label: "営業時間", value: "10:00 - 21:00" },
  ];

  return (
    <section id="company" className="relative py-40 bg-gray-50 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/70 to-transparent rounded-full blur-3xl"></div>
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
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            会社概要
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            株式会社ゼゼヒヒの基本情報をご紹介します
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl overflow-hidden border-2 border-blue-200 shadow-xl">
            <table className="w-full">
              <tbody>
                {companyInfo.map((info, index) => (
                  <motion.tr
                    key={info.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 ${
                      index === companyInfo.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <th className="px-8 lg:px-12 py-6 text-left text-base font-bold text-gray-900 bg-gradient-to-r from-blue-50 to-blue-100/50 w-1/3 tracking-tight">
                      {info.label}
                    </th>
                    <td className="px-8 lg:px-12 py-6 text-base text-gray-800 font-light bg-white">
                      {info.value}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
