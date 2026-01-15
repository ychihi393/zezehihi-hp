export default function Footer() {
  return (
    <footer className="relative bg-[#1a1f3a] border-t border-[#2a2f4a] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 
              className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              株式会社ゼゼヒヒ
            </h3>
            <p 
              className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed"
              style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
            >
              東京都新宿区西新宿３丁目３番１３号<br />
              西新宿水間ビル６階
            </p>
          </div>
          <div>
            <h4 
              className="text-sm font-semibold text-white mb-6 tracking-wider uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ナビゲーション
            </h4>
            <ul className="space-y-3">
              {[
                { name: "トップ", href: "#top" },
                { name: "事業内容", href: "#services" },
                { name: "会社概要", href: "#company" },
                { name: "お知らせ", href: "#news" },
                { name: "お問い合わせ", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 inline-block"
                    style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 
              className="text-sm font-semibold text-white mb-6 tracking-wider uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              事業内容
            </h4>
            <ul className="space-y-3">
              {[
                "不動産集客支援業",
                "広告業",
                "各種代理店",
                "SNSアカウント運用代理店",
              ].map((item) => (
                <li 
                  key={item}
                  className="text-sm sm:text-base text-gray-300"
                  style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2a2f4a] text-center">
          <p 
            className="text-xs sm:text-sm text-gray-400 font-normal tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            &copy; {new Date().getFullYear()} 株式会社ゼゼヒヒ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
