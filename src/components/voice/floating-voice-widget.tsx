"use client";

import React, { useState } from "react";
import { AiVoiceAgent } from "./ai-voice-agent";

export function FloatingVoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="AI Voice Assistant Widget" className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[92vw] max-w-md sm:w-[420px] shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 grid size-7 place-items-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition"
              title="Close Voice Agent"
            >
              x
            </button>
            <AiVoiceAgent compact={true} />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/40 hover:from-violet-500 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-200 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-white" />
        </span>

        <span className="flex items-center gap-2">
          <span>{isOpen ? "Close Voice Agent" : "Talk to Voice Agent"}</span>
        </span>
      </button>
    </aside>
  );
}
