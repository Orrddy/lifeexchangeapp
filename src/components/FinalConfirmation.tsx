import React, { useState, useRef, useEffect } from "react";
import { LEAAudio } from "../utils/audio";
import { QuestionnaireState } from "../types";
import { BinderRings, CoffeeStain, GovernmentHeader, RubberStamp } from "./RetroWidgets";

interface FinalConfirmationProps {
  state: QuestionnaireState;
  calculatedOffer: number;
  bonusAmount: number;
  onConfirm: () => void;
}

export const FinalConfirmation: React.FC<FinalConfirmationProps> = ({
  state,
  calculatedOffer,
  bonusAmount,
  onConfirm,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Set up canvas options for marker stroke
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#a3352a"; // Blood red ink marker
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    LEAAudio.playClick();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasSigned(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    LEAAudio.playPaperRustle();
  };

  const totalPayout = calculatedOffer + bonusAmount;
  
  // Satirical estimated remaining years formula
  const baseLife = 82;
  const healthPenalty = state.sleep.includes("0-4") ? 10 : state.sleep.includes("5-7") ? 4 : 0;
  const sushiPenalty = state.gasStationSushi.includes("Once") ? 5 : state.gasStationSushi.includes("primary") ? 15 : 0;
  const stressPenalty = state.stress.includes("high-pressure") ? 8 : state.stress.includes("vibrating") ? 4 : 0;
  
  const estimatedRemaining = Math.max(5, baseLife - 28 - healthPenalty - sushiPenalty - stressPenalty - state.yearsToSell);

  const handleCheckbox = () => {
    LEAAudio.playClick();
    setAgreed(!agreed);
  };

  const handleSubmit = () => {
    if (!agreed) {
      LEAAudio.playBuzz();
      return;
    }
    LEAAudio.playStamp();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
    }, 800);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 bg-aged-paper border-4 border-stone-800 shadow-2xl rounded-sm pl-12 pr-6 md:pr-10 py-8 text-stone-900 select-none overflow-hidden">
      <BinderRings />
      <CoffeeStain style={{ top: "40%", left: "-15px" }} />

      <GovernmentHeader title="TEMPORAL DEED & INDENTURE AGREEMENT" />

      {/* Top Secret Stamp */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-35">
        <RubberStamp text="DO NOT REPRODUCE" color="red" angle={-5} />
      </div>

      <div className="space-y-5">
        <div className="border-b border-dashed border-stone-400 pb-2">
          <span className="font-mono text-xs text-[#8b3a2b] font-bold uppercase">
            CONTRACT REF: LEA-SOUL-{Math.floor(totalPayout / 7)}-DEED
          </span>
        </div>

        {/* Legal contract text styling */}
        <div className="p-5 border-2 border-stone-800 bg-[#FAF7ED] shadow-inner font-serif text-xs md:text-sm text-stone-800 leading-relaxed space-y-4">
          <p className="indent-8 text-justify font-serif">
            This indenture, made on this day of <span className="underline font-bold font-mono">July 9th, 2026</span>, by and between the <span className="font-bold text-stone-950">LIFESPAN EXCHANGE AUTHORITY</span> (hereinafter "Authority"), and the undersigning entity <span className="underline font-mono font-bold text-[#8b3a2b]">{state.paymentName || "[REDACTED MORTAL]"}</span> (hereinafter "Grantor").
          </p>

          <p className="indent-8 text-justify font-serif">
            The Grantor hereby grants, bargains, sells, conveys, and surrenders to the Authority exactly <span className="underline font-mono font-bold font-black text-stone-950">{state.yearsToSell} Years</span> of their remaining natural earthly biological lifespan. The surrendered duration will be harvested by the Authority's dimensional extraction division and added to the sovereign temporal reserves immediately.
          </p>

          <div className="border-y border-dashed border-stone-400 py-3 my-3">
            <span className="font-mono text-[10px] text-stone-500 font-bold block mb-1 uppercase">
              Schedule of Surrender & Liquidation:
            </span>
            <table className="w-full font-mono text-xs text-stone-700">
              <tbody>
                <tr>
                  <td>• Years Forfeited:</td>
                  <td className="text-right font-bold text-stone-900">{state.yearsToSell} Years</td>
                </tr>
                <tr>
                  <td>• Estimated Remaining Duration (Biological):</td>
                  <td className="text-right font-bold text-amber-900">~{estimatedRemaining} Years remaining</td>
                </tr>
                <tr>
                  <td>• Direct Base Valuation:</td>
                  <td className="text-right">${calculatedOffer.toLocaleString()}</td>
                </tr>
                {bonusAmount > 0 && (
                  <tr>
                    <td>• Biometric Face Signature Bonus (15%):</td>
                    <td className="text-right text-emerald-700">+${bonusAmount.toLocaleString()}</td>
                  </tr>
                )}
                <tr className="border-t border-stone-300 font-extrabold text-stone-900 text-sm">
                  <td className="pt-2">TOTAL DISBURSEMENT CAPITAL:</td>
                  <td className="pt-2 text-right text-emerald-800">${totalPayout.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>• Target Destination Account:</td>
                  <td className="text-right text-[10px]">
                    {state.paymentMethod} ({state.paymentRouting ? `Rt: ${state.paymentRouting}` : "Anonymous Ledger"})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="indent-8 text-justify font-serif italic text-stone-600 text-[11px]">
            "Grantor acknowledges that subsequent feelings of time speeding up, cold hands, sudden déjà vu, missing socks, and existential Mondays are standard operational outputs of the harvesting array. This transaction is irreversible and legally binding in at least three dimensions, including all parallel branches of the temporal multiverse."
          </p>

          {/* Graphical Signature fields */}
          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-stone-300">
            <div className="flex flex-col space-y-1.5">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={240}
                  height={90}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-20 bg-[#fbf9f3] border-2 border-dashed border-stone-400 rounded-sm cursor-crosshair shadow-inner block"
                  style={{ touchAction: "none" }}
                />
                {!hasSigned && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-stone-400 font-serif italic text-xs select-none">
                    Sign with marker here
                  </div>
                )}
                {hasSigned && (
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[8px] font-mono font-bold bg-[#8b3a2b]/15 text-[#8b3a2b] rounded border border-[#8b3a2b]/30 hover:bg-[#8b3a2b]/25 select-none"
                  >
                    [CLEAR]
                  </button>
                )}
              </div>
              <div className="border-t border-stone-800 text-center font-mono text-[9px] text-stone-500 uppercase font-bold pt-1">
                Digital Marker Signature of Grantor
              </div>
            </div>
            <div className="flex flex-col justify-end pb-1.5">
              <div className="h-12 flex items-end justify-center font-mono text-[10px] text-stone-600 font-bold">
                Commissioner S. Avesta-IV
              </div>
              <div className="border-t border-stone-800 text-center font-mono text-[9px] text-stone-500 uppercase font-bold pt-1">
                For the Temporal Authority
              </div>
            </div>
          </div>
        </div>

        {/* Checked agreement Box */}
        <div
          onClick={handleCheckbox}
          className={`flex items-start gap-3 p-3 border rounded cursor-pointer transition-colors ${
            agreed
              ? "bg-[#8b3a2b]/10 border-[#8b3a2b]"
              : "bg-[#eedfb9]/20 hover:bg-[#eedfb9]/50 border-stone-400"
          }`}
        >
          <span className="font-mono text-base font-black text-[#8b3a2b] select-none">
            {agreed ? "☒" : "☐"}
          </span>
          <span className="font-mono text-xs text-stone-800 leading-tight">
            I acknowledge that this transaction is irreversible and legally binding in at least three dimensions. I certify that my soul has not been pre-mortgaged to secondary corporate familiars.
          </span>
        </div>

        {/* Giant Red Stamp Confirmation Button */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-2">
          <button
            onClick={handleSubmit}
            disabled={!agreed || !hasSigned || isSubmitting}
            className={`w-full max-w-sm px-6 py-5 border-4 border-double font-stamp text-lg md:text-xl tracking-widest uppercase transition-all ${
              agreed && hasSigned && !isSubmitting
                ? "bg-[#8b3a2b]/5 border-[#8b3a2b] text-[#8b3a2b] hover:bg-[#8b3a2b]/20 hover:scale-[1.02] shadow-lg cursor-pointer animate-flicker"
                : "bg-stone-300 border-stone-400 text-stone-500 cursor-not-allowed opacity-50"
            }`}
          >
            {isSubmitting ? "HARVESTING SOUL ASSETS..." : !hasSigned ? "AWAITING SIGNATURE..." : "SELL MY LIFESPAN"}
          </button>
          <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest">
            * LEA DIRECTIVE 1349 // DO NOT PRESS UNLESS WILLING
          </span>
        </div>
      </div>
    </div>
  );
};
