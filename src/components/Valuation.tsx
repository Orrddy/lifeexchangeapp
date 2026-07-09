import React, { useState, useEffect } from "react";
import { LEAAudio } from "../utils/audio";
import { QuestionnaireState, QUIZ_QUESTIONS } from "../types";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface ValuationProps {
  state: QuestionnaireState;
  onContinue: (calculatedOffer: number) => void;
}

export const Valuation: React.FC<ValuationProps> = ({ state, onContinue }) => {
  const [calculationStep, setCalculationStep] = useState(0);
  const [tickerValue, setTickerValue] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);

  const steps = [
    "Calculating Biological Asset Potency...",
    "Assessing Moral Fiber & Integrity...",
    "Querying Soul Market Spot Price...",
    "Consulting Ancient Overlord Ledger (Avesta-IV)...",
    "Determining Temporal Liquidity Coefficients...",
    "VALUATION COMPLETE"
  ];

  // Calculate customized final offer
  // Base is $50,000 per year sold
  const baseValue = state.yearsToSell * 50000;
  
  // Calculate modifier sum from all questionnaire selections
  let modifiersSum = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    const selectedLabel = state[q.id] as string;
    const optionObj = q.options.find((opt) => opt.label === selectedLabel);
    if (optionObj) {
      modifiersSum += optionObj.modifier;
    }
  });

  // Calculate itemized ridiculous deductions
  const curseFee = 13666;
  const soulTax = 8500 + (state.yearsToSell * 120);
  const delayCharge = 14200;
  const destinyAdj = modifiersSum < 0 ? Math.abs(modifiersSum) * 0.4 : 12000;
  const cosmicInflation = 24500;

  const totalDeductions = curseFee + soulTax + delayCharge + destinyAdj + cosmicInflation;
  
  // Custom final payout formula
  const finalOffer = Math.max(12000, baseValue + modifiersSum - totalDeductions);
  const perYearValue = Math.floor(finalOffer / state.yearsToSell);

  // Audio & Ticker animations
  useEffect(() => {
    if (calculationStep < steps.length - 1) {
      const timer = setTimeout(() => {
        LEAAudio.playClick();
        setCalculationStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Trigger invoice render
      LEAAudio.playBell();
      setShowInvoice(true);
      
      // Animated count-up for final value
      let start = 0;
      const end = finalOffer;
      const duration = 2000; // ms
      const stepTime = Math.abs(Math.floor(duration / 60));
      
      const timer = setInterval(() => {
        LEAAudio.playClick();
        start += Math.floor(end / 40);
        if (start >= end) {
          setTickerValue(end);
          LEAAudio.playStamp();
          clearInterval(timer);
        } else {
          setTickerValue(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [calculationStep]);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      <BinderRings />
      <CoffeeStain style={{ bottom: "-20px", left: "20px" }} />

      <GovernmentHeader title="STATEMENT OF TEMPORAL VALUE" />

      {/* Retro Status indicator of audit */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-45">
        <RubberStamp text="OFFER PENDING" color="purple" angle={7} />
      </div>

      <div className="space-y-6">
        {/* Animated Calculation logs */}
        <div className="font-mono text-xs bg-stone-950 text-red-600 p-4 rounded-sm border-2 border-stone-800 shadow-inner space-y-1.5">
          <div className="text-[10px] text-stone-500 border-b border-stone-900 pb-1 mb-2 uppercase tracking-widest flex justify-between">
            <span>Audit Terminals: Active // LEA-OS v3.49</span>
            <span className="text-red-700 font-bold animate-pulse">● OCCULT SYNC</span>
          </div>
          {steps.slice(0, calculationStep + 1).map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-red-800 font-black">
                {idx < calculationStep ? "✓" : "❯"}
              </span>
              <span className={idx === calculationStep && idx < steps.length - 1 ? "animate-pulse" : ""}>
                {step}
              </span>
            </div>
          ))}
          {calculationStep < steps.length - 1 && (
            <div className="h-4 w-full flex items-center mt-2">
              <span className="inline-block w-2.5 h-4 bg-red-700 animate-pulse" />
            </div>
          )}
        </div>

        {/* Invoice Receipt Panel */}
        {showInvoice && (
          <div className="border border-stone-500 bg-[#f9f5e8] p-5 rounded-sm shadow-md space-y-4 relative animate-flicker">
            {/* Stamp showing approval */}
            {tickerValue === finalOffer && (
              <div className="absolute top-12 right-12 pointer-events-none z-10 animate-stamp">
                <RubberStamp text="APPROVED VALUE" color="green" angle={-10} />
              </div>
            )}

            <div className="text-center font-serif font-black text-stone-800 text-lg border-b border-dashed border-stone-400 pb-2">
              ESTIMATED CONVERSION MEMORANDUM
            </div>

            {/* Calculations layout */}
            <table className="w-full font-mono text-xs md:text-sm text-stone-700">
              <tbody>
                <tr className="border-b border-stone-200">
                  <td className="py-2 font-bold text-stone-900">Gross Asset Base ({state.yearsToSell} yrs @ $50k)</td>
                  <td className="py-2 text-right text-emerald-700 font-bold">+${baseValue.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-stone-200">
                  <td className="py-2">Lifestyle Adjustments (Audit Balance)</td>
                  <td className={`py-2 text-right ${modifiersSum >= 0 ? "text-emerald-700" : "text-[#8b3a2b]"}`}>
                    {modifiersSum >= 0 ? "+" : ""}${modifiersSum.toLocaleString()}
                  </td>
                </tr>
                
                {/* Deductions group */}
                <tr>
                  <td className="py-2 text-stone-500 italic" colSpan={2}>Authorized Administrative Adjustments:</td>
                </tr>
                <tr className="text-[11px] text-[#8b3a2b] pl-4">
                  <td className="py-1 pl-4">• Administrative Curse Fee</td>
                  <td className="py-1 text-right">-${curseFee.toLocaleString()}</td>
                </tr>
                <tr className="text-[11px] text-[#8b3a2b] pl-4">
                  <td className="py-1 pl-4">• Soul Processing Surtax</td>
                  <td className="py-1 text-right">-${soulTax.toLocaleString()}</td>
                </tr>
                <tr className="text-[11px] text-[#8b3a2b] pl-4">
                  <td className="py-1 pl-4">• Bureaucratic Delay Charge</td>
                  <td className="py-1 text-right">-${delayCharge.toLocaleString()}</td>
                </tr>
                <tr className="text-[11px] text-[#8b3a2b] pl-4">
                  <td className="py-1 pl-4">• Destiny Adjustment Deductible</td>
                  <td className="py-1 text-right">-${destinyAdj.toLocaleString()}</td>
                </tr>
                <tr className="text-[11px] text-[#8b3a2b] pl-4 border-b border-stone-200">
                  <td className="py-1 pl-4 pb-2">• Cosmic Inflation Correction</td>
                  <td className="py-1 text-right pb-2">-${cosmicInflation.toLocaleString()}</td>
                </tr>

                {/* Final calculated total */}
                <tr className="text-stone-900 font-black border-b-4 border-double border-stone-800 text-sm md:text-base">
                  <td className="py-3">ESTIMATED NET PAYOUT:</td>
                  <td className="py-3 text-right text-[#8b3a2b] font-serif font-black">
                    ${tickerValue.toLocaleString()}
                  </td>
                </tr>
                <tr className="text-[10px] text-stone-500">
                  <td className="py-1" colSpan={2}>
                    Equivalent to approx. <span className="font-bold text-stone-800">${perYearValue.toLocaleString()} / year</span> sacrificed.
                  </td>
                </tr>
              </tbody>
            </table>

            {tickerValue === finalOffer && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => {
                    LEAAudio.playStamp();
                    onContinue(finalOffer);
                  }}
                  className="w-full max-w-sm px-6 py-3.5 btn-vintage border-2 border-stone-950 font-black text-center text-sm md:text-base text-stone-900 bg-stone-200"
                >
                  Accept Valuation & Proceed &rarr;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
