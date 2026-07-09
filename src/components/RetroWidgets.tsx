import React from "react";

// Interactive custom SVG Wax Seal with ancient/cult seal and Latin mottoes
export const WaxSeal: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      {/* Outer irregular wax drip body */}
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 filter drop-shadow-md cursor-pointer hover:scale-105 transition-transform"
      >
        <path
          d="M 60,10 
             C 85,8 100,20 110,45 
             C 118,65 112,90 95,105 
             C 78,118 45,115 25,102 
             C 8,90 10,65 12,45 
             C 14,25 35,12 60,10 Z"
          fill="#851e13"
          stroke="#5a110a"
          strokeWidth="1.5"
        />
        {/* Inner seal circle */}
        <circle cx="60" cy="60" r="38" fill="#9e281d" stroke="#5a110a" strokeWidth="1" />
        
        {/* Intricate Sigil design */}
        <g stroke="#ffd700" strokeWidth="1" fill="none" opacity="0.8">
          {/* Outer compass star */}
          <circle cx="60" cy="60" r="32" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="3,3" />
          <path d="M 60,28 L 60,92 M 28,60 L 92,60" stroke="#ffd700" strokeWidth="0.8" />
          <path d="M 40,40 L 80,80 M 40,80 L 80,40" stroke="#ffd700" strokeWidth="0.5" />
          
          {/* Inner triangle and hourglass */}
          <polygon points="60,34 82,72 38,72" stroke="#ffffff" strokeWidth="1" />
          <path d="M 50,48 L 70,48 L 50,68 L 70,68 Z" stroke="#ffd700" strokeWidth="1.2" fill="none" />
          <circle cx="60" cy="58" r="4" fill="#ffd700" />
        </g>
        
        {/* Latin text wrap */}
        <path
          id="sealTextPath"
          d="M 28,60 A 32,32 0 1,1 92,60"
          fill="none"
        />
        <text className="font-mono text-[7px]" fill="#ffffff" opacity="0.6">
          <textPath href="#sealTextPath" startOffset="50%" textAnchor="middle">
            L. E. A. * TEMPUS FUGIT * 1349
          </textPath>
        </text>
      </svg>
    </div>
  );
};

// Graphical administrative binder rings for folder aesthetic
export const BinderRings: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around items-center py-12 pointer-events-none z-10">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="relative flex items-center justify-center -ml-5">
          {/* The ring binding wire hole */}
          <div className="w-5 h-5 bg-stone-900 rounded-full border border-stone-700 shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 bg-stone-950 rounded-full" />
          </div>
          {/* The steel ring itself */}
          <div className="absolute w-12 h-6 border-4 border-stone-400 rounded-full -left-5 shadow-md transform rotate-12 opacity-80 border-t-stone-200 border-l-stone-300 border-b-stone-500 border-r-stone-500" />
        </div>
      ))}
    </div>
  );
};

// Randomized tea / coffee stains to place in corners of documents
export const CoffeeStain: React.FC<{ style?: React.CSSProperties; className?: string }> = ({
  style,
  className = "",
}) => {
  return (
    <div
      className={`absolute opacity-20 pointer-events-none select-none ${className}`}
      style={{
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(121, 85, 72, 0.2) 0%, rgba(121, 85, 72, 0.08) 50%, rgba(121, 85, 72, 0.03) 65%, transparent 75%)",
        border: "1.5px solid rgba(121, 85, 72, 0.12)",
        filter: "blur(1px)",
        ...style,
      }}
    />
  );
};

// Generic Ink Rubber Stamp Overlay
export const RubberStamp: React.FC<{
  text: string;
  color?: "red" | "green" | "blue" | "purple";
  angle?: number;
  className?: string;
}> = ({ text, color = "red", angle = -8, className = "" }) => {
  const colorClasses = {
    red: "border-red-800 text-red-800 bg-red-800/5",
    green: "border-green-800 text-green-800 bg-green-800/5",
    blue: "border-blue-800 text-blue-800 bg-blue-800/5",
    purple: "border-purple-800 text-purple-800 bg-purple-800/5",
  };

  return (
    <div
      className={`inline-block border-4 border-double px-4 py-1.5 font-stamp text-xs md:text-sm font-bold uppercase tracking-wider rounded pointer-events-none select-none ${colorClasses[color]} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        opacity: 0.85,
        maskImage: "radial-gradient(circle, #000 70%, rgba(0,0,0,0.4) 100%)",
      }}
    >
      {text}
    </div>
  );
};

// Official Header with insignia
export const GovernmentHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle = "LIFESPAN EXCHANGE AUTHORITY",
}) => {
  return (
    <div className="border-b-2 border-stone-800 pb-4 mb-6 text-center select-none">
      <div className="flex flex-col items-center justify-center">
        {/* Official insignia icon */}
        <div className="mb-2">
          <svg viewBox="0 0 100 100" className="w-14 h-14 text-stone-800" stroke="currentColor" fill="none">
            {/* Double balance scale of justice and time */}
            <line x1="50" y1="15" x2="50" y2="85" strokeWidth="3" />
            <line x1="20" y1="35" x2="80" y2="35" strokeWidth="3.5" />
            
            {/* Left scale pan (money bag icon shape or circle) */}
            <line x1="25" y1="35" x2="15" y2="60" strokeWidth="1.5" />
            <line x1="25" y1="35" x2="35" y2="60" strokeWidth="1.5" />
            <path d="M 12,60 Q 25,65 38,60 Z" strokeWidth="2" fill="rgba(0,0,0,0.05)" />
            <text x="21" y="55" className="font-serif text-xs font-bold" fill="currentColor">$</text>
            
            {/* Right scale pan (Hourglass shape) */}
            <line x1="75" y1="35" x2="65" y2="60" strokeWidth="1.5" />
            <line x1="75" y1="35" x2="85" y2="60" strokeWidth="1.5" />
            <path d="M 62,60 Q 75,65 88,60 Z" strokeWidth="2" fill="rgba(0,0,0,0.05)" />
            <path d="M 70,45 L 80,45 L 70,55 L 80,55 Z" strokeWidth="1.5" />
            
            {/* Base */}
            <path d="M 35,85 L 65,85" strokeWidth="4" />
            <path d="M 42,80 L 58,80" strokeWidth="3" />
          </svg>
        </div>
        <h1 className="font-serif text-lg md:text-xl font-extrabold tracking-widest text-stone-900 uppercase glitch-text">
          {subtitle}
        </h1>
        <p className="font-mono text-[9px] md:text-xs text-stone-600 font-bold uppercase mt-1 tracking-wider">
          Fictional Sovereign Department of Temporal Allotment & Liquidation
        </p>
        <div className="text-[10px] text-stone-500 font-mono italic mt-1">
          Form LEA-1349-REV-B // State Authorized Temporal Exchange Code §44-A
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] font-mono text-stone-600 mt-4 border-t border-stone-300 pt-2 px-2">
        <span>SECURITY LEVEL: CLASS-IV OMNIPRESENT</span>
        <span className="text-stone-800 font-bold">{title}</span>
        <span>INDEX: {Math.floor(Date.now() / 10000000)}</span>
      </div>
    </div>
  );
};
