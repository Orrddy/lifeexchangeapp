import React, { useState, useEffect } from "react";
import { LEAAudio } from "../utils/audio";
import { RubberStamp } from "./RetroWidgets";

export const Ending: React.FC = () => {
  const [deniedVisible, setDeniedVisible] = useState(true);
  const [stampAnimation, setStampAnimation] = useState(false);
  const [adviceVisible, setAdviceVisible] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  // Satirical credits list
  const credits = [
    { role: "TEMPORAL AUTHORITY BOARD", name: "Sovereign Board of 1349" },
    { role: "CHIEF SOUL HARVESTER", name: "Overlord S. Avesta-IV" },
    { role: "DEPARTMENT OF CHRONO-DEVIATION", name: "Commission on Third Moon Collapses" },
    { role: "LEFT SOCK RETRIEVAL TEAM", name: "Unit 44-A (Understaffed)" },
    { role: "GAS STATION SUSHI AUDITING", name: "The Department of Digestive Hallucinations" },
    { role: "MONDAY MORNING ANXIETY COMPILER", name: "Corporate Familiar Division" },
    { role: "COGNITIVE SUNSET MONITOR", name: "The Mid-Distance Gazing Advisory" },
    { role: "TERMS & CONDITIONS DEVIL", name: "The Binding Contract Syndicate" },
    { role: "MINION MEME CONSPIRATOR", name: "Mortal Family Chat Survivors" },
    { role: "COFFEE STAIN COORDINATOR", name: "Leaking Mug Division" },
    { role: "SYNTHESIZER OSCILLATOR HUMMER", name: "Web Audio Carrier Wave Engine v3" },
    { role: "HUMAN WELLBEING COVENANT", name: "Your Conscious Self" }
  ];

  useEffect(() => {
    // Initial denial stamp slam and buzz sound
    setTimeout(() => {
      LEAAudio.playStamp();
      LEAAudio.playBuzz();
      setStampAnimation(true);
    }, 150);

    // After 4.5 seconds, fade out the denial paperwork and fade in the real-world wisdom & synth soundtrack!
    const timer = setTimeout(() => {
      setDeniedVisible(false);
      setTimeout(() => {
        setAdviceVisible(true);
        // Start playing the gorgeous procedural retro synth loop!
        LEAAudio.startMusic();
        setIsMusicOn(true);
      }, 500);
    }, 5500);

    return () => {
      clearTimeout(timer);
      LEAAudio.stopMusic();
    };
  }, []);

  const handleMusicToggle = () => {
    LEAAudio.playClick();
    if (isMusicOn) {
      LEAAudio.stopMusic();
      setIsMusicOn(false);
    } else {
      LEAAudio.startMusic();
      setIsMusicOn(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-4 min-h-[500px] flex items-center justify-center relative overflow-hidden">
      
      {/* 1. Satirical DENIAL STAMP paper layout */}
      {deniedVisible && (
        <div className={`w-full bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm p-6 md:p-10 text-stone-900 transition-all duration-700 select-none ${
          stampAnimation ? "animate-shake" : ""
        }`}>
          <div className="border-2 border-stone-800 p-6 bg-[#eedfb9]/10 relative flex flex-col justify-between min-h-[380px]">
            {/* Ink stamps and markings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {stampAnimation && (
                <div className="animate-stamp transform scale-150 border-8 border-red-800 text-red-800 font-stamp text-4xl md:text-5xl tracking-widest font-black uppercase rounded-lg px-6 py-4 bg-red-100/40 opacity-95">
                  TRANSACTION DENIED
                </div>
              )}
            </div>

            <div className="text-center space-y-4">
              <span className="font-mono text-[9px] text-stone-500 font-bold uppercase tracking-wider block">
                Official Ledger Incident Log // Section §44-A
              </span>
              <div className="h-[1px] bg-stone-300 max-w-xs mx-auto" />
              <h1 className="font-serif text-2xl font-black text-stone-950 uppercase mt-2">
                TEMPORAL EXCHANGE DENIED
              </h1>
            </div>

            {/* Satirical error specifications */}
            <div className="p-4 bg-stone-100/50 border border-stone-400 rounded-sm font-mono text-xs md:text-sm text-stone-800 space-y-3 mt-6 z-10">
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="font-bold">STATUS REPORT:</span>
                <span className="text-[#8b3a2b] font-bold">REJECTED [CODE-1349]</span>
              </div>
              <p className="leading-relaxed">
                <strong>REASON:</strong> "Mortal human lifespan harvesting is strictly prohibited inside this quadrant of the galactic grid. Lifespan trading has been illegal since the collapse of the Third Moon under LEA Directive 44-A."
              </p>
              <div className="text-[10px] text-stone-500 italic mt-2">
                * Ledger Reference: Avesta-IV ancient codex, Page 912, Line 4.
              </div>
            </div>

            <div className="text-center pt-8">
              <span className="font-mono text-[10px] text-stone-400 animate-pulse">
                WAITING FOR SECTOR SYNC...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Heartwarming comforting Advice Screen with phosphor-green CRT Credits roll */}
      {adviceVisible && (
        <div className="w-full bg-[#121c13] border-4 border-stone-800 shadow-2xl rounded-sm p-6 md:p-8 text-emerald-400 select-none animate-flicker crt-screen">
          <div className="crt-scanline" />

          {/* Core Comfort Message Box */}
          <div className="space-y-6 text-center pt-4 relative z-20">
            <h2 className="font-serif text-3xl font-black tracking-normal text-emerald-300 animate-[text-shadow-pulse_3s_infinite]">
              CONGRATULATIONS.
            </h2>

            <div className="h-[2px] bg-emerald-800/40 max-w-xs mx-auto" />

            <div className="font-mono text-xs md:text-sm leading-relaxed text-emerald-100 max-w-md mx-auto space-y-4">
              <p>
                If someone really offered to buy your lifespan on the internet, you probably shouldn't accept. Your years are worth far more than any digital currency or ledger deposit.
              </p>
              <p className="text-emerald-300 font-bold text-sm md:text-base">
                Go drink some water, call someone you care about, and enjoy the beautiful time you've got.
              </p>
            </div>

            {/* Vintage Audio Console Dial */}
            <div className="flex justify-center items-center gap-4 pt-2">
              <div className="p-3 border border-emerald-500/20 bg-stone-950/80 rounded flex items-center gap-3">
                <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-widest">
                  Archival Soundtrack:
                </span>
                <button
                  onClick={handleMusicToggle}
                  className={`px-3 py-1 font-mono text-[10px] font-bold border rounded transition-colors ${
                    isMusicOn
                      ? "bg-emerald-500 text-stone-950 border-emerald-400 font-black animate-pulse"
                      : "bg-stone-900 text-emerald-600 border-emerald-800/40"
                  }`}
                >
                  {isMusicOn ? "■ PAUSE MUSIC" : "▶ PLAY MUSIC"}
                </button>
              </div>
            </div>
          </div>

          {/* CRT scrolling credits ticker */}
          <div className="mt-8 pt-4 border-t border-emerald-800/30 h-32 overflow-hidden relative z-10">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#121c13] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#121c13] to-transparent z-10" />
            
            {/* Scrolling track */}
            <div className="font-mono text-[10px] uppercase space-y-3 pt-4 text-center animate-[scanline-roll_25s_linear_infinite]">
              <div className="text-emerald-500 font-black tracking-widest text-[11px] mb-2">
                --- CREDIT ROLL // AUTHORITY OF 1349 ---
              </div>
              {credits.map((c, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-emerald-600/70 font-bold">{c.role}</div>
                  <div className="text-emerald-300 font-extrabold">{c.name}</div>
                </div>
              ))}
              <div className="pt-4 text-emerald-600/50">
                © {new Date().getFullYear()} LIFESPAN EXCHANGE AUTHORITY. ALL RIGHTS RESERVED WORLDWIDE.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
