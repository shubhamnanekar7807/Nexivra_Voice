"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const TOTAL_FRAMES = 50;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/robot-frames/ezgif-frame-${frameNum}.jpg`;
};

export function RobotScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Preload all 50 sequential robot frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Render frame to canvas with watermark cropping + seamless #050505 vignette
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Base background
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    // Crop the bottom-right corner to completely eliminate any watermark logo
    const cropRightFactor = 0.92;
    const cropBottomFactor = 0.92;
    const sWidth = imgWidth * cropRightFactor;
    const sHeight = imgHeight * cropBottomFactor;

    // Aspect ratio cover calculation
    const zoom = 1.05;
    const scale = Math.max(canvasWidth / sWidth, canvasHeight / sHeight) * zoom;
    const drawWidth = sWidth * scale;
    const drawHeight = sHeight * scale;

    const drawX = (canvasWidth - drawWidth) / 2;
    // Shift slightly down so head sits cleanly below the header navigation line
    const drawY = (canvasHeight - drawHeight) / 2 + (42 * dpr);

    ctx.drawImage(img, 0, 0, sWidth, sHeight, drawX, drawY, drawWidth, drawHeight);

    // Deep radial vignette to blend the frame background seamlessly into #050505
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      Math.min(canvasWidth, canvasHeight) * 0.28,
      canvasWidth / 2,
      canvasHeight / 2,
      Math.max(canvasWidth, canvasHeight) * 0.7
    );
    gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
    gradient.addColorStop(0.7, "rgba(5, 5, 5, 0.45)");
    gradient.addColorStop(1, "rgba(5, 5, 5, 1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }, []);

  // Resize canvas according to display DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, renderFrame]);

  // Scroll listener mapped to 0 -> 49 frames with smooth interpolation
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / scrollableHeight, 0), 1);
      setScrollProgress(progress);

      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Lerp loop for ultra-smooth 60fps frame transitions
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.2;
        renderFrame(Math.min(Math.max(Math.round(currentFrameRef.current), 0), TOTAL_FRAMES - 1));
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [imagesLoaded, renderFrame]);

  // Phase opacity calculations
  // Phase 1: 0% -> 15% (Hero)
  const p1Opacity = scrollProgress <= 0.15 ? Math.max(0, 1 - scrollProgress / 0.15) : 0;
  // Phase 2: 15% -> 35% (Systems Reveal)
  const p2Opacity =
    scrollProgress > 0.12 && scrollProgress <= 0.35
      ? scrollProgress < 0.2
        ? (scrollProgress - 0.12) / 0.08
        : scrollProgress > 0.28
        ? (0.35 - scrollProgress) / 0.07
        : 1
      : 0;
  // Phase 3: 35% -> 55% (AI Core)
  const p3Opacity =
    scrollProgress > 0.32 && scrollProgress <= 0.55
      ? scrollProgress < 0.4
        ? (scrollProgress - 0.32) / 0.08
        : scrollProgress > 0.48
        ? (0.55 - scrollProgress) / 0.07
        : 1
      : 0;
  // Phase 4: 55% -> 70% (Tools & Workflows)
  const p4Opacity =
    scrollProgress > 0.52 && scrollProgress <= 0.72
      ? scrollProgress < 0.58
        ? (scrollProgress - 0.52) / 0.06
        : scrollProgress > 0.65
        ? (0.72 - scrollProgress) / 0.07
        : 1
      : 0;
  // Phase 5: 70% -> 85% (Intelligence Activates)
  const p5Opacity =
    scrollProgress > 0.68 && scrollProgress <= 0.86
      ? scrollProgress < 0.74
        ? (scrollProgress - 0.68) / 0.06
        : scrollProgress > 0.8
        ? (0.86 - scrollProgress) / 0.06
        : 1
      : 0;
  // Phase 6: 85% -> 100% (Awakening / Final Hero)
  const p6Opacity = scrollProgress > 0.83 ? Math.min(1, (scrollProgress - 0.83) / 0.1) : 0;

  return (
    <div ref={containerRef} className="relative h-[420vh] w-full bg-[#050505]">
      {/* Loading Overlay */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
          <div className="size-10 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Initializing AI Neural Sequence
          </p>
          <p className="mt-1 text-[11px] text-zinc-500 font-mono">{loadProgress}%</p>
        </div>
      )}

      {/* Sticky Fullscreen Scrollytelling Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Subtle Ambient Navy/Cyan Light Leak */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-blue-600/10 blur-[160px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
        </div>

        {/* 60fps Canvas Render Target */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover z-0"
        />

        {/* Apple-Style Minimal HUD Progress */}
        <div className="pointer-events-none absolute top-24 right-6 sm:right-12 z-20 hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-300 font-semibold tracking-wider">NEURAL TIMELINE</span>
          </div>
          <p className="text-cyan-400/80">{Math.round(scrollProgress * 100)}% COMPLETE</p>
          <div className="h-24 w-0.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div
              className="w-full bg-gradient-to-b from-cyan-400 to-blue-600 transition-all duration-75"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* ================= STORYTELLING PHASES ================= */}

        {/* PHASE 1: 0% -> 15% (HERO) */}
        <div
          style={{ opacity: p1Opacity, transform: `translateY(${(1 - p1Opacity) * -20}px)` }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-14 lg:p-20 transition-opacity duration-200"
        >
          <div className="max-w-xl pt-16 sm:pt-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              NEXIVRA TECH • AUTONOMOUS AI
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
              INTELLIGENCE<br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                THAT WORKS.
              </span>
            </h1>
            <p className="mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
              We build intelligent AI agents that communicate in Marathi, Hindi & English, reason through complex operations, and execute workflows 24/7.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/get-started"
                className="rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-500/30 hover:scale-105 transition cursor-pointer"
              >
                Build Your AI Agent
              </Link>
              <a
                href="#agents"
                className="rounded-full border border-white/20 bg-white/[0.05] px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/10 transition backdrop-blur-md cursor-pointer"
              >
                Explore Technology
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <span className="size-2 rounded-full border border-cyan-400 animate-ping" />
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
          </div>
        </div>

        {/* PHASE 2: 15% -> 35% (SYSTEMS REVEAL) */}
        <div
          style={{ opacity: p2Opacity, transform: `translateY(${(1 - p2Opacity) * 20}px)` }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center items-start p-6 sm:p-14 lg:p-20 transition-opacity duration-200"
        >
          <div className="max-w-md bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              01 • System Deconstruction
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              MORE THAN<br />A MODEL.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              A Nexivra AI Agent connects neural reasoning, episodic memory, multi-tool orchestration, and real-world actions into one cohesive intelligence.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Reasoning Engine", "Long-Term Memory", "Knowledge Base", "Tool Execution"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-slate-300"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PHASE 3: 35% -> 55% (AI CORE REVEAL) */}
        <div
          style={{ opacity: p3Opacity, transform: `translateY(${(1 - p3Opacity) * 20}px)` }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center items-end p-6 sm:p-14 lg:p-20 transition-opacity duration-200"
        >
          <div className="max-w-md bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              02 • Neural Core
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              ONE INTELLIGENT<br />CORE.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Reasoning. Memory. Sub-500ms voice synthesis. Context awareness. All synchronizing through our high-speed central AI engine.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-mono text-cyan-300">
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CORE FREQUENCY: &lt;500ms LATENCY</span>
            </div>
          </div>
        </div>

        {/* PHASE 4: 55% -> 70% (TOOLS & AUTOMATION) */}
        <div
          style={{ opacity: p4Opacity, transform: `translateY(${(1 - p4Opacity) * 20}px)` }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center items-start p-6 sm:p-14 lg:p-20 transition-opacity duration-200"
        >
          <div className="max-w-md bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              03 • Tool Integrations
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              CONNECTED TO<br />WHAT MATTERS.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Your AI agents directly connect to CRM systems, phone telephony lines, databases, calendars, and external APIs to take immediate action.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-1.5 text-center font-mono text-[9px] text-cyan-300">
              {["VOICE OS", "APIs", "DATABASE", "TELEPHONY", "CALENDAR", "CRM SYNC"].map((t) => (
                <div key={t} className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 py-1.5">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHASE 5: 70% -> 85% (INTELLIGENCE ACTIVATES) */}
        <div
          style={{ opacity: p5Opacity, transform: `translateY(${(1 - p5Opacity) * 20}px)` }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center items-end p-6 sm:p-14 lg:p-20 transition-opacity duration-200"
        >
          <div className="max-w-md bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              04 • Magnetic Reassembly
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              BUILT TO<br />TAKE ACTION.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              From understanding human intent across Marathi, Hindi & English to completing multi-step operations without human intervention.
            </p>
          </div>
        </div>

        {/* PHASE 6: 85% -> 100% (AWAKENING & FINAL HERO) */}
        <div
          style={{ opacity: p6Opacity, transform: `translateY(${(1 - p6Opacity) * 20}px)` }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-6 sm:p-14 transition-opacity duration-200"
        >
          <div className="max-w-2xl bg-black/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-300 uppercase tracking-widest">
              The Next Generation of Work
            </span>
            <h2 className="mt-4 text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              MEET YOUR<br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                AI WORKFORCE.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg mx-auto">
              Intelligent, multilingual voice & automation agents designed to scale your business operations 24/7.
            </p>

            <div className="pointer-events-auto mt-8 flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/get-started"
                className="rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-500/30 hover:scale-105 transition cursor-pointer"
              >
                Build Your AI Agent
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 bg-white/[0.05] px-7 py-3.5 text-xs font-semibold text-white hover:bg-white/10 transition backdrop-blur-md cursor-pointer"
              >
                Talk to Nexivra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
