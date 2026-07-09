import React, { useState } from "react";
import { LEAAudio } from "../utils/audio";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface BonusOfferProps {
  calculatedOffer: number;
  onComplete: (bonusAmount: number) => void;
  onSkip: () => void;
}

export const BonusOffer: React.FC<BonusOfferProps> = ({
  calculatedOffer,
  onComplete,
  onSkip,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [bonusAwarded, setBonusAwarded] = useState(false);

  const bonusValue = Math.floor(calculatedOffer * 0.15);

  const scanLogs = [
    "Initializing Camera Cathode Feed...",
    "Sweeping Biometric Face Geometry Mesh...",
    "Scanning Vital Essence (Fluorescent Level)...",
    "Measuring Pupil Procrastination Dilations...",
    "Verifying Eternal Soul Signature Match...",
    "BIOMETRIC INTEGRITY APPROVED"
  ];

  const handleScan = () => {
    setIsScanning(true);
    setScanStep(0);
    setBonusAwarded(false);
    LEAAudio.playBell();

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanLogs.length - 1) {
          clearInterval(interval);
          setBonusAwarded(true);
          setIsScanning(false);
          LEAAudio.playStamp();
          return scanLogs.length - 1;
        }
        LEAAudio.playClick();
        return prev + 1;
      }, 1000);
    });
  };

  const handleAcceptBonus = () => {
    LEAAudio.playStamp();
    onComplete(bonusValue);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      <BinderRings />
      <CoffeeStain style={{ bottom: "-10px", right: "-30px" }} />

      <GovernmentHeader title="OPTIONAL LIQUIDITY ENHANCEMENT" />

      {/* Retro Rubber Stamp */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-40">
        <RubberStamp text="BONUS STIMULUS" color="green" angle={9} />
      </div>

      <div className="space-y-5">
        <div className="border-b border-dashed border-stone-400 pb-2">
          <span className="font-mono text-xs text-stone-500 font-bold uppercase">
            FORM LEA-BONUS-A // MORTAL ESSENCE SUPPLEMENT
          </span>
        </div>

        <div className="text-center space-y-2">
          <h3 className="font-serif text-lg font-black text-stone-900 uppercase">
            WANT AN EXTRA 15% ON YOUR NET CONVERSION?
          </h3>
          <p className="font-serif text-xs md:text-sm text-stone-700 leading-relaxed max-w-lg mx-auto">
            Authorize a short, automated facial-vibration integrity audit. We will capture your biometric life emission signature to verify organic potential, awarding an additional:
          </p>
          <div className="font-serif text-2xl font-black text-emerald-800 tracking-wider">
            +${bonusValue.toLocaleString()} BONUS CASH
          </div>
        </div>

        {/* Green Phosphor CRT Screen Face Scanner Frame */}
        <div className="crt-screen w-full h-[220px] rounded relative flex flex-col justify-between p-3 select-none">
          <div className="crt-scanline" />
          
          {/* Top telemetry text header */}
          <div className="flex justify-between font-mono text-[9px] text-emerald-500/80 z-10">
            <span>LEA SOUL-CAM // DECEASED_REDUCTION_PREV</span>
            <span className="animate-pulse">● REC [60fps]</span>
          </div>

          {/* Central facial matrix scanning box */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-36 h-36 border border-emerald-500/30 rounded-full flex items-center justify-center animate-flicker">
              {/* Scan mesh grid contours */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-emerald-500/60 animate-[scanline-roll_2s_ease-in-out_infinite]" />
              
              {/* Retro stylized wireframe face outline */}
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-500/50" stroke="currentColor" fill="none">
                <path d="M 50,15 C 30,15 25,45 25,60 C 25,75 35,85 50,85 C 65,85 75,75 75,60 C 75,45 70,15 50,15 Z" strokeWidth="1" />
                {/* Eyes mesh */}
                <circle cx="38" cy="45" r="4" strokeWidth="1" />
                <circle cx="62" cy="45" r="4" strokeWidth="1" />
                <path d="M 32,40 Q 38,36 44,40 M 56,40 Q 62,36 68,40" strokeWidth="0.8" />
                {/* Mouth mesh */}
                <path d="M 40,65 Q 50,70 60,65" strokeWidth="1" />
                {/* Crosshairs */}
                <path d="M 50,5 L 50,95 M 5,50 L 95,50" strokeWidth="0.5" strokeDasharray="3,3" />
              </svg>

              {/* Glowing crosshair corner marks */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-500" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-emerald-500" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-emerald-500" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-500" />
            </div>
          </div>

          {/* Scrolling terminal logs */}
          <div className="bg-stone-950/90 border border-emerald-500/20 rounded p-2 text-[10px] font-mono text-emerald-400 h-16 overflow-y-auto space-y-0.5 z-10 select-text">
            {isScanning ? (
              <div className="space-y-0.5">
                {scanLogs.slice(0, scanStep + 1).map((log, idx) => (
                  <div key={idx} className="flex gap-1.5">
                    <span className="text-emerald-600 font-bold">
                      {idx < scanStep ? "✓" : "❯"}
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            ) : bonusAwarded ? (
              <div className="text-center text-emerald-300 font-black tracking-widest pt-1.5 animate-pulse">
                +++ BIOMETRIC SOUL VERIFIED: +${bonusValue.toLocaleString()} RESERVED +++
              </div>
            ) : (
              <div className="text-stone-500 text-center pt-2">
                [ CAMERA STANDBY // AUTHORIZATION REQUIRED ]
              </div>
            )}
          </div>
        </div>

        {/* Verification controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          {!isScanning && !bonusAwarded ? (
            <>
              <button
                onClick={handleScan}
                className="w-full sm:w-auto px-6 py-3.5 btn-vintage border-2 border-stone-950 text-stone-900 font-black rounded-sm bg-stone-200"
              >
                START BIOMETRIC FACE SCAN
              </button>
              <button
                onClick={onSkip}
                className="w-full sm:w-auto px-4 py-2 text-stone-500 font-mono text-xs hover:underline uppercase"
              >
                No Thanks, skip bonus
              </button>
            </>
          ) : bonusAwarded ? (
            <button
              onClick={handleAcceptBonus}
              className="w-full max-w-sm px-6 py-4 btn-vintage border-2 border-stone-950 text-stone-900 font-black rounded-sm bg-emerald-100"
            >
              ADD ${bonusValue.toLocaleString()} TO DEED AGREEMENT &rarr;
            </button>
          ) : (
            <div className="font-mono text-xs text-stone-500 animate-pulse uppercase tracking-wider">
              Biometric Soul Camera Scanning... Keep Face Position Centered
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
