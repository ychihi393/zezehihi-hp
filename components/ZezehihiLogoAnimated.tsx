"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const slashRef = useRef<SVGLineElement>(null);
  const zezehihiTextRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete?.();
        },
      });

      // GPU最適化設定
      gsap.config({ force3D: true });

      // 初期状態設定
      gsap.set([zeze1Ref.current, zeze2Ref.current], {
        scale: 0.8,
        opacity: 0,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(zezehihiTextRef.current, {
        y: 20,
        opacity: 0,
      });

      gsap.set([hihi1FullRef.current, hihi2FullRef.current], {
        opacity: 1,
      });

      gsap.set([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], {
        opacity: 0,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(slashRef.current, {
        opacity: 0,
      });

      // ゼゼの登場アニメーション
      tl.to([zeze1Ref.current, zeze2Ref.current], {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
      });

      // ZEZEHIHIテキストの登場
      tl.to(
        zezehihiTextRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // ヒヒの登場（少し遅れて）
      tl.to(
        [hihi1FullRef.current, hihi2FullRef.current],
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // 少し待つ
      tl.to({}, { duration: 0.5 });

      // ==========================================
      // 日本刀の斬撃アニメーション（左上から右下へ）
      // ==========================================

      // 斬撃ライン出現（極めて速い）
      tl.to(slashRef.current, {
        opacity: 1,
        duration: 0.15,
        ease: "power4.out",
      });

      // 斬撃ラインのフェードアウト
      tl.to(slashRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
      }, "+=0.15");

      // 完全版のヒヒを非表示にして、分割版を表示（斬撃直後）
      tl.to(
        [hihi1FullRef.current, hihi2FullRef.current],
        {
          opacity: 0,
          duration: 0.02,
        },
        "-=0.15"
      );

      tl.to(
        [hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current],
        {
          opacity: 1,
          duration: 0.02,
        },
        "-=0.02"
      );

      // ==========================================
      // 切断と落下（Split & Drop）
      // ==========================================

      // 上半分の落下（左に回転しながら落下）
      tl.to(
        [hihi1TopRef.current, hihi2TopRef.current],
        {
          y: 400,
          x: -80,
          rotation: -35,
          opacity: 0.3,
          duration: 1.2,
          ease: "power2.in",
        },
        "-=0.02"
      );

      // 下半分の落下（右に回転しながら落下）
      tl.to(
        [hihi1BottomRef.current, hihi2BottomRef.current],
        {
          y: 450,
          x: 60,
          rotation: 25,
          opacity: 0.2,
          duration: 1.3,
          ease: "power2.in",
        },
        "-=1.2"
      );

      // 待機時間
      tl.to({}, { duration: 0.5 });

      // ==========================================
      // 復元（Restore）- 磁石のように吸い寄せられる
      // ==========================================

      // 上半分の復元
      tl.to(
        [hihi1TopRef.current, hihi2TopRef.current],
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );

      // 下半分の復元
      tl.to(
        [hihi1BottomRef.current, hihi2BottomRef.current],
        {
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

      // 分割版を非表示にして、完全版を表示
      tl.to(
        [hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current],
        {
          opacity: 0,
          duration: 0.2,
        },
        "-=0.2"
      );

      tl.to(
        [hihi1FullRef.current, hihi2FullRef.current],
        {
          opacity: 1,
          duration: 0.2,
        },
        "-=0.2"
      );

      // 斬撃ラインを初期位置にリセット
      tl.set(slashRef.current, {
        opacity: 0,
      });
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
        {/* 発光フィルター */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 斜めの切断線用のクリップパス（左上から右下への斬撃） */}
        {/* ヒヒ1（左）上半分 - 斜めに切る */}
        <clipPath id="hihi1TopClip">
          <polygon points="400,130 600,130 600,200 400,150" />
        </clipPath>

        {/* ヒヒ1（左）下半分 - 斜めに切る */}
        <clipPath id="hihi1BottomClip">
          <polygon points="400,150 600,200 600,380 400,380" />
        </clipPath>

        {/* ヒヒ2（右）上半分 - 斜めに切る */}
        <clipPath id="hihi2TopClip">
          <polygon points="560,130 780,130 780,240 560,190" />
        </clipPath>

        {/* ヒヒ2（右）下半分 - 斜めに切る */}
        <clipPath id="hihi2BottomClip">
          <polygon points="560,190 780,240 780,380 560,380" />
        </clipPath>
      </defs>


      {/* ゼゼ - 1文字目 */}
      <text
        ref={zeze1Ref}
        x="50"
        y="300"
        fontSize="200"
        fontWeight="bold"
        fontStyle="italic"
        fill="white"
        fontFamily="sans-serif"
        className="tracking-tight"
      >
        ゼ
      </text>

      {/* ゼゼ - 2文字目 */}
      <text
        ref={zeze2Ref}
        x="230"
        y="300"
        fontSize="200"
        fontWeight="bold"
        fontStyle="italic"
        fill="white"
        fontFamily="sans-serif"
        className="tracking-tight"
      >
        ゼ
      </text>

      {/* ヒヒ1（左）- 完全表示用 */}
      <g ref={hihi1FullRef}>
        <text
          x="430"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
          className="tracking-tight"
        >
          ヒ
        </text>
      </g>

      {/* ヒヒ2（右）- 完全表示用 */}
      <g ref={hihi2FullRef}>
        <text
          x="590"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
          className="tracking-tight"
        >
          ヒ
        </text>
      </g>

      {/* ヒヒ1（左）- 上半分（横に切れた上部分） */}
      <g ref={hihi1TopRef} clipPath="url(#hihi1TopClip)" opacity="0">
        <text
          x="430"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
          className="tracking-tight"
        >
          ヒ
        </text>
      </g>

      {/* ヒヒ1（左）- 下半分（横に切れた下部分） */}
      <g ref={hihi1BottomRef} clipPath="url(#hihi1BottomClip)" opacity="0">
        <text
          x="430"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
          className="tracking-tight"
        >
          ヒ
        </text>
      </g>

      {/* ヒヒ2（右）- 上半分（横に切れた上部分） */}
      <g ref={hihi2TopRef} clipPath="url(#hihi2TopClip)" opacity="0">
        <text
          x="590"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
          className="tracking-tight"
        >
          ヒ
        </text>
      </g>

      {/* ヒヒ2（右）- 下半分（横に切れた下部分） */}
      <g ref={hihi2BottomRef} clipPath="url(#hihi2BottomClip)" opacity="0">
        <text
          x="590"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
          className="tracking-tight"
        >
          ヒ
        </text>
      </g>

      {/* 斬撃ライン（左上から右下への鋭い閃光） */}
      <line
        ref={slashRef}
        x1="350"
        y1="50"
        x2="750"
        y2="350"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0"
        filter="url(#glow)"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))",
        }}
      />

      {/* ZEZEHIHI */}
      <text
        ref={zezehihiTextRef}
        x="400"
        y="380"
        fontSize="36"
        fontWeight="600"
        fill="white"
        fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
        textAnchor="middle"
        className="tracking-[0.15em]"
        style={{
          letterSpacing: "0.15em",
        }}
      >
        ZEZEHIHI
      </text>
    </svg>
  );
}
