"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ZezehihiLogoAnimatedProps {
  className?: string;
  onAnimationComplete?: () => void;
}

export default function ZezehihiLogoAnimated({
  className = "",
  onAnimationComplete,
}: ZezehihiLogoAnimatedProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const zeze1Ref = useRef<SVGTextElement>(null);
  const zeze2Ref = useRef<SVGTextElement>(null);
  const hihi1FullRef = useRef<SVGGElement>(null);
  const hihi2FullRef = useRef<SVGGElement>(null);
  const hihi1TopRef = useRef<SVGGElement>(null);
  const hihi1BottomRef = useRef<SVGGElement>(null);
  const hihi2TopRef = useRef<SVGGElement>(null);
  const hihi2BottomRef = useRef<SVGGElement>(null);
  const slashLineRef = useRef<SVGLineElement>(null);
  const slashGlowRef = useRef<SVGLineElement>(null);
  const flashRef = useRef<SVGRectElement>(null);
  const zezehihiTextRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 初期状態：完全な「ゼゼヒヒ」を表示、分割版は非表示
      gsap.set([hihi1FullRef.current, hihi2FullRef.current], { opacity: 1 });
      gsap.set([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], { opacity: 0 });
      gsap.set([slashLineRef.current, slashGlowRef.current], { opacity: 0 });
      gsap.set(flashRef.current, { opacity: 0 });

      // スクロールに応じて切られる演出
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
          onLeave: () => onAnimationComplete?.(),
        },
      });

      // 1. 斬撃ラインが左上から右下に走る
      tl.fromTo(
        [slashLineRef.current, slashGlowRef.current],
        { opacity: 0, attr: { x1: 350, y1: 80, x2: 350, y2: 80 } },
        { opacity: 1, attr: { x1: 350, y1: 80, x2: 800, y2: 340 }, duration: 0.4, ease: "power2.in" }
      )
      // 2. フラッシュ
      .to(flashRef.current, { opacity: 0.6, duration: 0.1 })
      .to(flashRef.current, { opacity: 0, duration: 0.2 })
      // 3. 完全版を非表示、分割版を表示
      .to([hihi1FullRef.current, hihi2FullRef.current], { opacity: 0, duration: 0.1 }, "-=0.3")
      .to([hihi1BottomRef.current, hihi2BottomRef.current], { opacity: 1, duration: 0.1 }, "-=0.3")
      .to([hihi1TopRef.current, hihi2TopRef.current], { opacity: 1, x: 10, y: -18, duration: 0.1 }, "-=0.3")
      // 4. 斬撃ラインをフェードアウト
      .to([slashLineRef.current, slashGlowRef.current], { opacity: 0, duration: 0.2 });
    },
    { scope: containerRef }
  );

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="slashGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* クリップパス: 対角線 (400,130)→(720,300) で分割 */}
        <clipPath id="hihi1TopClip">
          <polygon points="400,130 560,130 560,215" />
        </clipPath>
        <clipPath id="hihi1BottomClip">
          <polygon points="400,130 560,215 560,340 400,340" />
        </clipPath>
        <clipPath id="hihi2TopClip">
          <polygon points="560,130 720,130 720,300 560,215" />
        </clipPath>
        <clipPath id="hihi2BottomClip">
          <polygon points="560,215 720,300 720,340 560,340" />
        </clipPath>
      </defs>

      {/* ゼゼ */}
      <text ref={zeze1Ref} x="50" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
        fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ゼ</text>
      <text ref={zeze2Ref} x="220" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
        fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ゼ</text>

      {/* ヒヒ - 完全表示用 */}
      <g ref={hihi1FullRef}>
        <text x="400" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
          fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ヒ</text>
      </g>
      <g ref={hihi2FullRef}>
        <text x="560" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
          fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ヒ</text>
      </g>

      {/* ヒヒ - 分割版（切られた後用） */}
      <g ref={hihi1TopRef} clipPath="url(#hihi1TopClip)" opacity="0">
        <text x="400" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
          fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ヒ</text>
      </g>
      <g ref={hihi1BottomRef} clipPath="url(#hihi1BottomClip)" opacity="0">
        <text x="400" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
          fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ヒ</text>
      </g>
      <g ref={hihi2TopRef} clipPath="url(#hihi2TopClip)" opacity="0">
        <text x="560" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
          fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ヒ</text>
      </g>
      <g ref={hihi2BottomRef} clipPath="url(#hihi2BottomClip)" opacity="0">
        <text x="560" y="300" fontSize="200" fontWeight="900" fontStyle="italic" fill="white"
          fontFamily="'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif">ヒ</text>
      </g>

      {/* 斬撃エフェクト（左上から右下へ） */}
      <line ref={slashGlowRef} x1="350" y1="80" x2="350" y2="80" stroke="#87CEEB" strokeWidth="12"
        strokeLinecap="round" filter="url(#slashGlow)" opacity="0" />
      <line ref={slashLineRef} x1="350" y1="80" x2="350" y2="80" stroke="white" strokeWidth="4"
        strokeLinecap="round" filter="url(#glow)" opacity="0" />

      {/* フラッシュ */}
      <rect ref={flashRef} x="0" y="0" width="800" height="400" fill="white" opacity="0" />

      {/* ZEZEHIHI テキスト */}
      <text ref={zezehihiTextRef} x="400" y="380" fontSize="36" fontWeight="600" fill="white"
        fontFamily="'Playfair Display', serif" textAnchor="middle" style={{ letterSpacing: "0.15em" }}>
        ZEZEHIHI
      </text>
    </svg>
  );
}
