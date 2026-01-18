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
  // ===========================================
  // Refs for all animated elements
  // ===========================================
  const containerRef = useRef<SVGSVGElement>(null);
  const zeze1Ref = useRef<SVGTextElement>(null);
  const zeze2Ref = useRef<SVGTextElement>(null);

  // ヒヒ - 完全版
  const hihi1FullRef = useRef<SVGGElement>(null);
  const hihi2FullRef = useRef<SVGGElement>(null);

  // ヒヒ - 分割版
  const hihi1TopRef = useRef<SVGGElement>(null);
  const hihi1BottomRef = useRef<SVGGElement>(null);
  const hihi2TopRef = useRef<SVGGElement>(null);
  const hihi2BottomRef = useRef<SVGGElement>(null);

  // VFX要素
  const slashBladeRef = useRef<SVGGElement>(null);
  const slashTrailRef = useRef<SVGGElement>(null);
  const impactWavesRef = useRef<SVGGElement>(null);
  const flashEffectRef = useRef<SVGRectElement>(null);
  const zezehihiTextRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onAnimationComplete?.();
        },
      });

      // ===========================================
      // GPU最適化設定
      // ===========================================
      gsap.config({ force3D: true });

      // ===========================================
      // 初期状態設定
      // ===========================================
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

      gsap.set([slashBladeRef.current, slashTrailRef.current], {
        opacity: 0,
      });

      gsap.set(flashEffectRef.current, {
        opacity: 0,
      });

      // 衝撃波の初期化
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll('.shockwave');
        gsap.set(shockwaves, {
          attr: { r: 0 },
          opacity: 0,
        });
      }

      // ===========================================
      // フェーズ0: ゼゼとZEZEHIHIテキストの登場
      // ===========================================
      tl.to([zeze1Ref.current, zeze2Ref.current], {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
      });

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
      tl.to({}, { duration: 0.8 });

      // ===========================================
      // フェーズ1: 超高速斬撃（High-Speed Slash）
      // ===========================================

      // 斬撃刃が一瞬で出現
      tl.to(slashBladeRef.current, {
        opacity: 1,
        duration: 0.08,
        ease: "power4.out",
      });

      // 斬撃の光の軌跡（少し遅れて出現し、すぐに消える）
      tl.to(slashTrailRef.current, {
        opacity: 1,
        duration: 0.05,
        ease: "power4.out",
      }, '-=0.04');

      tl.to(slashTrailRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.out",
      }, '+=0.05');

      // ===========================================
      // フェーズ2: インパクトの瞬間（Impact Moment）
      // ===========================================

      // 画面全体の閃光（一瞬だけ）
      tl.to(flashEffectRef.current, {
        opacity: 0.4,
        duration: 0.05,
        ease: "power4.out",
      }, '-=0.1');

      tl.to(flashEffectRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      // 衝撃波が爆発的に広がる
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll('.shockwave');

        tl.to(shockwaves, {
          attr: { r: (i: number) => 80 + (i * 40) },
          opacity: 0.9,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        }, '-=0.25');

        tl.to(shockwaves, {
          opacity: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.in",
        }, '-=0.2');
      }

      // ===========================================
      // フェーズ3: 切断と物理挙動
      // ===========================================

      // 完全版のヒヒを非表示にする
      tl.to([hihi1FullRef.current, hihi2FullRef.current], {
        opacity: 0,
        duration: 0.02,
      }, '-=0.35');

      // 分割版を表示
      tl.to([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], {
        opacity: 1,
        duration: 0.02,
      }, '-=0.02');

      // ----------------------------------------------
      // 【下半分】激しい振動（その場で固定）
      // ----------------------------------------------
      const vibrationTL = gsap.timeline();

      vibrationTL.to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: 3,
        y: -2,
        duration: 0.04,
        ease: "power2.out",
      })
      .to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: -3,
        y: 2,
        duration: 0.04,
        ease: "power2.inOut",
      })
      .to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: 2,
        y: -1,
        duration: 0.04,
        ease: "power2.inOut",
      })
      .to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: -2,
        y: 1,
        duration: 0.04,
        ease: "power2.inOut",
      })
      .to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: 1,
        y: -0.5,
        duration: 0.04,
        ease: "power2.inOut",
      })
      .to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: -1,
        y: 0.5,
        duration: 0.04,
        ease: "power2.inOut",
      })
      .to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: 0,
        y: 0,
        duration: 0.08,
        ease: "elastic.out(2, 0.3)",
      });

      tl.add(vibrationTL, '-=0.33');

      // ----------------------------------------------
      // 【上半分】重力による落下（回転しながら）
      // ----------------------------------------------
      tl.to([hihi1TopRef.current, hihi2TopRef.current], {
        y: 60,
        x: 15,
        rotation: 8,
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.in",
      }, '-=0.33');

      // ===========================================
      // フェーズ4: 待機時間
      // ===========================================
      tl.to({}, { duration: 1.2 });

      // ===========================================
      // フェーズ5: 復元（Restore）
      // ===========================================

      // 上半分が磁力で吸い寄せられるように元に戻る
      tl.to([hihi1TopRef.current, hihi2TopRef.current], {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.7)",
      });

      // 下半分も完全に静止
      tl.to([hihi1BottomRef.current, hihi2BottomRef.current], {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: "back.out(1.7)",
      }, '-=0.9');

      // 分割版を非表示
      tl.to([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], {
        opacity: 0,
        duration: 0.2,
      }, '-=0.2');

      // 完全版を再表示
      tl.to([hihi1FullRef.current, hihi2FullRef.current], {
        opacity: 1,
        duration: 0.2,
      }, '-=0.2');

      // 斬撃エフェクトをリセット
      tl.to(slashBladeRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, '-=1.5');

      // 衝撃波をリセット
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll('.shockwave');
        tl.set(shockwaves, {
          attr: { r: 0 },
          opacity: 0,
        });
      }
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
      {/* ====================================== */}
      {/* 定義：フィルター、グラデーション、クリップパス */}
      {/* ====================================== */}
      <defs>
        {/* 発光フィルター（強烈なブルーム効果） */}
        <filter id="glow-intense">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 通常の発光フィルター */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 衝撃波用の放射状グラデーション */}
        <radialGradient id="shockwaveGradient">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#87CEEB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00BFFF" stopOpacity="0" />
        </radialGradient>

        {/* 斬撃刃のグラデーション */}
        <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="50%" stopColor="#87CEEB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.7" />
        </linearGradient>

        {/* 斜めの切断用クリップパス */}
        <clipPath id="hihi1TopClip">
          <polygon points="400,130 600,130 600,200 400,150" />
        </clipPath>

        <clipPath id="hihi1BottomClip">
          <polygon points="400,150 600,200 600,380 400,380" />
        </clipPath>

        <clipPath id="hihi2TopClip">
          <polygon points="560,130 780,130 780,240 560,190" />
        </clipPath>

        <clipPath id="hihi2BottomClip">
          <polygon points="560,190 780,240 780,380 560,380" />
        </clipPath>
      </defs>

      {/* ====================================== */}
      {/* ゼゼ部分 */}
      {/* ====================================== */}
      <text
        ref={zeze1Ref}
        x="50"
        y="300"
        fontSize="200"
        fontWeight="bold"
        fontStyle="italic"
        fill="white"
        fontFamily="sans-serif"
      >
        ゼ
      </text>

      <text
        ref={zeze2Ref}
        x="230"
        y="300"
        fontSize="200"
        fontWeight="bold"
        fontStyle="italic"
        fill="white"
        fontFamily="sans-serif"
      >
        ゼ
      </text>

      {/* ====================================== */}
      {/* ヒヒ部分 - 完全版 */}
      {/* ====================================== */}
      <g ref={hihi1FullRef}>
        <text
          x="430"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
        >
          ヒ
        </text>
      </g>

      <g ref={hihi2FullRef}>
        <text
          x="590"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
        >
          ヒ
        </text>
      </g>

      {/* ====================================== */}
      {/* ヒヒ部分 - 分割版 */}
      {/* ====================================== */}
      <g ref={hihi1TopRef} clipPath="url(#hihi1TopClip)" opacity="0">
        <text
          x="430"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
        >
          ヒ
        </text>
      </g>

      <g ref={hihi1BottomRef} clipPath="url(#hihi1BottomClip)" opacity="0">
        <text
          x="430"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
        >
          ヒ
        </text>
      </g>

      <g ref={hihi2TopRef} clipPath="url(#hihi2TopClip)" opacity="0">
        <text
          x="590"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
        >
          ヒ
        </text>
      </g>

      <g ref={hihi2BottomRef} clipPath="url(#hihi2BottomClip)" opacity="0">
        <text
          x="590"
          y="300"
          fontSize="200"
          fontWeight="bold"
          fontStyle="italic"
          fill="white"
          fontFamily="sans-serif"
        >
          ヒ
        </text>
      </g>

      {/* ====================================== */}
      {/* VFX: 斬撃刃（3層構造のエネルギーブレード） */}
      {/* ====================================== */}
      <g ref={slashBladeRef} opacity="0">
        {/* 外側の大きな光のオーラ */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="url(#bladeGradient)"
          strokeWidth="40"
          strokeLinecap="round"
          opacity="0.3"
          style={{
            filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 1)) drop-shadow(0 0 30px rgba(135, 206, 235, 0.8)) drop-shadow(0 0 45px rgba(0, 191, 255, 0.6))"
          }}
        />

        {/* 中間層の明るい光 */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#87CEEB"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.6"
          style={{
            filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 1)) drop-shadow(0 0 30px rgba(135, 206, 235, 0.8))"
          }}
        />

        {/* コアの鋭い白刃 */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="1"
          style={{
            filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 1))"
          }}
        />
      </g>

      {/* ====================================== */}
      {/* VFX: 斬撃の光の軌跡（トレイル） */}
      {/* ====================================== */}
      <g ref={slashTrailRef} opacity="0">
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#FFFFFF"
          strokeWidth="60"
          strokeLinecap="round"
          opacity="0.8"
          filter="url(#glow-intense)"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.7))"
          }}
        />
      </g>

      {/* ====================================== */}
      {/* VFX: インパクト衝撃波 */}
      {/* ====================================== */}
      <g ref={impactWavesRef}>
        <circle
          className="shockwave"
          cx="550"
          cy="200"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="8"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="550"
          cy="200"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="6"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="550"
          cy="200"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="4"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="550"
          cy="200"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="3"
          opacity="0"
        />
      </g>

      {/* ====================================== */}
      {/* VFX: フラッシュエフェクト */}
      {/* ====================================== */}
      <rect
        ref={flashEffectRef}
        x="0"
        y="0"
        width="800"
        height="400"
        fill="white"
        opacity="0"
      />

      {/* ====================================== */}
      {/* ZEZEHIHIテキスト */}
      {/* ====================================== */}
      <text
        ref={zezehihiTextRef}
        x="400"
        y="380"
        fontSize="36"
        fontWeight="600"
        fill="white"
        fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
        textAnchor="middle"
        style={{
          letterSpacing: "0.15em",
        }}
      >
        ZEZEHIHI
      </text>
    </svg>
  );
}
