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

  // VFX要素（気円斬スタイル）
  const kienzanRef = useRef<SVGGElement>(null);
  const impactWavesRef = useRef<SVGGElement>(null);
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

      // 気円斬の初期位置（左上の開始位置）
      gsap.set(kienzanRef.current, {
        x: 0,
        y: 0,
        opacity: 0,
        transformOrigin: "center center",
        force3D: true,
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
      // フェーズ1: 気円斬（Kienzan）- 超高速エネルギーブレード
      // ===========================================

      // 気円斬が出現し、弾丸のように突き抜ける
      tl.to(kienzanRef.current, {
        opacity: 1,
        duration: 0.02,
        ease: "power4.out",
      });

      // 左上から右下へ超高速移動（0.1秒で突き抜ける）
      tl.to(kienzanRef.current, {
        x: 450,  // 右下方向へ移動
        y: 300,  // 右下方向へ移動
        duration: 0.1,
        ease: "power1.in",
      }, "-=0.02");

      // 移動後、残像が少し残ってからフェードアウト
      tl.to(kienzanRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      }, "+=0.05");

      // ===========================================
      // フェーズ2: インパクトの瞬間（Impact Moment）
      // ※コンテナフラッシュは削除。衝撃波のみ。
      // ===========================================

      // 衝撃波が爆発的に広がる
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll('.shockwave');

        tl.to(shockwaves, {
          attr: { r: (i: number) => 80 + (i * 40) },
          opacity: 0.7,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        }, '-=0.2');

        tl.to(shockwaves, {
          opacity: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.in",
        }, '-=0.2');
      }

      // ===========================================
      // フェーズ3: 切断と物理挙動（完璧なので維持）
      // ===========================================

      // 完全版のヒヒを非表示にする
      tl.to([hihi1FullRef.current, hihi2FullRef.current], {
        opacity: 0,
        duration: 0.02,
      }, '-=0.3');

      // 分割版を表示
      tl.to([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], {
        opacity: 1,
        duration: 0.02,
      }, '-=0.02');

      // ----------------------------------------------
      // 【下半分】激しい振動（その場で固定）- 完璧なので維持
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

      tl.add(vibrationTL, '-=0.28');

      // ----------------------------------------------
      // 【上半分】重力による落下（回転しながら）- 完璧なので維持
      // ----------------------------------------------
      tl.to([hihi1TopRef.current, hihi2TopRef.current], {
        y: 60,
        x: 15,
        rotation: 8,
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.in",
      }, '-=0.28');

      // ===========================================
      // フェーズ4: 待機時間
      // ===========================================
      tl.to({}, { duration: 1.2 });

      // ===========================================
      // フェーズ5: 復元（Restore）- 完璧なので維持
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

      // 気円斬をリセット（初期位置に戻す）
      tl.set(kienzanRef.current, {
        x: 0,
        y: 0,
        opacity: 0,
      });

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
        {/* 気円斬用の強烈な発光フィルター */}
        <filter id="kienzan-glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
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
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#87CEEB" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00BFFF" stopOpacity="0" />
        </radialGradient>

        {/* 気円斬のエッジグラデーション（中心白→エッジ青/黄） */}
        <linearGradient id="kienzanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#87CEEB" stopOpacity="0.6" />
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
      {/* VFX: 気円斬（Kienzan）- 超高密度エネルギーブレード */}
      {/* ====================================== */}
      <g ref={kienzanRef} opacity="0">
        {/* 外側の黄色の輝き（残像効果） */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#FFD700"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.3"
          filter="url(#kienzan-glow)"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.5))"
          }}
        />

        {/* 中間層の青白い光 */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#87CEEB"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
          filter="url(#kienzan-glow)"
          style={{
            filter: "drop-shadow(0 0 15px rgba(135, 206, 235, 0.9)) drop-shadow(0 0 30px rgba(135, 206, 235, 0.6))"
          }}
        />

        {/* コアの鋭い白い刃（最も強烈） */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="1"
          filter="url(#kienzan-glow)"
          style={{
            filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 1)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.5))"
          }}
        />

        {/* 最も内側のシャープなエッジ */}
        <line
          x1="300" y1="50"
          x2="750" y2="350"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="1"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
          }}
        />
      </g>

      {/* ====================================== */}
      {/* VFX: インパクト衝撃波（刃のみ光る） */}
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
