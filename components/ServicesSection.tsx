"use client";

import { motion } from "framer-motion";
import { Building2, Megaphone, Shield, MessageSquare } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const services = [
  {
    title: "不動産集客支援業",
    description: "不動産物件の集客をトータルサポート。効果的なマーケティング戦略で、お客様の物件を多くの方に届けます。",
    icon: Building2,
  },
  {
    title: "広告業",
    description: "デジタルマーケティングから伝統的な広告まで、幅広い広告サービスを提供しています。",
    icon: Megaphone,
  },
  {
    title: "各種代理店",
    description: "少額短期保険やその他営業代理店等、お客様に最適な商品をご提案し、安心と安全をサポートします。",
    icon: Shield,
  },
  {
    title: "SNSアカウント運用代理店",
    description: "SNSを活用したブランディングと集客を支援。効果的な運用で、お客様のビジネスを成長させます。",
    icon: MessageSquare,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-[60px] sm:py-24 md:py-32 lg:py-40 bg-[#f5f7fa] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
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
            事業内容
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#6b7280] max-w-3xl mx-auto font-normal tracking-wide"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            多様な事業領域で、お客様のビジネスをサポートしています
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollFadeIn key={service.title} delay={index * 100}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-white/95 backdrop-blur-[12px] rounded-xl p-8 lg:p-10 shadow-md hover:shadow-xl transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                <div className="relative inline-flex p-4 rounded-lg mb-6 bg-[#0044CC]/10 group-hover:bg-[#0044CC]/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#0044CC]" />
                </div>
                <h3 
                  className="relative text-xl sm:text-2xl font-bold mb-4 tracking-tight text-[#1f2937]"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {service.title}
                </h3>
                <p 
                  className="relative text-[#6b7280] leading-relaxed text-sm sm:text-base font-normal"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {service.description}
                </p>
                </motion.div>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
