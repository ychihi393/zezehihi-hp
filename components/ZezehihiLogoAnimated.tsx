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
  const slashRef = useRef<SVGGElement>(null);
  const flashRef = useRef<SVGRectElement>(null);
  const zezehihiTextRef = useRef<SVGTextElement>(null);
  const impactGroupRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete?.();
        },
      });

      // 初期状態設定
      gsap.set([zeze1Ref.current, zeze2Ref.current], {
        scale: 0.8,
        opacity: 0,
        transformOrigin: "center center",
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
      });

      gsap.set(slashRef.current, {
        x: -800,
        opacity: 0,
      });

      gsap.set(flashRef.current, {
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
      tl.to({}, { duration: 0.3 });

      // 閃光が左から飛んでくる
      tl.to(slashRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power1.out",
      })
      .to(slashRef.current, {
        x: 1200,
        duration: 0.5,
        ease: "power1.inOut",
      }, "-=0.05");

      // 完全版のヒヒを非表示にして、分割版を表示（閃光がヒヒに当たった瞬間）
      tl.to(
        [hihi1FullRef.current, hihi2FullRef.current],
        {
          opacity: 0,
          duration: 0.02,
        },
        "-=0.28"
      );

      tl.to(
        [hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current],
        {
          opacity: 1,
          duration: 0.02,
        },
        "-=0.02"
      );

      // ゼゼの反応アニメーション（閃光がヒヒを切る瞬間 - 同時）
      tl.to(
        [zeze1Ref.current, zeze2Ref.current],
        {
          rotation: -5,
          y: -8,
          scale: 1.05,
          duration: 0.15,
          ease: "power2.out",
        },
        "-=0.02"
      )
      .to(
        [zeze1Ref.current, zeze2Ref.current],
        {
          rotation: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // 切断の瞬間のエフェクト（衝撃波とパーティクル - 同時）
      if (impactGroupRef.current) {
        const circles = impactGroupRef.current.querySelectorAll("circle.shockwave");
        const particles = impactGroupRef.current.querySelectorAll("circle.particle");

        // 衝撃波アニメーション
        if (circles.length > 0) {
          tl.to(circles, {
            attr: { r: (i) => 40 + i * 30 },
            opacity: 0.8,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out",
          }, "-=0.47")
          .to(circles, {
            opacity: 0,
            duration: 0.25,
            stagger: 0.05,
            ease: "power1.out",
          }, "-=0.15");
        }

        // パーティクルが飛び散る
        if (particles.length > 0) {
          tl.to(particles, {
            x: (i) => {
              const angle = (i * 15) * (Math.PI / 180);
              return Math.cos(angle) * (60 + Math.random() * 40);
            },
            y: (i) => {
              const angle = (i * 15) * (Math.PI / 180);
              return Math.sin(angle) * (50 + Math.random() * 40);
            },
            opacity: 1,
            scale: 1.5,
            duration: 0.35,
            stagger: 0.015,
            ease: "power2.out",
          }, "-=0.67")
          .to(particles, {
            opacity: 0,
            scale: 0,
            duration: 0.25,
            stagger: 0.015,
            ease: "power2.in",
          }, "-=0.15");
        }
      }

      // ヒヒが横に切れて分離する（パカッと分かれる - 同時）
      // 上半分は上に移動
      tl.to(
        [hihi1TopRef.current, hihi2TopRef.current],
        {
          y: -40,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.87"
      );

      // 下半分は下に移動
      tl.to(
        [hihi1BottomRef.current, hihi2BottomRef.current],
        {
          y: 40,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 少し待つ
      tl.to({}, { duration: 0.8 });

      // ヒヒが元の位置に戻る（ふわっとスムーズに）
      tl.to(
        [hihi1TopRef.current, hihi2TopRef.current],
        {
          y: 0,
          duration: 0.8,
          ease: "power2.inOut",
        }
      );

      tl.to(
        [hihi1BottomRef.current, hihi2BottomRef.current],
        {
          y: 0,
          duration: 0.8,
          ease: "power2.inOut",
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

      // 閃光を消す（ゆっくりフェードアウト）
      tl.to(
        slashRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
        },
        "-=1.0"
      );
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

        {/* 横の切断線用のクリップパス */}
        {/* ヒヒ1（左）上半分 - 横に切る */}
        <clipPath id="hihi1TopClip">
          <rect x="400" y="130" width="200" height="105" />
        </clipPath>

        {/* ヒヒ1（左）下半分 - 横に切る */}
        <clipPath id="hihi1BottomClip">
          <rect x="400" y="235" width="200" height="145" />
        </clipPath>

        {/* ヒヒ2（右）上半分 - 横に切る */}
        <clipPath id="hihi2TopClip">
          <rect x="560" y="130" width="220" height="105" />
        </clipPath>

        {/* ヒヒ2（右）下半分 - 横に切る */}
        <clipPath id="hihi2BottomClip">
          <rect x="560" y="235" width="220" height="145" />
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

      {/* 閃光（横から飛んでくる） */}
      <g ref={slashRef} opacity="0">
        {/* 外側の大きな青い光 */}
        <rect
          x="-50"
          y="210"
          width="100"
          height="50"
          fill="#00BFFF"
          filter="url(#glow)"
          opacity="0.3"
        />
        {/* 中間の明るい青 */}
        <rect
          x="-30"
          y="220"
          width="60"
          height="30"
          fill="#87CEEB"
          filter="url(#glow)"
          opacity="0.6"
        />
        {/* 中心の白い光（細長い閃光） */}
        <rect
          x="-20"
          y="230"
          width="40"
          height="10"
          fill="#FFFFFF"
          filter="url(#glow)"
        />
      </g>

      {/* フラッシュエフェクト */}
      <rect
        ref={flashRef}
        x="0"
        y="0"
        width="800"
        height="400"
        fill="white"
        opacity="0"
      />

      {/* 切断の瞬間の演出エフェクト */}
      <g ref={impactGroupRef} opacity="1">
        {/* 衝撃波（複数の同心円） */}
        {[...Array(4)].map((_, i) => (
          <circle
            key={`shockwave-${i}`}
            className="shockwave"
            cx="500"
            cy="235"
            r="0"
            fill="none"
            stroke="#87CEEB"
            strokeWidth="3"
            opacity="0"
            filter="url(#glow)"
          />
        ))}
        {/* パーティクル（切れた瞬間の破片） */}
        {[...Array(24)].map((_, i) => (
          <circle
            key={`particle-${i}`}
            className="particle"
            cx="500"
            cy="235"
            r={2 + Math.random() * 3}
            fill="#FFFFFF"
            opacity="0"
            filter="url(#glow)"
          />
        ))}
      </g>

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
