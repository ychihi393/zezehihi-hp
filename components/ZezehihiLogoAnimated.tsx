"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  // State
  // ===========================================
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [isArmed, setIsArmed] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

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

  // ===========================================
  // Helpers
  // ===========================================
  const applyInitialState = useCallback(() => {
    // ロゴは「切れる前の完全体」を表示
    gsap.set([zeze1Ref.current, zeze2Ref.current], {
      scale: 1,
      opacity: 1,
    });
    gsap.set(zezehihiTextRef.current, {
      y: 0,
      opacity: 1,
    });

    // 完全版（ヒヒ）を表示
    gsap.set([hihi1FullRef.current, hihi2FullRef.current], {
      opacity: 1,
    });

    // 分割版（ヒヒ）は非表示＆位置/回転を初期化
    gsap.set(
      [hihi1TopRef.current, hihi1BottomRef.current, hihi2TopRef.current, hihi2BottomRef.current],
      {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0,
      }
    );

    // VFX初期化
    gsap.set(kienzanRef.current, { x: 0, y: 0, opacity: 0 });
    if (impactWavesRef.current) {
      const shockwaves = impactWavesRef.current.querySelectorAll(".shockwave");
      gsap.set(shockwaves, { attr: { r: 0 }, opacity: 0 });
    }
  }, []);

  // ===========================================
  // Page Load: 初期表示は完全体
  // ===========================================
  useEffect(() => {
    applyInitialState();
  }, [applyInitialState]);

  // ===========================================
  // Trigger: 「スクロールしようとした瞬間」に発火（armedのときだけ）
  // ===========================================
  useEffect(() => {
    if (!isArmed) return;

    // 初期状態でスクロールをロック
    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");

    const triggerAnimation = () => {
      setAnimationTriggered(true);
      setIsArmed(false);
    };

    const handleWheel = () => triggerAnimation();
    const handleTouchMove = () => triggerAnimation();
    const handleKeyDown = (e: KeyboardEvent) => {
      // スクロール系のキー: Space(32), PageUp(33), PageDown(34), End(35), Home(36), Arrow keys(37-40)
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (scrollKeys.includes(e.keyCode)) {
        triggerAnimation();
      }
    };

    // イベントリスナー登録（once: trueで一度だけ発火）
    window.addEventListener("wheel", handleWheel, { once: true, passive: true });
    window.addEventListener("touchmove", handleTouchMove, { once: true, passive: true });
    window.addEventListener("keydown", handleKeyDown, { once: true });

    // クリーンアップ関数
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isArmed]);

  // ===========================================
  // Reset on Top: ユーザーが最上部(0)に戻ったら、こっそり初期化して再装填
  // ===========================================
  useEffect(() => {
    if (!isCompleted) return;

    const onScroll = () => {
      if (window.scrollY <= 0) {
        // 1) 見た目を完全体に戻す
        applyInitialState();

        // 2) 状態をリセットして再装填
        setIsCompleted(false);
        setAnimationTriggered(false);
        setIsArmed(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [applyInitialState, isCompleted]);

  // ===========================================
  // Unmount safety: 画面遷移等でスクロールロックが残らないように
  // ===========================================
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, []);

  useGSAP(
    () => {
      // アニメーションが発火されるまで実行しない
      if (!animationTriggered || !containerRef.current) return;

      // 再生前に「完全体」へ揃える（念のため）
      applyInitialState();

      const tl = gsap.timeline({
        onComplete: () => {
          // 1) スクロールロック解除
          document.documentElement.classList.remove("scroll-locked");
          document.body.classList.remove("scroll-locked");

          // 2) 少し下へオートスクロール（誘導）
          //    画面の 25% だけ下にスムーズスクロール（次のコンテンツが見える程度）
          const y = Math.round(window.innerHeight * 0.25);
          window.requestAnimationFrame(() => {
            window.scrollTo({ top: y, behavior: "smooth" });
          });

          // 3) 「完了」状態へ（トップに戻った時だけ再装填）
          setIsCompleted(true);

          onAnimationComplete?.();
        },
      });

      // ===========================================
      // GPU最適化設定
      // ===========================================
      gsap.config({ force3D: true });

      // ===========================================
      // 初期状態設定
      // スクロールトリガー時には既に完全なロゴが表示されている
      // ここではアニメーション開始時の初期状態を設定
      // ===========================================
      // ゼゼは最初から完全に表示されているので、アニメーション開始時も表示されたまま
      // （ゼゼの登場アニメーションは実行するが、既に表示されている状態から）
      gsap.set([zeze1Ref.current, zeze2Ref.current], {
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
        force3D: true,
      });

      // ZEZEHIHIテキストも最初から表示されている
      gsap.set(zezehihiTextRef.current, {
        y: 0,
        opacity: 1,
      });

      // ヒヒは完全版で表示されている
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
      // フェーズ0: 初期状態は完全なロゴが既に表示されている
      // スクロールトリガー時にはゼゼ・ZEZEHIHI・ヒヒは既に表示済み
      // 気円斬アニメーションまで少し待つ
      // ===========================================
      // 既に完全なロゴが表示されているので、少し待ってから気円斬へ
      tl.to({}, { duration: 0.3 });

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
      // 移動距離: x=800, y=297 (1000-200=800, 347-80=267)
      // フェードアウトせずに、高速で画面外へ飛び去る
      //
      tl.to(kienzanRef.current, {
        x: 800,   // 右下の外側まで（viewBox外）
        y: 297,   // 傾き1/3に従った移動（下げた位置）
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
      // 【下半分】静止（振動なし）
      // ----------------------------------------------
      // 下半分は切断後、完全に静止したまま

      // ----------------------------------------------
      // 【上半分】重力による落下（切断と同時に即座に）
      // ----------------------------------------------
      tl.to([hihi1TopRef.current, hihi2TopRef.current], {
        y: 60,
        x: 15,
        rotation: 25,  // 回転を強化（8 → 25）
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.in",
      }, '-=0.13');  // 切断と同時に落下開始

      // ===========================================
      // フェーズ4: 待機時間
      // ===========================================
      // 変更仕様: 「元の形に戻る」は削除し、崩れ落ちた状態で停止して維持する
      // VFXだけリセットして終了（見た目は「切れて崩れ落ちたまま」）
      tl.set(kienzanRef.current, { x: 0, y: 0, opacity: 0 });
      if (impactWavesRef.current) {
        const shockwaves = impactWavesRef.current.querySelectorAll(".shockwave");
        tl.set(shockwaves, { attr: { r: 0 }, opacity: 0 });
      }
    },
    { scope: containerRef, dependencies: [animationTriggered] }
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
        - 始点: (200, 80)   ← 画面左上の外側から開始
        - 終点: (1000, 347) ← 画面右下の外側まで突き抜ける
        - 傾き: (347-80)/(1000-200) = 267/800 = 1/3（緩やか）
        - 方程式: y = (1/3)x + 13.33

        ※傾きを小さくするほど、より水平に近い斬撃になります
        ※現在の傾き 1/3 は、前回の 2/3 の半分（より緩やか）
        ====================================
        */}

        {/*
        ====================================
        切断ライン座標計算（Complete Through-Pass）
        ====================================
        文字の位置での切断ラインY座標:
        方程式 y = (1/3)x + 13.33 を使用

        ヒヒ1（x=400-600の範囲）:
          x=400: y = (1/3)*400 + 13.33 = 146.67
          x=600: y = (1/3)*600 + 13.33 = 213.33

        ヒヒ2（x=560-780の範囲）:
          x=560: y = (1/3)*560 + 13.33 = 200
          x=780: y = (1/3)*780 + 13.33 = 273.33

        衝撃波中心（x=500）:
          y = (1/3)*500 + 13.33 = 180
        ====================================
        */}

        {/* ヒヒ1（1文字目）上半分 - 緩やかな斜め切断ライン上部 */}
        <clipPath id="hihi1TopClip">
          {/* 方程式 y = (1/3)x + 13.33 に従う */}
          <polygon points="400,80 600,80 600,213 400,147" />
        </clipPath>

        {/* ヒヒ1（1文字目）下半分 - 緩やかな斜め切断ライン下部 */}
        <clipPath id="hihi1BottomClip">
          {/* 方程式 y = (1/3)x + 13.33 に従う */}
          <polygon points="400,147 600,213 600,380 400,380" />
        </clipPath>

        {/* ヒヒ2（2文字目）上半分 - 緩やかな斜め切断ライン上部 */}
        <clipPath id="hihi2TopClip">
          {/* 方程式 y = (1/3)x + 13.33 に従う */}
          <polygon points="560,80 780,80 780,273 560,200" />
        </clipPath>

        {/* ヒヒ2（2文字目）下半分 - 緩やかな斜め切断ライン下部 */}
        <clipPath id="hihi2BottomClip">
          {/* 方程式 y = (1/3)x + 13.33 に従う */}
          <polygon points="560,200 780,273 780,380 560,380" />
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
      {/* 始点: (200, 80) ← 左上外側 */}
      {/* 終点: (1000, 347) ← 右下外側（viewBox外） */}
      {/* ====================================== */}
      <g ref={kienzanRef} opacity="0">
        {/* 外側の黄色の輝き（残像効果） */}
        <line
          x1="200" y1="80"
          x2="1000" y2="347"
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
          x1="200" y1="80"
          x2="1000" y2="347"
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
          x1="200" y1="80"
          x2="1000" y2="347"
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
          x1="200" y1="80"
          x2="1000" y2="347"
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
      {/* x=500, y = (1/3)*500 + 13.33 = 180 */}
      {/* ====================================== */}
      <g ref={impactWavesRef}>
        <circle
          className="shockwave"
          cx="500"
          cy="180"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="8"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="180"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="6"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="180"
          r="0"
          fill="none"
          stroke="url(#shockwaveGradient)"
          strokeWidth="4"
          opacity="0"
        />
        <circle
          className="shockwave"
          cx="500"
          cy="180"
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
