import React from "react";
import { LEAAudio } from "../utils/audio";
import { QuestionnaireState } from "../types";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface PaymentInfoProps {
  state: QuestionnaireState;
  onChange: (updates: Partial<QuestionnaireState>) => void;
  onNext: () => void;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({ state, onChange, onNext }) => {
  const paymentMethods = [
    { label: "Bank Account", sub: "Standard direct deposit" },
    { label: "PayPal", sub: "Subject to transfer fees" },
    { label: "Crypto Wallet", sub: "Distributed ledger carbon debit" },
    { label: "Cash (8-14 Business Centuries)", sub: "Shipped via deep-orbit cargo vessel" }
  ];

  const handleInputChange = (field: keyof QuestionnaireState, val: string) => {
    // Play a lovely physical typewriter key sound on typing!
    LEAAudio.playClick();
    onChange({ [field]: val });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.paymentName.trim()) {
      LEAAudio.playBuzz();
      return;
    }
    LEAAudio.playStamp();
    onNext();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      <BinderRings />
      <CoffeeStain style={{ bottom: "-40px", right: "20px" }} />

      <GovernmentHeader title="DISBURSEMENT INSTRUMENT SPECIFICATIONS" />

      {/* Audit Stamped indicators */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-40">
        <RubberStamp text="DIRECT DEP-REQ" color="green" angle={-12} />
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="border-b border-dashed border-stone-400 pb-2">
          <span className="font-mono text-xs text-stone-500 font-bold uppercase">
            FORM LEA-1099-C // SECTION III: FUND ROUTING DIRECTIONS
          </span>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-3">
          <label className="block font-serif text-base font-bold text-stone-800">
            1. Select your preferred channel of temporal liquidation payouts:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {paymentMethods.map((m) => {
              const isSelected = state.paymentMethod === m.label;
              return (
                <button
                  type="button"
                  key={m.label}
                  onClick={() => {
                    LEAAudio.playClick();
                    onChange({ paymentMethod: m.label });
                  }}
                  className={`relative flex flex-col items-start p-3 text-left border rounded transition-all ${
                    isSelected
                      ? "bg-stone-900 text-white border-stone-950 font-bold shadow-md"
                      : "bg-[#eedfb9]/30 hover:bg-[#eedfb9]/70 text-stone-800 border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs md:text-sm font-bold">
                    <span className={`font-black ${isSelected ? "text-red-400" : "text-red-700"}`}>{isSelected ? "☒" : "☐"}</span>
                    <span>{m.label}</span>
                  </div>
                  <span className={`font-mono text-[9px] mt-1 pl-5 ${isSelected ? "text-stone-300" : "text-stone-500"}`}>
                    {m.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Routing details styled like typewriter dotted fields */}
        <div className="space-y-4 p-5 bg-[#ecdba8]/30 border border-stone-400 rounded-sm">
          <div className="space-y-1">
            <label className="block font-mono text-[10px] text-stone-600 font-extrabold uppercase">
              Full Legal Name of Mortal Recipient:
            </label>
            <input
              type="text"
              value={state.paymentName}
              onChange={(e) => handleInputChange("paymentName", e.target.value)}
              placeholder="E.g., Johnathan S. Doe"
              required
              className="w-full bg-transparent font-serif text-lg text-stone-900 italic border-b border-dashed border-stone-800 focus:outline-none focus:border-stone-950 py-1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-[10px] text-stone-600 font-extrabold uppercase">
                {state.paymentMethod === "Crypto Wallet" ? "Wallet Address / ENS Name:" : "Routing Transit Number:"}
              </label>
              <input
                type="text"
                value={state.paymentRouting}
                onChange={(e) => handleInputChange("paymentRouting", e.target.value)}
                placeholder={state.paymentMethod === "Crypto Wallet" ? "0x71C... or name.eth" : "9-Digit Routing Code"}
                className="w-full bg-transparent font-mono text-xs text-stone-800 border-b border-dashed border-stone-800 focus:outline-none focus:border-stone-950 py-1"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[10px] text-stone-600 font-extrabold uppercase">
                {state.paymentMethod === "Crypto Wallet" ? "Alternate Memo / Network:" : "Account / Ledger Reference Number:"}
              </label>
              <input
                type="text"
                value={state.paymentAccount}
                onChange={(e) => handleInputChange("paymentAccount", e.target.value)}
                placeholder={state.paymentMethod === "Crypto Wallet" ? "E.g., ERC-20 Network" : "Standard Account Code"}
                className="w-full bg-transparent font-mono text-xs text-stone-800 border-b border-dashed border-stone-800 focus:outline-none focus:border-stone-950 py-1"
              />
            </div>
          </div>
        </div>

        {/* Cash warning message if chosen */}
        {state.paymentMethod.startsWith("Cash") && (
          <div className="p-3 border-2 border-amber-800 bg-amber-50 rounded text-amber-900 font-mono text-[11px] leading-relaxed">
            <strong>WARNING:</strong> Cash payouts are shipped in heavy brass locked vaults via temporal cargo channels. Delivery estimated in the 32nd Century. High probability of family descendants forgetting the security combination.
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-stone-300">
          <span className="font-mono text-[10px] text-stone-500">
            Form LEA-1099-C // All routing subject to 3-D security checks.
          </span>
          <button
            type="submit"
            className="px-6 py-3.5 btn-vintage border-2 border-stone-950 text-xs md:text-sm text-stone-900 font-black rounded-sm"
          >
            RECORD PAYMENT SETTINGS
          </button>
        </div>
      </form>
    </div>
  );
};
