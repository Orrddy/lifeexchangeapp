import { useState, useEffect } from "react";
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

  // Global live count-up stats of sovereign lifespan forfeiture
  const [livesCounter, setLivesCounter] = useState(1349666);
  const [hoursCounter, setHoursCounter] = useState(58348910);

  useEffect(() => {
    const interval = setInterval(() => {
      // Occasional new forfeiture record
      if (Math.random() > 0.6) {
        setLivesCounter((prev) => prev + 1);
      }
      // Rapid accumulation of liquidated hours globally
      setHoursCounter((prev) => prev + Math.floor(1 + Math.random() * 9));
    }, 450);

    return () => clearInterval(interval);
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
    changeStep("ENDING");
  };

  return (
    <main 
      id="desktop-desk"
      className="min-h-screen w-full bg-stone-200 bg-[radial-gradient(#d6c6b2_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center p-4 md:p-8 relative"
    >
      {/* Decorative desktop shadows or files in the margin */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-stone-500 select-none space-y-1">
        <div>GOVERNMENT SECTOR III // SECURE TERMINAL #1349</div>
        <div className="text-[#a3352a] font-bold">SOVEREIGN MORTALITY FORFEITURE REGISTER</div>
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
          <div className="flex flex-row items-center gap-4 font-black text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-bold">LIVES:</span>
              <span className="text-red-500 tracking-wider font-extrabold">{livesCounter.toLocaleString()}</span>
            </div>
            <div className="w-px h-3 bg-stone-800" />
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-bold">HOURS:</span>
              <span className="text-red-500 animate-pulse tracking-wider font-extrabold">{hoursCounter.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
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
      </div>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-stone-500 select-none">
        LEA-TRUST-COMMISSION © 2026
      </div>
    </main>
  );
}
