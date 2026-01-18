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

      // 左上から右下へ超高速移動（0.08秒で突き抜ける）
      // ※より速く、よりシャープに
      tl.to(kienzanRef.current, {
        x: 450,
        y: 300,
        duration: 0.08,
        ease: "power1.in",
      }, "-=0.02");

      // ===========================================
      // タイミングの短縮（Tighter Timing）
      // 斬撃が文字の中央を通過した瞬間に切断が発生
      // "-=0.06" で食い気味に反応させる
      // ===========================================

      // 完全版のヒヒを非表示にする（斬撃の中盤で即座に）
      tl.to([hihi1FullRef.current, hihi2FullRef.current], {
        opacity: 0,
        duration: 0.01,
      }, '-=0.06');  // 食い気味に切断

      // 分割版を表示（同時）
      tl.to([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], {
        opacity: 1,
        duration: 0.01,
      }, '-=0.01');

      // ===========================================
      // 衝撃波（斬撃と同時多発的に）
      // ===========================================
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll('.shockwave');

        tl.to(shockwaves, {
          attr: { r: (i: number) => 80 + (i * 40) },
          opacity: 0.7,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
        }, '-=0.08');  // 斬撃とほぼ同時

        tl.to(shockwaves, {
          opacity: 0,
          duration: 0.25,
          stagger: 0.06,
          ease: "power2.in",
        }, '-=0.15');
      }

      // ===========================================
      // 物理挙動（切断と同時に即座に開始）
      // ===========================================

      // ----------------------------------------------
      // 【下半分】激しい振動（切断の瞬間から即座に）
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

      // 振動を切断と同時に開始（"-=0.08"で食い気味）
      tl.add(vibrationTL, '-=0.08');

      // ----------------------------------------------
      // 【上半分】重力による落下（切断と同時に即座に）
      // ----------------------------------------------
      tl.to([hihi1TopRef.current, hihi2TopRef.current], {
        y: 60,
        x: 15,
        rotation: 8,
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.in",
      }, '-=0.08');  // 振動と同時に落下開始

      // 気円斬の残像フェードアウト
      tl.to(kienzanRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.out",
      }, '-=0.7');

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

        {/*
        ====================================
        座標の完全同期（Perfect Alignment）
        ====================================
        斬撃ラインの方程式:
        - 始点: (300, 50)
        - 終点: (750, 350)
        - 傾き: (350-50)/(750-300) = 300/450 = 2/3
        - 方程式: y = (2/3)x - 150

        文字の位置での切断ラインY座標:
        - ヒヒ1（x=400-600の範囲）:
          x=400: y = 266.67 - 150 = 116.67 ≈ 117
          x=600: y = 400 - 150 = 250

        - ヒヒ2（x=560-780の範囲）:
          x=560: y = 373.33 - 150 = 223.33 ≈ 223
          x=780: y = 520 - 150 = 370

        クリップパスはこの線形方程式に完全に従う
        ====================================
        */}

        {/* ヒヒ1（1文字目）上半分 - 斜め切断ライン上部 */}
        <clipPath id="hihi1TopClip">
          {/* 切断ラインは y = (2/3)x - 150 に従う */}
          <polygon points="400,100 600,100 600,250 400,117" />
        </clipPath>

        {/* ヒヒ1（1文字目）下半分 - 斜め切断ライン下部 */}
        <clipPath id="hihi1BottomClip">
          {/* 切断ラインは y = (2/3)x - 150 に従う */}
          <polygon points="400,117 600,250 600,380 400,380" />
        </clipPath>

        {/* ヒヒ2（2文字目）上半分 - 斜め切断ライン上部 */}
        <clipPath id="hihi2TopClip">
          {/* 切断ラインは y = (2/3)x - 150 に従う */}
          <polygon points="560,100 780,100 780,370 560,223" />
        </clipPath>

        {/* ヒヒ2（2文字目）下半分 - 斜め切断ライン下部 */}
        <clipPath id="hihi2BottomClip">
          {/* 切断ラインは y = (2/3)x - 150 に従う */}
          <polygon points="560,223 780,370 780,380 560,380" />
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
      {/* 座標: 斬撃ラインと完全に同じ (300,50)→(750,350) */}
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
      {/* VFX: インパクト衝撃波 */}
      {/* 中心座標: 斬撃が文字の中央を通過する位置 */}
      {/* x=500でのy座標: y = (2/3)*500 - 150 = 183.33 */}
      {/* ====================================== */}
      <g ref={impactWavesRef}>
        <circle
          className="shockwave"
          cx="500"
          cy="183"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="8"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="183"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="6"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="183"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="4"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="183"
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
