import React, { useState, useEffect } from "react";
import { INITIAL_STATE, QuestionnaireState } from "./types";
import { LEAAudio } from "./utils/audio";
import { Landing } from "./components/Landing";
import { Questionnaire } from "./components/Questionnaire";
import { Valuation } from "./components/Valuation";
import { SafetyWarning } from "./components/SafetyWarning";
import { PaymentInfo } from "./components/PaymentInfo";
import { IdentityVerification } from "./components/IdentityVerification";
import { BonusOffer } from "./components/BonusOffer";
import { FinalConfirmation } from "./components/FinalConfirmation";
import { Ending } from "./components/Ending";
import { AdminPortal } from "./components/AdminPortal";

type Step =
  | "LANDING"
  | "QUESTIONNAIRE"
  | "VALUATION"
  | "WARNING"
  | "PAYMENT"
  | "IDENTITY"
  | "BONUS"
  | "CONFIRM"
  | "ENDING";

export default function App() {
  const [step, setStep] = useState<Step>("LANDING");
  const [formData, setFormData] = useState<QuestionnaireState>(INITIAL_STATE);
  const [calculatedOffer, setCalculatedOffer] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [globalMultiplier, setGlobalMultiplier] = useState(1);

  // Hidden admin access controls
  const [adminUnlocked, setAdminUnlocked] = useState(() => {
    try {
      return localStorage.getItem("lea_admin_unlocked") === "true";
    } catch {
      return false;
    }
  });
  const [secretClicks, setSecretClicks] = useState(0);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const handleSecretClick = () => {
    const nextClicks = secretClicks + 1;
    setSecretClicks(nextClicks);
    LEAAudio.playClick();

    if (nextClicks >= 5) {
      setSecretClicks(0);
      if (adminUnlocked) {
        // Toggle directly
        LEAAudio.playPaperRustle();
        setShowAdmin((prev) => !prev);
      } else {
        // Trigger verification
        LEAAudio.playBuzz();
        setShowPasscodeModal(true);
      }
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === "1349" || passcodeInput.trim().toLowerCase() === "admin") {
      LEAAudio.playStamp();
      setAdminUnlocked(true);
      setShowAdmin(true);
      setShowPasscodeModal(false);
      setPasscodeError(false);
      setPasscodeInput("");
      try {
        localStorage.setItem("lea_admin_unlocked", "true");
      } catch (err) {
        console.error(err);
      }
    } else {
      LEAAudio.playBuzz();
      setPasscodeError(true);
      setPasscodeInput("");
      setTimeout(() => setPasscodeError(false), 2000);
    }
  };

  const handleLock = () => {
    LEAAudio.playBuzz();
    setAdminUnlocked(false);
    setShowAdmin(false);
    try {
      localStorage.removeItem("lea_admin_unlocked");
    } catch (err) {
      console.error(err);
    }
  };

  // Global live count-up stats of sovereign lifespan forfeiture
  const [livesCounter, setLivesCounter] = useState(1349666);
  const [hoursCounter, setHoursCounter] = useState(58348910);
  const [userIp, setUserIp] = useState<string>("DETECTING IP...");

  useEffect(() => {
    const interval = setInterval(() => {
      // Occasional new forfeiture record with adjusted speed
      if (Math.random() > (0.6 / globalMultiplier)) {
        setLivesCounter((prev) => prev + Math.ceil(1 * (globalMultiplier / 2 || 1)));
      }
      // Rapid accumulation of liquidated hours globally with adjusted speed
      setHoursCounter((prev) => prev + Math.floor((1 + Math.random() * 9) * globalMultiplier));
    }, Math.max(80, 450 - (globalMultiplier * 15)));

    return () => clearInterval(interval);
  }, [globalMultiplier]);

  useEffect(() => {
    let active = true;
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (active && data && data.ip) {
          setUserIp(data.ip);
        }
      })
      .catch((err) => {
        console.error("Failed to detect public IP:", err);
        if (active) {
          setUserIp("10.23.4.149");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const changeStep = (newStep: Step) => {
    LEAAudio.playPaperRustle();
    setStep(newStep);
  };

  const handleUpdateFormData = (updates: Partial<QuestionnaireState>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleStart = () => {
    changeStep("QUESTIONNAIRE");
    // Start the satanic background soundtrack and screams throughout the site interaction
    LEAAudio.startMusic();
  };

  const handleQuestionnaireComplete = () => {
    changeStep("VALUATION");
  };

  const handleValuationComplete = (offer: number) => {
    setCalculatedOffer(offer);
    changeStep("WARNING");
  };

  const handleWarningAccept = () => {
    changeStep("PAYMENT");
  };

  const handlePaymentComplete = () => {
    changeStep("IDENTITY");
  };

  const handleIdentityVerified = () => {
    changeStep("BONUS");
  };

  const handleBonusComplete = (bonus: number) => {
    setBonusAmount(bonus);
    changeStep("CONFIRM");
  };

  const handleBonusSkip = () => {
    setBonusAmount(0);
    changeStep("CONFIRM");
  };

  const handleContractSigned = () => {
    // Save to local administrative database ledger upon submission
    try {
      const existingRaw = localStorage.getItem("lea_transactions");
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      const record = {
        id: `LEA-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        name: formData.paymentName || "Anonymous Mortal",
        occupation: formData.occupation || "Unspecified",
        yearsToSell: formData.yearsToSell || 10,
        totalPayout: calculatedOffer + bonusAmount,
        status: "REJECTED [CODE-1349]",
        reason: "Sovereign biological lifespan selling is illegal inside Sector III quadrants",
      };
      localStorage.setItem("lea_transactions", JSON.stringify([record, ...list]));
    } catch (e) {
      console.error("Local database error during covenant logging:", e);
    }
    changeStep("ENDING");
  };

  return (
    <main 
      id="desktop-desk"
      className="min-h-screen w-full bg-stone-200 bg-[radial-gradient(#d6c6b2_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center p-4 md:p-8 relative"
    >
      {/* Decorative desktop shadows or files in the margin */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-stone-500 space-y-1.5 z-40 select-none">
        <div 
          onClick={handleSecretClick}
          className="cursor-help hover:text-stone-400 active:text-stone-300 transition-colors"
          title="Terminal #1349"
        >
          GOVERNMENT SECTOR III // SECURE TERMINAL #1349
        </div>
        {adminUnlocked && (
          <button
            onClick={() => {
              LEAAudio.playClick();
              setShowAdmin((prev) => !prev);
            }}
            className="block px-2 py-1 bg-stone-900 border border-stone-950 rounded-sm text-stone-300 hover:text-red-500 hover:bg-stone-850 font-extrabold uppercase tracking-widest text-[8px] active:scale-95 transition-all cursor-pointer shadow-md animate-pulse"
          >
            🔑 [⌥ ADMINISTRATOR CONSOLE]
          </button>
        )}
      </div>

      {/* Lives Taken and Extracted Hours Count-up Widget */}
      <div className="absolute top-4 right-4 bg-stone-900 border border-stone-950 p-2.5 rounded shadow-lg font-mono text-[10px] text-stone-400 select-none text-right z-30 hidden md:block">
        <div className="text-red-500 font-extrabold uppercase tracking-widest text-[9px] border-b border-stone-800 pb-1 mb-1">
          ☠ SYSTEM FORFEITURE LOG
        </div>
        <div className="space-y-0.5">
          <div>
            LIVES TAKEN: <span className="text-red-400 font-black tracking-wider">{livesCounter.toLocaleString()}</span>
          </div>
          <div>
            HOURS EXTRACTED: <span className="text-red-400 font-black tracking-wider">{hoursCounter.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-2xl flex flex-col items-center justify-center py-6 gap-4">
        {/* Real-time Global LED Ledger - Responsive */}
        <div className="w-full max-w-xl bg-stone-900 border-2 border-stone-950 p-3 rounded-sm shadow-md font-mono text-[10px] flex flex-col sm:flex-row items-center justify-between gap-3 z-30 select-none border-t-4 border-t-red-700">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-stone-300 font-extrabold uppercase tracking-widest">GLOBAL FORFEITURE LEDGER</span>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1 font-black text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-bold">LIVES:</span>
              <span className="text-red-500 tracking-wider font-extrabold">{livesCounter.toLocaleString()}</span>
            </div>
            <div className="hidden sm:block w-px h-3 bg-stone-800" />
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-bold">HOURS:</span>
              <span className="text-red-500 animate-pulse tracking-wider font-extrabold">{hoursCounter.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
        {showAdmin ? (
          <AdminPortal
            onClose={() => setShowAdmin(false)}
            globalMultiplier={globalMultiplier}
            setGlobalMultiplier={setGlobalMultiplier}
            onLock={handleLock}
          />
        ) : (
          <>
            {step === "LANDING" && (
              <Landing onStart={handleStart} />
            )}

            {step === "QUESTIONNAIRE" && (
              <Questionnaire
                state={formData}
                onChange={handleUpdateFormData}
                onComplete={handleQuestionnaireComplete}
              />
            )}

            {step === "VALUATION" && (
              <Valuation
                state={formData}
                onContinue={handleValuationComplete}
              />
            )}

            {step === "WARNING" && (
              <SafetyWarning onAccept={handleWarningAccept} />
            )}

            {step === "PAYMENT" && (
              <PaymentInfo
                state={formData}
                onChange={handleUpdateFormData}
                onNext={handlePaymentComplete}
              />
            )}

            {step === "IDENTITY" && (
              <IdentityVerification
                state={formData}
                onChange={handleUpdateFormData}
                onNext={handleIdentityVerified}
              />
            )}

            {step === "BONUS" && (
              <BonusOffer
                calculatedOffer={calculatedOffer}
                onComplete={handleBonusComplete}
                onSkip={handleBonusSkip}
              />
            )}

            {step === "CONFIRM" && (
              <FinalConfirmation
                state={formData}
                calculatedOffer={calculatedOffer}
                bonusAmount={bonusAmount}
                onConfirm={handleContractSigned}
              />
            )}

            {step === "ENDING" && (
              <Ending />
            )}
          </>
        )}
      </div>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-stone-500 select-none text-right flex flex-col items-end">
        <div>TERMINAL IP: {userIp}</div>
        <div>LEA-TRUST-COMMISSION © 2026</div>
      </div>

      {showPasscodeModal && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="crt-screen w-full max-w-sm bg-stone-900 border-4 border-stone-800 text-[#a3352a] rounded-sm p-5 font-mono shadow-2xl relative">
            <div className="crt-scanline" />
            
            <div className="border-b-2 border-stone-800 pb-2 mb-4 text-center">
              <span className="font-extrabold text-[11px] uppercase tracking-widest text-red-500 block animate-pulse">
                ☣ RESTRICTED ACCESS AREA ☣
              </span>
              <span className="text-[9px] text-stone-500 font-bold block uppercase mt-0.5">
                DEED AUDITOR AUTHENTICATION
              </span>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-stone-400 font-bold uppercase block text-center">
                  Enter Secure Passkey
                </label>
                <input
                  type="password"
                  maxLength={10}
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                  }}
                  placeholder="••••"
                  className={`w-full bg-stone-950 border-2 text-center text-lg font-bold tracking-widest p-2 rounded-sm focus:outline-none focus:ring-0 ${
                    passcodeError
                      ? "border-red-600 text-red-600 animate-shake"
                      : "border-stone-800 text-red-500 focus:border-red-800"
                  }`}
                  autoFocus
                />
              </div>

              {passcodeError && (
                <div className="text-center font-bold text-[10px] text-red-600 uppercase tracking-tight animate-bounce">
                  ☒ ACCESS DENIED // INVALID AUTHORIZATION
                </div>
              )}

              <div className="text-[9px] text-stone-500 text-center font-serif italic max-w-[240px] mx-auto mt-2 leading-tight">
                * Security Hint: Key is stamped directly on your physical terminal margin.
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    LEAAudio.playClick();
                    setShowPasscodeModal(false);
                    setPasscodeInput("");
                    setPasscodeError(false);
                  }}
                  className="px-3 py-1.5 border border-stone-800 hover:bg-stone-850 text-stone-400 font-bold text-[10px] uppercase rounded-sm transition-colors cursor-pointer"
                >
                  [ABORT]
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-red-950/40 border border-red-700 hover:bg-red-900/30 text-red-500 font-bold text-[10px] uppercase rounded-sm transition-colors cursor-pointer"
                >
                  [CONFIRM]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
