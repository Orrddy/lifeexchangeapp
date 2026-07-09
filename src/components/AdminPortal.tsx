import React, { useState, useEffect } from "react";
import { LEAAudio } from "../utils/audio";

interface LEATransaction {
  id: string;
  timestamp: string;
  name: string;
  occupation: string;
  yearsToSell: number;
  totalPayout: number;
  status: string;
  reason: string;
}

interface AdminPortalProps {
  onClose: () => void;
  globalMultiplier: number;
  setGlobalMultiplier: (val: number) => void;
  onLock?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onClose,
  globalMultiplier,
  setGlobalMultiplier,
  onLock,
}) => {
  const [transactions, setTransactions] = useState<LEATransaction[]>([]);
  const [activeTab, setActiveTab] = useState<"ledger" | "live" | "system">("ledger");
  const [logs, setLogs] = useState<string[]>([]);
  const [meltdownActive, setMeltdownActive] = useState(false);
  const [liveTerminals, setLiveTerminals] = useState([
    { id: "T-04", location: "Sector III (Vatican Sub)", operator: "Avesta-IV", status: "AUDITING", ping: "8ms", bandwidth: "45.2 TB/s" },
    { id: "T-12", location: "Berlin Hub", operator: "Mortal-849", status: "QUESTIONNAIRE", ping: "42ms", bandwidth: "12.8 TB/s" },
    { id: "T-22", location: "Tokyo Depths", operator: "Mortal-911", status: "SIGNING DEED", ping: "15ms", bandwidth: "88.4 TB/s" },
    { id: "T-45", location: "San Francisco Node", operator: "Mortal-104", status: "IDLE // COFFEE", ping: "64ms", bandwidth: "2.1 TB/s" },
    { id: "T-89", location: "Luna Crater 09", operator: "AI-STATION-A", status: "HARVESTING", ping: "250ms", bandwidth: "140.5 TB/s" },
  ]);

  // Form states to "Forge Citizen Record"
  const [forgeName, setForgeName] = useState("");
  const [forgeOccupation, setForgeOccupation] = useState("Software Engineer");
  const [forgeYears, setForgeYears] = useState(10);
  const [forgePayout, setForgePayout] = useState(120000);

  // Load transactions and initial data
  useEffect(() => {
    // Initial logs setup
    const initialLogs = [
      `[${new Date().toLocaleTimeString()}] LEA-CORESYNC v3.49 initialized.`,
      `[${new Date().toLocaleTimeString()}] Secure connection established with Sector III.`,
      `[${new Date().toLocaleTimeString()}] Syncing global mortality forfeiture ledgers...`,
      `[${new Date().toLocaleTimeString()}] 1,349,666 souls active under LEA jurisdiction.`,
      `[${new Date().toLocaleTimeString()}] System status: EXCELLENT // Occult Sync Active.`,
    ];
    setLogs(initialLogs);

    const stored = localStorage.getItem("lea_transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      // Default dummy items for a rich visual on start
      const dummy: LEATransaction[] = [
        {
          id: "LEA-8422",
          timestamp: "09 Jul 2026 12:04",
          name: "Arthur Dent",
          occupation: "Unemployed",
          yearsToSell: 15,
          totalPayout: 1200000,
          status: "REJECTED [CODE-1349]",
          reason: "Earth scheduled for cosmic demolition",
        },
        {
          id: "LEA-9110",
          timestamp: "09 Jul 2026 13:45",
          name: "Neo Anderson",
          occupation: "Software Engineer",
          yearsToSell: 12,
          totalPayout: 840000,
          status: "REJECTED [CODE-1349]",
          reason: "Subject must remain in the simulation framework",
        },
        {
          id: "LEA-1049",
          timestamp: "09 Jul 2026 14:12",
          name: "Ada Lovelace",
          occupation: "Meme Archivist",
          yearsToSell: 8,
          totalPayout: 410000,
          status: "REJECTED [CODE-1349]",
          reason: "Subject exhibits excessive caffeine-induced structural vibrations",
        },
        {
          id: "LEA-5534",
          timestamp: "09 Jul 2026 14:58",
          name: "Marcus Aurelius",
          occupation: "Emperor",
          yearsToSell: 5,
          totalPayout: 250000,
          status: "REJECTED [CODE-1349]",
          reason: "Stoic reserve thresholds fully locked by imperial command",
        }
      ];
      localStorage.setItem("lea_transactions", JSON.stringify(dummy));
      setTransactions(dummy);
    }
  }, []);

  // Periodic simulated logs
  useEffect(() => {
    const logPool = [
      "Extracted bio-liquidity level fluctuating in Sector IV.",
      "Syncing quantum registers for active temporal covenants...",
      "WARNING: High stress levels detected in Software Engineer cohort.",
      "Commissioner Avesta-IV authorized automatic ledger backup.",
      "Sovereign hum leakage rate calibrated successfully.",
      "Intrusive coffee stain detected on primary hardware terminal.",
      "Gas station sushi audit reported digestive anomaly.",
      "Ethereal bandwidth allocation upgraded to 150 TB/s.",
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] ${randomLog}`,
        ...prev.slice(0, 18),
      ]);

      // Randomly update a live terminal's status
      setLiveTerminals((prev) =>
        prev.map((term) => {
          if (Math.random() > 0.7) {
            const statuses = ["AUDITING", "QUESTIONNAIRE", "SIGNING DEED", "IDLE // COFFEE", "HARVESTING", "STRESS OVERLOAD"];
            const pings = ["5ms", "12ms", "24ms", "55ms", "82ms", "140ms"];
            return {
              ...term,
              status: statuses[Math.floor(Math.random() * statuses.length)],
              ping: pings[Math.floor(Math.random() * pings.length)],
            };
          }
          return term;
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Handle manually forging a record
  const handleForge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgeName.trim()) {
      LEAAudio.playBuzz();
      return;
    }

    const newTx: LEATransaction = {
      id: `FORGE-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: forgeName,
      occupation: forgeOccupation,
      yearsToSell: forgeYears,
      totalPayout: forgePayout,
      status: "REJECTED [CODE-1349]",
      reason: "Forged directly via Administrator override",
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem("lea_transactions", JSON.stringify(updated));
    setForgeName("");
    LEAAudio.playStamp();
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] FORGE SUCCESS: Recorded artificial citizen '${newTx.name}'`, ...prev]);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to purge the entire mortality ledger database? This cannot be undone.")) {
      localStorage.removeItem("lea_transactions");
      setTransactions([]);
      LEAAudio.playPaperRustle();
      setLogs((prev) => [`[${new Date().toLocaleTimeString()}] SYSTEM PURGE: Ledger records cleared.`, ...prev]);
    }
  };

  const handleTriggerMeltdown = () => {
    LEAAudio.playBuzz();
    setMeltdownActive(true);
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] !!! CRITICAL ALERT !!! MELTDOWN PROTOCOL INITIATED.`,
      `[${new Date().toLocaleTimeString()}] BIOLOGICAL CORE MELTING DOWN. TEMPORAL LEAKAGE CRITICAL.`,
      ...prev,
    ]);
  };

  const handleResetMeltdown = () => {
    LEAAudio.playClick();
    setMeltdownActive(false);
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] Meltdown averted. Normal biological extraction values restored.`, ...prev]);
  };

  return (
    <div className={`crt-screen w-full max-w-4xl bg-stone-950 border-4 border-stone-800 rounded-sm shadow-2xl p-4 md:p-6 text-stone-300 font-mono select-none overflow-hidden ${
      meltdownActive ? "border-red-900 bg-red-950/20 text-red-500 animate-shake" : "text-emerald-400"
    }`} id="admin-portal-stage">
      <div className="crt-scanline" />

      {/* Retro Administrative Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-stone-800 pb-3 mb-4 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${meltdownActive ? "bg-red-600 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
            <span className="font-extrabold text-sm uppercase tracking-widest text-stone-100">
              {meltdownActive ? "☣ CORE SYNC MELTDOWN IN PROGRESS" : "⚡ LEA CORE CONTROL PANEL // CORESYNC V3.49"}
            </span>
          </div>
          <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mt-0.5">
            RESTRICTED ACCESS AREA // LEVEL-4 DEED AUDITOR TERMINAL
          </span>
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          {onLock && (
            <button
              onClick={() => {
                LEAAudio.playClick();
                onLock();
              }}
              className="px-3 py-1 text-[10px] bg-red-950/40 border border-red-700 text-red-400 font-black rounded-sm hover:bg-red-900/30 transition-colors uppercase cursor-pointer"
            >
              [🔒 LOCK TERMINAL]
            </button>
          )}
          <button
            onClick={() => {
              LEAAudio.playClick();
              onClose();
            }}
            className="px-3 py-1 text-[10px] bg-[#8b3a2b]/20 border border-[#8b3a2b] text-[#8b3a2b] font-black rounded-sm hover:bg-[#8b3a2b]/45 transition-colors uppercase cursor-pointer"
          >
            [❌ EXIT SESSION]
          </button>
        </div>
      </div>

      {/* Statistics Row (LED meters) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-stone-900/60 border border-stone-800 p-2 rounded-sm text-center">
          <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">RECORDED CITIZENS</div>
          <div className="text-xl font-black text-stone-100 mt-0.5">{transactions.length}</div>
        </div>
        <div className="bg-stone-900/60 border border-stone-800 p-2 rounded-sm text-center">
          <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">ACTIVE TERMINALS</div>
          <div className="text-xl font-black text-stone-100 mt-0.5">
            {liveTerminals.filter((t) => t.status !== "IDLE // COFFEE").length + 32}
          </div>
        </div>
        <div className="bg-stone-900/60 border border-stone-800 p-2 rounded-sm text-center">
          <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">HARVESTED YEARS</div>
          <div className="text-xl font-black text-stone-100 mt-0.5">459,201 Yrs</div>
        </div>
        <div className="bg-stone-900/60 border border-stone-800 p-2 rounded-sm text-center">
          <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">AVERAGE FORFEITED</div>
          <div className="text-xl font-black text-stone-100 mt-0.5">
            {transactions.length > 0 
              ? (transactions.reduce((acc, curr) => acc + curr.yearsToSell, 0) / transactions.length).toFixed(1) 
              : "11.2"} Yrs
          </div>
        </div>
      </div>

      {/* Main split: Navigation/Tools Left, Content Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
          <button
            onClick={() => { LEAAudio.playClick(); setActiveTab("ledger"); }}
            className={`flex-1 lg:flex-none text-left px-3 py-2 text-xs font-bold rounded-sm border ${
              activeTab === "ledger" 
                ? "bg-stone-800 border-stone-700 text-stone-100" 
                : "border-stone-900 hover:bg-stone-900 text-stone-400"
            }`}
          >
            📋 LEDGER DATA ({transactions.length})
          </button>
          <button
            onClick={() => { LEAAudio.playClick(); setActiveTab("live"); }}
            className={`flex-1 lg:flex-none text-left px-3 py-2 text-xs font-bold rounded-sm border ${
              activeTab === "live" 
                ? "bg-stone-800 border-stone-700 text-stone-100" 
                : "border-stone-900 hover:bg-stone-900 text-stone-400"
            }`}
          >
            📡 ACTIVE USERS ({liveTerminals.length} LIVE)
          </button>
          <button
            onClick={() => { LEAAudio.playClick(); setActiveTab("system"); }}
            className={`flex-1 lg:flex-none text-left px-3 py-2 text-xs font-bold rounded-sm border ${
              activeTab === "system" 
                ? "bg-stone-800 border-stone-700 text-stone-100" 
                : "border-stone-900 hover:bg-stone-900 text-stone-400"
            }`}
          >
            🔧 SYSTEM OVERRIDES
          </button>
        </div>

        {/* Tab contents right */}
        <div className="lg:col-span-9 bg-stone-900/30 border-2 border-stone-900 p-3 rounded-sm min-h-[340px] flex flex-col justify-between">
          
          {/* TAB 1: LEDGER */}
          {activeTab === "ledger" && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-stone-800 pb-1 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                    Sovereign Mortality Ledger History
                  </span>
                  <button
                    onClick={handleClearAll}
                    className="text-[9px] font-bold text-red-400 border border-red-950 hover:bg-red-900/20 px-2 py-0.5 rounded-sm transition-colors uppercase cursor-pointer"
                  >
                    Purge All Ledger Logs
                  </button>
                </div>

                <div className="overflow-x-auto max-h-[170px] overflow-y-auto border border-stone-950 rounded-sm bg-black/40">
                  <table className="w-full text-left font-mono text-[10px]">
                    <thead className="bg-stone-950 text-stone-400 sticky top-0">
                      <tr>
                        <th className="p-1.5 uppercase font-bold tracking-wider">CITIZEN</th>
                        <th className="p-1.5 uppercase font-bold tracking-wider">OCCUPATION</th>
                        <th className="p-1.5 uppercase font-bold tracking-wider">YEARS</th>
                        <th className="p-1.5 uppercase font-bold tracking-wider">VALUATION</th>
                        <th className="p-1.5 uppercase font-bold tracking-wider">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-950">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-stone-600 italic">
                            No mortality transactions logged in local matrix memory.
                          </td>
                        </tr>
                      ) : (
                        transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-stone-900/40 transition-colors">
                            <td className="p-1.5 font-bold text-stone-200">
                              {tx.name} <span className="text-[8px] text-stone-600 font-normal">({tx.id})</span>
                            </td>
                            <td className="p-1.5 text-stone-400">{tx.occupation}</td>
                            <td className="p-1.5 text-stone-200 font-extrabold">{tx.yearsToSell} Yrs</td>
                            <td className="p-1.5 text-red-500 font-black">${tx.totalPayout.toLocaleString()}</td>
                            <td className="p-1.5">
                              <span className="px-1.5 py-0.5 text-[8px] font-extrabold border border-red-900 bg-red-950/30 rounded text-red-400 uppercase">
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Citizen Forge Tool */}
              <form onSubmit={handleForge} className="bg-stone-950/70 border border-stone-850 p-3 rounded-sm mt-2">
                <div className="text-[10px] text-stone-300 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>⛏ CONJURE CITIZEN TO REPLICATE TEST COHORT</span>
                  <span className="text-[9px] text-stone-600 font-normal italic">(Simulate additional portal operations)</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex flex-col space-y-0.5">
                    <label className="text-[8px] text-stone-500 font-bold uppercase">Mortal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={forgeName}
                      onChange={(e) => setForgeName(e.target.value)}
                      className="bg-stone-900 border border-stone-850 text-[10px] text-stone-200 px-1.5 py-1 rounded-sm focus:outline-none focus:border-stone-600"
                    />
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <label className="text-[8px] text-stone-500 font-bold uppercase">Occupation</label>
                    <select
                      value={forgeOccupation}
                      onChange={(e) => setForgeOccupation(e.target.value)}
                      className="bg-stone-900 border border-stone-850 text-[10px] text-stone-200 px-1.5 py-1 rounded-sm focus:outline-none focus:border-stone-600"
                    >
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="Meme Consultant">Meme Consultant</option>
                      <option value="Coffee Brewer">Coffee Brewer</option>
                      <option value="Stoic Emperor">Stoic Emperor</option>
                      <option value="Unemployed Philosopher">Unemployed Philosopher</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <label className="text-[8px] text-stone-500 font-bold uppercase">Years Conveyed</label>
                    <input
                      type="number"
                      min={1}
                      max={80}
                      value={forgeYears}
                      onChange={(e) => setForgeYears(parseInt(e.target.value) || 10)}
                      className="bg-stone-900 border border-stone-850 text-[10px] text-stone-200 px-1.5 py-1 rounded-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-[10px] font-bold py-1 px-2 rounded-sm transition-colors uppercase cursor-pointer"
                    >
                      Convey Record &rarr;
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ACTIVE USERS (LIVE TERMINALS SIMULATION) */}
          {activeTab === "live" && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="border-b border-stone-800 pb-1 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                    Live Operator Console Monitoring Matrix
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[190px] overflow-y-auto pr-1">
                  {liveTerminals.map((term) => (
                    <div 
                      key={term.id} 
                      className="bg-stone-950/60 border border-stone-850 p-2.5 rounded-sm flex flex-col justify-between hover:bg-stone-900/50 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-stone-200">{term.id} [{term.location}]</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] text-stone-500">{term.ping}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 gap-x-2 text-[9px] text-stone-400">
                        <div>
                          <span className="text-stone-600 font-bold block uppercase text-[8px]">Operator</span>
                          <span className="font-bold text-stone-300">{term.operator}</span>
                        </div>
                        <div>
                          <span className="text-stone-600 font-bold block uppercase text-[8px]">Status</span>
                          <span className="text-stone-300 font-extrabold animate-pulse">{term.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated active terminals visual chart */}
              <div className="mt-4 border border-stone-900 p-2.5 bg-stone-950/80 rounded-sm">
                <div className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-2 flex justify-between items-center">
                  <span>💹 COCHLEAR FLUID EXTRACTION RATE (CHRONOLOGICAL HOUR OF THE DAY)</span>
                  <span className="text-[8px] text-stone-500">SYSTEM HEALTH: SECURE</span>
                </div>
                {/* Custom Retro SVG Area Chart */}
                <svg viewBox="0 0 500 70" className="w-full h-16 text-emerald-400 fill-emerald-500/10">
                  {/* Grid lines */}
                  <line x1="0" y1="10" x2="500" y2="10" stroke="#1c1917" strokeDasharray="3,3" />
                  <line x1="0" y1="35" x2="500" y2="35" stroke="#1c1917" strokeDasharray="3,3" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#1c1917" strokeDasharray="3,3" />
                  
                  {/* Custom wave area chart points representing stress-liquidation curve */}
                  <path 
                    d="M 0,60 Q 50,45 100,55 T 200,20 T 300,10 T 400,45 T 500,15 L 500,70 L 0,70 Z" 
                    fill="currentColor" 
                    fillOpacity="0.08" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                  />
                  
                  {/* Data points */}
                  <circle cx="200" cy="20" r="2.5" fill="currentColor" />
                  <circle cx="300" cy="10" r="2.5" fill="currentColor" />
                  <circle cx="500" cy="15" r="2.5" fill="currentColor" />

                  {/* Chart labels */}
                  <text x="5" y="65" fill="#57534e" fontSize="7" fontFamily="monospace">00:00 (EST)</text>
                  <text x="240" y="65" fill="#57534e" fontSize="7" fontFamily="monospace">12:00 (EST) Peak Forfeitures</text>
                  <text x="440" y="65" fill="#57534e" fontSize="7" fontFamily="monospace">24:00 (EST)</text>
                </svg>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM OPTIONS & CALIBRATORS */}
          {activeTab === "system" && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="border-b border-stone-800 pb-1 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                    Sovereign Core System Calibrators
                  </span>
                </div>

                <div className="space-y-4 bg-stone-950/60 p-3 border border-stone-850 rounded-sm">
                  {/* Slider 1: Forfeiture Speed */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-stone-300">
                      <span className="font-bold uppercase tracking-wider">⚡ GLOBAL FORFEITURE COUNTER ACCELERATOR</span>
                      <span className="text-stone-100 font-extrabold">{globalMultiplier}x Speed</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={globalMultiplier}
                        onChange={(e) => {
                          LEAAudio.playClick();
                          setGlobalMultiplier(parseInt(e.target.value));
                        }}
                        className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                    <span className="text-[8px] text-stone-500 font-bold block uppercase mt-0.5">
                      Calibrates the simulated live count-up metrics shown globally on the page.
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-stone-800" />

                  {/* Slider 2: Emergency Meltdown simulation */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-stone-300 font-bold uppercase tracking-wider block">
                      ⚠ EMERGENCY AUTHORITY REPLICATING PROTOCOLS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {!meltdownActive ? (
                        <button
                          type="button"
                          onClick={handleTriggerMeltdown}
                          className="px-3 py-1.5 bg-red-950/40 text-red-500 border border-red-900 font-black text-[10px] rounded hover:bg-red-900/40 hover:scale-[1.01] transition-all uppercase cursor-pointer"
                        >
                          ☣ Trigger Biological Core Overload
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResetMeltdown}
                          className="px-3 py-1.5 bg-emerald-950/40 text-emerald-500 border border-emerald-900 font-black text-[10px] rounded hover:bg-emerald-900/40 hover:scale-[1.01] transition-all uppercase cursor-pointer"
                        >
                          ✔ Avert Meltdown & Restore Core Normalcy
                        </button>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => {
                          LEAAudio.playClick();
                          LEAAudio.stopMusic();
                          setLogs((prev) => [`[${new Date().toLocaleTimeString()}] AUDIO: Audio synths forcefully muted.`, ...prev]);
                        }}
                        className="px-3 py-1.5 bg-stone-900 text-stone-300 border border-stone-800 font-black text-[10px] rounded hover:bg-stone-800 transition-colors uppercase cursor-pointer"
                      >
                        🔇 Silence Authority Audio Synth
                      </button>
                    </div>
                    <span className="text-[8px] text-stone-500 font-bold block uppercase">
                      Allows admins to stress-test the visual matrix grids and trigger experimental warning protocols.
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Diagnostics */}
              <div className="mt-2 text-[9px] text-stone-500 font-serif italic border-t border-stone-850 pt-2 flex justify-between">
                <span>Diag ID: LEA-A82 // STATUS: SECURED</span>
                <span>Security Clearance: LEVEL-4 ARCHIVIST</span>
              </div>
            </div>
          )}

          {/* Footer Terminal Telemetry Logs */}
          <div className="mt-3 bg-black border-2 border-stone-950 p-2 rounded-sm">
            <div className="text-[9px] text-stone-500 font-extrabold uppercase border-b border-stone-950 pb-1 mb-1.5 flex justify-between items-center">
              <span>🖥 LIVE SECURED TELEMETRY LOGS</span>
              <span className="animate-pulse text-stone-600">● ON-LINE</span>
            </div>
            <div className="h-[75px] overflow-y-auto text-[9px] font-mono leading-relaxed space-y-0.5 select-text text-stone-400">
              {logs.map((log, i) => (
                <div key={i} className="font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
