import React, { useState } from "react";
import { LEAAudio } from "../utils/audio";
import { QuestionnaireState, QUIZ_QUESTIONS, OCCUPATIONS } from "../types";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface QuestionnaireProps {
  state: QuestionnaireState;
  onChange: (updates: Partial<QuestionnaireState>) => void;
  onComplete: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ state, onChange, onComplete }) => {
  // Navigation Steps:
  // Step 0: Occupation & Years To Sell
  // Step 1 to N: QUIZ_QUESTIONS index (1 to QUIZ_QUESTIONS.length)
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = QUIZ_QUESTIONS.length + 1; // Step 0 + questions

  const isCurrentStepCompleted = (() => {
    if (currentStep === 0) {
      return state.occupation !== "";
    } else {
      const qIndex = currentStep - 1;
      const q = QUIZ_QUESTIONS[qIndex];
      return (state[q.id] as string) !== "";
    }
  })();

  const handleOptionSelect = (key: keyof QuestionnaireState, value: string) => {
    LEAAudio.playClick();
    onChange({ [key]: value });
  };

  const handleNext = () => {
    if (!isCurrentStepCompleted) {
      LEAAudio.playBuzz();
      return;
    }
    if (currentStep < totalSteps - 1) {
      LEAAudio.playPaperRustle();
      setCurrentStep(currentStep + 1);
    } else {
      LEAAudio.playStamp();
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      LEAAudio.playPaperRustle();
      setCurrentStep(currentStep - 1);
    }
  };

  // Helper to find which section we are in to highlight index tabs
  const getSectionName = () => {
    if (currentStep === 0) return "Section A: Demographics";
    const qIndex = currentStep - 1;
    return `Section B: ${QUIZ_QUESTIONS[qIndex].section}`;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      {/* Binder rings and vintage stains */}
      <BinderRings />
      <CoffeeStain style={{ top: "40%", right: "-60px" }} />

      {/* Retro Stamp indicating Audit state */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-50 z-10">
        <RubberStamp text="AUDIT IN PROGRESS" color="blue" angle={-5} />
      </div>

      {/* Official Government Header */}
      <GovernmentHeader title={getSectionName()} />

      {/* Paper Index Tabs at the top right - simplified for shorter flow */}
      <div className="absolute top-28 right-0 flex flex-col gap-1.5 z-20">
        {["A: Demo", "B: Debits", "C: Vitals"].map((label, idx) => {
          const isActive =
            (idx === 0 && currentStep === 0) ||
            (idx === 1 && currentStep >= 1 && currentStep <= 4) ||
            (idx === 2 && currentStep === 5);

          return (
            <div
              key={label}
              className={`px-3 py-1 font-mono text-[8px] uppercase font-bold border-l border-y border-stone-800 rounded-l shadow-sm transition-all duration-200 ${
                isActive
                  ? "bg-stone-800 text-[#f6efe0] translate-x-0 font-black"
                  : "bg-stone-300 text-stone-600 translate-x-1 hover:translate-x-0.5"
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Main Form content paper area */}
      <div className="min-h-[380px] flex flex-col justify-between mt-4">
        {/* Step 0: Occupation and Years To Sell */}
        {currentStep === 0 ? (
          <div className="space-y-6">
            <div className="border-b border-dashed border-stone-400 pb-2">
              <span className="font-mono text-xs text-stone-500 font-bold">SUB-SECTION A.1: EMPLOYMENT & REVENUE UTILITY</span>
            </div>

            {/* Occupation Input */}
            <div className="space-y-3">
              <label className="block font-serif text-base font-bold text-stone-800">
                1. What is your designated occupational role in the engine of capitalism?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OCCUPATIONS.map((occ) => {
                  const isSelected = state.occupation === occ;
                  return (
                    <button
                      key={occ}
                      onClick={() => handleOptionSelect("occupation", occ)}
                      className={`relative flex items-center gap-2 p-2.5 text-left font-mono text-xs border rounded transition-all ${
                        isSelected
                          ? "bg-stone-900 text-white border-stone-950 font-bold shadow-md"
                          : "bg-[#eedfb9]/40 hover:bg-[#eedfb9]/90 text-stone-800 border-stone-400"
                      }`}
                    >
                      <span className={`font-bold ${isSelected ? "text-red-400" : "text-red-700"}`}>
                        {isSelected ? "☒" : "☐"}
                      </span>
                      <span>
                        {occ}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-b border-dashed border-stone-400 pb-2 pt-2">
              <span className="font-mono text-xs text-stone-500 font-bold">SUB-SECTION A.2: SACRIFICIAL ASSET INTENSITY</span>
            </div>

            {/* Years to sell Slider */}
            <div className="space-y-4">
              <label className="block font-serif text-base font-bold text-stone-800">
                2. Quantify the exact duration of remaining lifespan you wish to liquidate (years):
              </label>
              
              <div className="p-4 bg-[#ecdba8]/50 border border-stone-400 rounded-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-stone-600 font-bold">VALUATION MAGNITUDE</span>
                  <span className="font-mono text-lg font-black text-[#8b3a2b] bg-[#e6dac0] px-3 py-1 rounded shadow-inner border border-stone-500">
                    {state.yearsToSell} Years
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="70"
                  value={state.yearsToSell}
                  onChange={(e) => {
                    LEAAudio.playClick();
                    onChange({ yearsToSell: parseInt(e.target.value, 10) });
                  }}
                  className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#8b3a2b]"
                />
                
                <div className="flex justify-between font-mono text-[9px] text-stone-500 mt-1">
                  <span>1 YEAR (MIN)</span>
                  <span>35 YEARS</span>
                  <span>70 YEARS (MAX)</span>
                </div>
              </div>

              {/* Hand-written styled red disclaimer */}
              <div className="font-serif italic text-[#a3352a] text-xs text-center border-l-2 border-[#a3352a] pl-4 py-1">
                "You will permanently forfeit {state.yearsToSell} years of remaining biological potential. The Department assumes no liability for subsequent physical coldness."
              </div>
            </div>
          </div>
        ) : (
          /* Steps 1 to N: Sequential Lifestyle, Health, Luck & Psyche Questions */
          (() => {
            const questionIndex = currentStep - 1;
            const q = QUIZ_QUESTIONS[questionIndex];
            const currentValue = state[q.id] as string;

            return (
              <div className="space-y-6">
                <div className="border-b border-dashed border-stone-400 pb-2">
                  <span className="font-mono text-xs text-stone-500 font-bold">
                    SUB-SECTION B.{ questionIndex + 1 }: {q.section.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-stone-900 leading-snug">
                    {currentStep}. {q.text}
                  </h3>

                  <div className="space-y-2 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = currentValue === opt.label;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleOptionSelect(q.id, opt.label)}
                          className={`relative w-full flex items-start gap-3 p-3.5 text-left font-mono text-xs md:text-sm border rounded transition-all ${
                            isSelected
                              ? "bg-stone-900 text-white border-stone-950 font-bold shadow-md"
                              : "bg-[#eedfb9]/40 hover:bg-[#eedfb9]/90 text-stone-800 border-stone-400"
                          }`}
                        >
                          <span className={`font-black pt-0.5 ${isSelected ? "text-red-400" : "text-red-700"}`}>
                            {isSelected ? "☒" : "☐"}
                          </span>
                          <span className="leading-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hand-written marginal note in serif italic */}
                <div className="pt-4 border-t border-stone-300 text-stone-500 font-serif italic text-xs">
                  * Note: Answers are cross-referenced with your eternal biological ledger by our deep-soul auditory monitors.
                </div>
              </div>
            );
          })()
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-stone-400">
          <div className="font-mono text-[10px] text-stone-500 font-bold">
            PAGE {currentStep + 1} OF {totalSteps}
          </div>

          <div className="flex items-center gap-3">
            {!isCurrentStepCompleted && (
              <span className="font-mono text-[9px] text-[#a3352a] font-bold tracking-tight animate-pulse mr-1">
                ☒ ANSWER REQUIRED
              </span>
            )}
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-bold btn-vintage border border-stone-800 rounded-sm text-stone-800"
              >
                &larr; BACK
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!isCurrentStepCompleted}
              className={`px-5 py-2 text-xs font-black border border-stone-800 rounded-sm transition-all ${
                isCurrentStepCompleted
                  ? "btn-vintage text-stone-900 bg-stone-200 cursor-pointer"
                  : "bg-stone-300 border-stone-400 text-stone-500 cursor-not-allowed opacity-65"
              }`}
            >
              {currentStep === totalSteps - 1 ? "VALUATE MORTALITY" : "NEXT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
