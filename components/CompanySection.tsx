"use client";

import { motion } from "framer-motion";
import ScrollFadeIn from "./ScrollFadeIn";

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
    <section id="company" className="relative py-[60px] sm:py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
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
            会社概要
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto font-normal tracking-wide"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            株式会社ゼゼヒヒの基本情報をご紹介します
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto"
        >
          <dl className="bg-white/95 backdrop-blur-[12px] rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}>
            {companyInfo.map((info, index) => (
              <ScrollFadeIn key={info.label} delay={index * 100}>
                <div
                  className={`py-6 sm:py-8 border-b border-[#e5e7eb] last:border-b-0 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                  }`}
                >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 px-6 sm:px-8">
                  <dt 
                    className="text-base sm:text-lg font-bold text-[#1f2937] min-w-[140px] sm:min-w-[180px]"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {info.label}
                  </dt>
                  <dd 
                    className="text-base sm:text-lg text-[#6b7280] font-normal flex-1"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {info.value}
                  </dd>
                </div>
                </div>
              </ScrollFadeIn>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
