import React, { useState } from "react";
import { LEAAudio } from "../utils/audio";
import { WaxSeal, CoffeeStain, RubberStamp } from "./RetroWidgets";

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [crtActive, setCrtActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleCrtToggle = () => {
    LEAAudio.playClick();
    if (!crtActive) {
      LEAAudio.startCrtHum();
      setCrtActive(true);
    } else {
      LEAAudio.stopCrtHum();
      setCrtActive(false);
    }
  };

  const handleStart = () => {
    LEAAudio.playStamp();
    LEAAudio.playPaperRustle();
    setIsPressed(true);
    setTimeout(() => {
      LEAAudio.playBell();
      onStart();
    }, 450);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-6 p-6 md:p-10 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm text-stone-900 select-none overflow-hidden">
      {/* Coffee stains & paper aging */}
      <CoffeeStain style={{ top: "-10px", left: "-20px" }} />
      <CoffeeStain style={{ bottom: "-30px", right: "-10px" }} />
      
      {/* Filing Folder Tab */}
      <div className="absolute -top-1 left-8 px-6 py-2 bg-stone-800 text-stone-200 font-mono text-[10px] uppercase font-bold tracking-widest rounded-b-md shadow-md">
        FOLDER: LEA-A7182-SECURE
      </div>

      {/* Retro Red Stamp */}
      <div className="absolute top-12 right-6">
        <RubberStamp text="CLASSIFIED" color="red" angle={12} />
      </div>

      <div className="mt-6 border-2 border-stone-800 p-4 md:p-6 bg-[#f0e4c5] shadow-inner relative">
        {/* Brass corner brackets in retro styled CSS */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-stone-700" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-stone-700" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-stone-700" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-stone-700" />

        <div className="text-center space-y-4">
          <h2 className="font-mono text-xs text-stone-600 font-bold tracking-widest uppercase">
            Federal Ministry of Biological Liquidity
          </h2>
          
          <h1 className="font-serif text-3xl md:text-4xl font-black text-stone-950 tracking-normal leading-tight glitch-text">
            LIFESPAN EXCHANGE <br /> AUTHORITY
          </h1>
          
          <div className="h-[2px] bg-stone-800 max-w-xs mx-auto my-3" />
          
          <p className="font-serif italic text-lg md:text-xl text-stone-800">
            "Turning Time Into Liquidity Since 1349."
          </p>
        </div>
      </div>

      {/* Central wax seal and corporate sigil placement */}
      <div className="my-8 flex flex-col items-center justify-center space-y-2">
        <WaxSeal />
        <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest">
          Sovereign Seal of Eternal Forfeiture
        </span>
      </div>

      <div className="space-y-4 text-center">
        <p className="font-serif text-sm text-stone-700 leading-relaxed max-w-sm mx-auto">
          Are you experiencing unexpected cash-flow deficits? Is your mortal duration longer than your bank balance? Sell your redundant years to the sovereign reserve for immediate capital injection.
        </p>

        {/* Small disclaimer requested */}
        <p className="font-mono text-[10px] text-stone-500 italic max-w-xs mx-auto">
          * All transactions are permanent, probably. Non-negotiable under State Ledger Code §1349.
        </p>

        <div className="pt-4 pb-2">
          <button
            id="begin-valuation-btn"
            onClick={handleStart}
            disabled={isPressed}
            className={`w-full max-w-xs px-8 py-4 text-sm md:text-base font-extrabold btn-vintage text-stone-900 border-2 border-stone-900 rounded-sm ${
              isPressed ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {isPressed ? "OPENING INKWELL..." : "Begin Valuation"}
          </button>
        </div>
      </div>

      {/* Vintage control panel footer for Sound and CRT humming */}
      <div className="mt-8 border-t border-stone-300 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-stone-500 gap-3">
        <div>LEA DIRECTIVE 44-A // ARCHIVAL COPY</div>
        
        {/* CRT Hum switch */}
        <button
          onClick={handleCrtToggle}
          className={`flex items-center gap-2 px-3 py-1.5 border border-stone-400 rounded hover:bg-stone-200 transition-colors ${
            crtActive ? "bg-stone-300 border-stone-600 text-stone-900 font-bold" : ""
          }`}
        >
          <span className={`inline-block w-2 h-2 rounded-full ${crtActive ? "bg-emerald-600 animate-pulse" : "bg-stone-400"}`} />
          CRT AMBIENCE: {crtActive ? "ACTIVE" : "OFF"}
        </button>
      </div>
    </div>
  );
};
