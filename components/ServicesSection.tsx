"use client";

import { motion } from "framer-motion";
import { Building2, Megaphone, Shield, MessageSquare } from "lucide-react";

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
    <section id="services" className="py-40 bg-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl"></div>
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
            事業内容
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            多様な事業領域で、お客様のビジネスをサポートしています
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative p-10 lg:p-12 rounded-2xl border-2 border-blue-100 bg-white transition-all duration-500 hover:border-blue-300 hover:bg-blue-50/30 shadow-md hover:shadow-2xl"
              >
                {/* 光沢効果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative inline-flex p-5 rounded-xl mb-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                  <Icon className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="relative text-xl sm:text-2xl font-bold mb-4 tracking-tight text-gray-900">
                  {service.title}
                </h3>
                <p className="relative text-gray-700 leading-relaxed text-sm sm:text-base font-light">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
