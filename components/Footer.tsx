export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-6 tracking-tight">
              株式会社ゼゼヒヒ
            </h3>
            <p className="text-base text-gray-400 font-light leading-relaxed">
              東京都新宿区西新宿３丁目３番１３号<br />
              西新宿水間ビル６階
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-6 tracking-widest uppercase">
              ナビゲーション
            </h4>
            <ul className="space-y-3 text-base text-gray-400 font-light">
              <li>
                <a href="#top" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  トップ
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  事業内容
                </a>
              </li>
              <li>
                <a href="#company" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  お知らせ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-6 tracking-widest uppercase">
              事業内容
            </h4>
            <ul className="space-y-3 text-base text-gray-400 font-light">
              <li>不動産集客支援業</li>
              <li>広告業</li>
              <li>少額短期保険代理店</li>
              <li>SNSアカウント運用代理店</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800/50 text-center">
          <p className="text-sm text-gray-500 font-light tracking-wide">
            &copy; {new Date().getFullYear()} 株式会社ゼゼヒヒ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
