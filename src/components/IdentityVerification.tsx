import React, { useState } from "react";
import { LEAAudio } from "../utils/audio";
import { QuestionnaireState } from "../types";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface IdentityVerificationProps {
  state: QuestionnaireState;
  onChange: (updates: Partial<QuestionnaireState>) => void;
  onNext: () => void;
}

export const IdentityVerification: React.FC<IdentityVerificationProps> = ({
  state,
  onChange,
  onNext,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanDone, setScanDone] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const docTypes = [
    { value: "passport", label: "International Soul Passport (Form-70)" },
    { value: "license", label: "Mortal Driver's License" },
    { value: "id", label: "Sovereign Certificate of Existence" }
  ];

  const triggerScan = (name: string) => {
    setIsScanning(true);
    setScanProgress(0);
    setScanDone(false);
    setFileName(name || "DEED_DOC_MORTAL.PDF");

    // Click sound at start
    LEAAudio.playClick();

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanDone(true);
          LEAAudio.playStamp();
          return 100;
        }
        LEAAudio.playClick();
        return prev + 10;
      });
    }, 300);

    // Keep active scan ticking hum
    LEAAudio.playBell();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      triggerScan(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      triggerScan(e.target.files[0].name);
    }
  };

  const handleMockClick = () => {
    triggerScan("SOVEREIGN_REDEEMABLE_ID_SIGIL.PDF");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      <BinderRings />
      <CoffeeStain style={{ top: "30%", left: "40px" }} />

      <GovernmentHeader title="TEMPORAL CREDENTIAL VERIFICATION" />

      {/* Retro rubber stamp */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-40">
        <RubberStamp text="ID-REQUIRED" color="red" angle={-8} />
      </div>

      <div className="space-y-6">
        <div className="border-b border-dashed border-stone-400 pb-2">
          <span className="font-mono text-xs text-stone-500 font-bold uppercase">
            SECTION IV: PROOF OF SELF-OWNERSHIP
          </span>
        </div>

        <p className="font-serif text-sm text-stone-700 leading-relaxed">
          To comply with the <strong>Temporal Theft Prevention Act of 1702</strong>, we must verify that you are the lawful owner of the years you are seeking to liquidate. Selling another mortal's lifespan is punishable by up to three consecutive re-incarnations in customer service roles.
        </p>

        {/* Doc Type Selector */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] text-stone-600 font-extrabold uppercase">
            Select Credential Asset Type:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {docTypes.map((t) => {
              const isSelected = state.verifiedDocType === t.value;
              return (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => {
                    LEAAudio.playClick();
                    onChange({ verifiedDocType: t.value });
                  }}
                  className={`p-3 text-center font-mono text-[11px] font-bold border rounded transition-all ${
                    isSelected
                      ? "bg-stone-900 text-white border-stone-950 font-bold shadow-md"
                      : "bg-[#eedfb9]/30 hover:bg-[#eedfb9]/70 text-stone-800 border-stone-400"
                  }`}
                >
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drag and Drop Scan Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded p-6 flex flex-col items-center justify-center min-h-[180px] transition-all ${
            dragActive
              ? "border-[#8b3a2b] bg-[#8b3a2b]/5"
              : "border-stone-400 bg-[#fbf8ee]/50 hover:bg-[#fbf8ee]"
          }`}
        >
          {/* Neon laser line effect when scanning */}
          {isScanning && (
            <div className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-[scanline-roll_2.5s_ease-in-out_infinite] z-20" />
          )}

          {!isScanning && !scanDone ? (
            <div className="text-center space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 text-stone-600 mx-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4-4-4 4M12 8v8" />
              </svg>
              <div className="space-y-1">
                <p className="font-mono text-xs text-stone-700 font-bold">
                  Drag & Drop official credential paper files here
                </p>
                <p className="font-mono text-[10px] text-stone-500 italic">
                  Supports .PDF, .SOUL, or .PNG (Max 44 MB)
                </p>
              </div>
              <div>
                <label className="px-4 py-2 text-xs font-black btn-vintage border border-stone-800 rounded-sm cursor-pointer inline-block">
                  SELECT FILE
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                  />
                </label>
                <span className="mx-2 font-mono text-[10px] text-stone-400">or</span>
                <button
                  type="button"
                  onClick={handleMockClick}
                  className="px-4 py-2 text-xs font-black btn-vintage border border-stone-800 rounded-sm bg-stone-300"
                >
                  AUTOMATED SECURE SCAN
                </button>
              </div>
            </div>
          ) : isScanning ? (
            <div className="text-center space-y-3 font-mono">
              <div className="text-xs text-emerald-700 font-bold uppercase animate-pulse">
                SCALPEL LASER SCANNING... {scanProgress}%
              </div>
              {/* Progress bar vintage style */}
              <div className="w-64 h-3 bg-stone-200 border border-stone-400 rounded-full mx-auto overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <div className="text-[10px] text-stone-500 italic animate-pulse">
                Reading moral watermark signature... Please do not move the cursor.
              </div>
            </div>
          ) : (
            /* Scanning completed report details */
            <div className="w-full text-left font-mono text-xs space-y-2.5 p-4 bg-emerald-950/5 border border-emerald-800/20 rounded-sm">
              <div className="flex justify-between border-b border-dashed border-emerald-800/30 pb-1.5">
                <span className="text-emerald-800 font-black">SCAN SUCCESS // SECURE DATA RETRIEVED</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase">FILE: {fileName}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700">
                <div>
                  <span className="font-bold text-stone-900">IDENTITY REFERENCE:</span> HUMAN_CARBON_MORTAL
                </div>
                <div>
                  <span className="font-bold text-stone-900">MORAL ALIGNMENT:</span> FRIGHTENED CYNIC
                </div>
                <div>
                  <span className="font-bold text-stone-900">TEMPORAL INTEGRITY:</span> STABLE ASSET (LEVEL 4)
                </div>
                <div>
                  <span className="font-bold text-stone-900">AUTHENTICITY SIGNATURE:</span> SOUL_AUTHENTICATED_1349
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-800/20 text-center">
                <button
                  type="button"
                  onClick={handleMockClick}
                  className="font-mono text-[10px] text-[#8b3a2b] font-bold hover:underline"
                >
                  RE-SCAN DOCUMENT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Button footer */}
        <div className="flex justify-between items-center pt-4 border-t border-stone-300">
          <span className="font-mono text-[10px] text-stone-500">
            State Biometric Office // Ledger Secure ID Verification (V-44)
          </span>
          <button
            onClick={() => {
              if (!scanDone) {
                LEAAudio.playBuzz();
                return;
              }
              onNext();
            }}
            disabled={!scanDone}
            className={`px-6 py-3.5 btn-vintage border-2 border-stone-950 font-black text-xs md:text-sm ${
              scanDone ? "text-stone-900" : "text-stone-400 opacity-50 cursor-not-allowed"
            }`}
          >
            CONFIRM CREDENTIAL & CONTINUE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
