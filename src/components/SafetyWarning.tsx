import React, { useState } from "react";
import { LEAAudio } from "../utils/audio";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface SafetyWarningProps {
  onAccept: () => void;
}

export const SafetyWarning: React.FC<SafetyWarningProps> = ({ onAccept }) => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checks, setChecks] = useState({
    dizziness: false,
    forgetting: false,
    socks: false,
    monday: false,
    sunset: false
  });

  const sideEffects = [
    { key: "dizziness", text: "Mild cognitive vertigo and/or general clumsiness" },
    { key: "forgetting", text: "Regularly entering a room and completely forgetting why you are there" },
    { key: "socks", text: "A statistically anomalous disappearance of your left socks" },
    { key: "monday", text: "Feeling up to 45% older on Monday mornings" },
    { key: "sunset", text: "An sudden, uncontrollable urge to look dramatically into the middle distance during sunsets" },
    { key: "dejavu", text: "Spontaneous occurrences of déjà vu that hint at alternative timeline choices" },
    { key: "existential", text: "Occasional deep, unprovoked existential thoughts during grocery shopping" },
    { key: "badluck", text: "Temporary, localized drops in personal fortune (coinciding with cloudy weather)" }
  ];

  const handleCheck = (key: string) => {
    LEAAudio.playClick();
    const newChecks = { ...checks, [key]: !checks[key as keyof typeof checks] };
    setChecks(newChecks);
    
    // Check if everything is acknowledged
    const allChecked = Object.values(newChecks).every(Boolean);
    setCheckedAll(allChecked);
  };

  const handleProceed = () => {
    LEAAudio.playStamp();
    onAccept();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      <BinderRings />
      <CoffeeStain style={{ top: "10%", right: "20px" }} />

      <GovernmentHeader title="MEDICAL & OCCULT WAIVER" />

      {/* Red warning stamped text style and frames */}
      <div className="border-4 border-[#a82e1e] p-4 bg-red-100/30 space-y-4">
        <div className="flex justify-between items-center border-b-2 border-[#a82e1e] pb-2">
          <h2 className="font-stamp text-2xl font-black text-[#a82e1e] tracking-widest">
            WARNING / ADVISORY
          </h2>
          <RubberStamp text="BIO-HAZARD-IV" color="red" angle={5} />
        </div>

        <p className="font-mono text-xs text-stone-700 font-bold leading-relaxed">
          The Biological Exchange Commission requires all exchange candidates to self-verify their tolerance of potential post-forfeiture cognitive and physiological side-effects. Please read and initial each warning category.
        </p>

        {/* List of side effects to check off */}
        <div className="space-y-2 pt-2">
          {sideEffects.slice(0, 5).map((effect) => {
            const isChecked = checks[effect.key as keyof typeof checks];
            return (
              <div
                key={effect.key}
                onClick={() => handleCheck(effect.key)}
                className={`flex items-start gap-3 p-2.5 rounded border border-stone-300 cursor-pointer transition-colors ${
                  isChecked ? "bg-red-800/10 border-red-800/40" : "bg-[#eedfb9]/20 hover:bg-[#eedfb9]/50"
                }`}
              >
                <span className="font-mono text-sm font-black text-[#a82e1e] select-none pt-0.5">
                  {isChecked ? "☒ [INITIALED]" : "☐ [INITIALS HERE]"}
                </span>
                <span className="font-mono text-[11px] md:text-xs text-stone-800 leading-snug">
                  {effect.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* General bullet list for secondary warnings */}
        <div className="border-t border-dashed border-[#a82e1e] pt-3 mt-4">
          <span className="font-mono text-[10px] text-stone-600 font-bold block mb-2 uppercase">
            Secondary Non-Disclosed Reactions (General Classification):
          </span>
          <ul className="list-disc list-inside font-mono text-[11px] text-stone-600 space-y-1">
            {sideEffects.slice(5).map((eff, i) => (
              <li key={i}>{eff.text}</li>
            ))}
          </ul>
        </div>

        {/* Final legally binding paragraph */}
        <div className="border-t border-stone-400 pt-3 text-center">
          <p className="font-serif italic text-xs font-bold text-[#a82e1e]">
            "By proceeding, you acknowledge that remaining life is non-refundable, non-transferrable, and subject to eternal forfeiture."
          </p>
        </div>

        {/* Proceed button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleProceed}
            disabled={!checkedAll}
            className={`w-full max-w-sm px-6 py-4 border-2 border-[#a82e1e] font-stamp text-sm md:text-base tracking-wider uppercase rounded-sm transition-all ${
              checkedAll
                ? "bg-[#a82e1e] text-white hover:bg-red-700 shadow-md cursor-pointer"
                : "bg-stone-300 border-stone-400 text-stone-500 cursor-not-allowed opacity-50"
            }`}
          >
            {checkedAll ? "I Understand & Accept Liability" : "Please Initial All Warning Sections"}
          </button>
        </div>
      </div>
    </div>
  );
};
