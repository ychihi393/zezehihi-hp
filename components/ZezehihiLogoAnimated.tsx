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
      // フェーズ1: 気円斬（Kienzan）- 完全通り抜け
      // ===========================================

      // 気円斬が出現し、弾丸のように突き抜ける
      tl.to(kienzanRef.current, {
        opacity: 1,
        duration: 0.02,
        ease: "power4.out",
      });

      //
      // 完全通り抜け（Complete Through-Pass）
      // 画面左上外側から右下外側まで完全に突き抜ける
      // 移動距離: x=800, y=267 (1000-200=800, 317-50=267)
      // フェードアウトせずに、高速で画面外へ飛び去る
      //
      tl.to(kienzanRef.current, {
        x: 800,   // 右下の外側まで（viewBox外）
        y: 267,   // 傾き1/3に従った移動
        duration: 0.1,
        ease: "power1.in",
      }, "-=0.02");

      // 画面外に飛び去った後、瞬時に消える（フェードではなく瞬時）
      tl.to(kienzanRef.current, {
        opacity: 0,
        duration: 0.02,
        ease: "power1.out",
      }, "+=0.05");

      // ===========================================
      // タイミングの短縮（Tighter Timing）- 維持
      // 斬撃が文字の中央を通過した瞬間に切断が発生
      // "-=0.11" で食い気味に反応させる
      // ===========================================

      // 完全版のヒヒを非表示にする（斬撃の中盤で即座に）
      tl.to([hihi1FullRef.current, hihi2FullRef.current], {
        opacity: 0,
        duration: 0.01,
      }, '-=0.11');  // 調整（0.1秒の移動中の中盤）

      // 分割版を表示（同時）
      tl.to([hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current], {
        opacity: 1,
        duration: 0.01,
      }, '-=0.01');

      // ===========================================
      // 衝撃波（斬撃と同時多発的に）- 維持
      // ===========================================
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll('.shockwave');

        tl.to(shockwaves, {
          attr: { r: (i: number) => 80 + (i * 40) },
          opacity: 0.7,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
        }, '-=0.13');  // 斬撃とほぼ同時

        tl.to(shockwaves, {
          opacity: 0,
          duration: 0.25,
          stagger: 0.06,
          ease: "power2.in",
        }, '-=0.15');
      }

      // ===========================================
      // 物理挙動（切断と同時に即座に開始）- 維持
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

      // 振動を切断と同時に開始（"-=0.13"で食い気味）
      tl.add(vibrationTL, '-=0.13');

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
      }, '-=0.13');  // 振動と同時に落下開始

      // ===========================================
      // フェーズ4: 待機時間
      // ===========================================
      tl.to({}, { duration: 1.2 });

      // ===========================================
      // フェーズ5: 復元（Restore）- 維持
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
        角度調整パラメータ（Angle Parameters）
        ====================================
        【重要】この値を変更すると、斬撃の角度が変わります

        斬撃ラインの方程式（より緩やかな角度）:
        - 始点: (200, 50)   ← 画面左上の外側から開始
        - 終点: (1000, 317) ← 画面右下の外側まで突き抜ける
        - 傾き: (317-50)/(1000-200) = 267/800 = 1/3（緩やか）
        - 方程式: y = (1/3)x - 16.67

        ※傾きを小さくするほど、より水平に近い斬撃になります
        ※現在の傾き 1/3 は、前回の 2/3 の半分（より緩やか）
        ====================================
        */}

        {/*
        ====================================
        切断ライン座標計算（Complete Through-Pass）
        ====================================
        文字の位置での切断ラインY座標:
        方程式 y = (1/3)x - 16.67 を使用

        ヒヒ1（x=400-600の範囲）:
          x=400: y = (1/3)*400 - 16.67 = 116.67
          x=600: y = (1/3)*600 - 16.67 = 183.33

        ヒヒ2（x=560-780の範囲）:
          x=560: y = (1/3)*560 - 16.67 = 170
          x=780: y = (1/3)*780 - 16.67 = 243.33

        衝撃波中心（x=500）:
          y = (1/3)*500 - 16.67 = 150
        ====================================
        */}

        {/* ヒヒ1（1文字目）上半分 - 緩やかな斜め切断ライン上部 */}
        <clipPath id="hihi1TopClip">
          {/* 方程式 y = (1/3)x - 16.67 に従う */}
          <polygon points="400,80 600,80 600,183 400,117" />
        </clipPath>

        {/* ヒヒ1（1文字目）下半分 - 緩やかな斜め切断ライン下部 */}
        <clipPath id="hihi1BottomClip">
          {/* 方程式 y = (1/3)x - 16.67 に従う */}
          <polygon points="400,117 600,183 600,380 400,380" />
        </clipPath>

        {/* ヒヒ2（2文字目）上半分 - 緩やかな斜め切断ライン上部 */}
        <clipPath id="hihi2TopClip">
          {/* 方程式 y = (1/3)x - 16.67 に従う */}
          <polygon points="560,80 780,80 780,243 560,170" />
        </clipPath>

        {/* ヒヒ2（2文字目）下半分 - 緩やかな斜め切断ライン下部 */}
        <clipPath id="hihi2BottomClip">
          {/* 方程式 y = (1/3)x - 16.67 に従う */}
          <polygon points="560,170 780,243 780,380 560,380" />
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
      {/* 座標: 画面外から画面外へ完全通り抜け */}
      {/* 始点: (200, 50) ← 左上外側 */}
      {/* 終点: (1000, 317) ← 右下外側（viewBox外） */}
      {/* ====================================== */}
      <g ref={kienzanRef} opacity="0">
        {/* 外側の黄色の輝き（残像効果） */}
        <line
          x1="200" y1="50"
          x2="1000" y2="317"
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
          x1="200" y1="50"
          x2="1000" y2="317"
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
          x1="200" y1="50"
          x2="1000" y2="317"
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
          x1="200" y1="50"
          x2="1000" y2="317"
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
      {/* x=500, y = (1/3)*500 - 16.67 = 150 */}
      {/* ====================================== */}
      <g ref={impactWavesRef}>
        <circle
          className="shockwave"
          cx="500"
          cy="150"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="8"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="150"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="6"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="150"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="4"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="150"
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
