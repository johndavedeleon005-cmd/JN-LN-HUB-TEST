import React, { useState } from 'react';
import {
  Thermometer,
  ShieldAlert,
  Layers,
  Sparkles,
  AlertTriangle,
  Scale,
  Clock,
  CheckCircle2,
  AlertCircle,
  Volume2,
} from 'lucide-react';

export const QuickReferenceView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'towels' | 'boards' | 'temperatures' | 'allergens' | 'storage' | 'calibration'
  >('towels');

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-800/40 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
            Floor Compliance Cheat-Sheets
          </h2>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Instant visual standards for Jiangnan Hotpot kitchen lines, receiving bays, and dining service.
        </p>
      </div>

      {/* Pill Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { id: 'towels', label: '🧼 Towel Matrix', sub: 'IKQAP#015' },
          { id: 'boards', label: '🥩 Cutting Boards & Plates', sub: 'SOP#010' },
          { id: 'temperatures', label: '❄️ Cold Chain & Temps', sub: 'IKQAP#003' },
          { id: 'allergens', label: '⚠️ Big 9 Allergens', sub: 'IKQAP#004' },
          { id: 'storage', label: '📦 Storage Hierarchy 5S', sub: 'IKQAP#011' },
          { id: 'calibration', label: '⚖️ Calibration Tolerances', sub: 'IKQAP#020' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap font-bold flex flex-col items-center gap-0.5 transition-all ${
              activeSection === sec.id
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{sec.label}</span>
            <span className="text-[10px] font-mono opacity-80">{sec.sub}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1: TOWEL MANAGEMENT MATRIX */}
      {activeSection === 'towels' && (
        <div className="space-y-3">
          <div className="p-3 bg-red-950/40 border border-red-700/50 rounded-xl flex items-start gap-2 text-xs text-red-200">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300">STRICT CROSS-CONTAMINATION RULE:</strong> A single incident of a Red (Restroom) or Green (Kitchen) towel crossing into White (Wares) or Blue (FOH) zones constitutes an immediate major health code breach.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                color: 'White',
                border: 'border-slate-300/40',
                bg: 'bg-slate-100 text-slate-950',
                badge: 'bg-slate-800 text-white',
                title: 'Clean Wares & Cutlery',
                desc: 'Reserved exclusively for handling, polishing, or drying clean sanitized smallwares, glassware, cutlery, and cooking utensils.',
                caution: 'Must NEVER contact raw food or uncleaned surfaces.',
              },
              {
                color: 'Yellow',
                border: 'border-yellow-500/40',
                bg: 'bg-yellow-400 text-yellow-950',
                badge: 'bg-yellow-900 text-yellow-200',
                title: 'Handwashing Stations',
                desc: 'Strictly for dedicated employee handwashing sinks. Used solely for drying clean hands or wiping sink basin perimeter.',
                caution: 'Never used on dining tables or food prep boards.',
              },
              {
                color: 'Blue',
                border: 'border-blue-500/40',
                bg: 'bg-blue-600 text-white',
                badge: 'bg-blue-950 text-blue-200',
                title: 'Front of House (FOH)',
                desc: 'Utilized for guest-facing areas: dining tables, host stands, bar counters, booths, and service ledges.',
                caution: 'Maintain clean deployment; keep discrete from patrons.',
              },
              {
                color: 'Green',
                border: 'border-emerald-500/40',
                bg: 'bg-emerald-600 text-white',
                badge: 'bg-emerald-950 text-emerald-200',
                title: 'Kitchen & Prep Lines (BOH)',
                desc: 'Dedicated to general BOH environments, hot line stations, prep tables, and cutting boards.',
                caution: 'Rotate when shifting from vegetable prep to allergen zones.',
              },
              {
                color: 'Red',
                border: 'border-red-600/70',
                bg: 'bg-red-600 text-white',
                badge: 'bg-red-950 text-red-200',
                title: 'Restrooms & Sanitation ONLY',
                desc: 'Strictly confined to restroom facilities for cleaning toilets, sinks, fixtures, or vanity surfaces.',
                caution: 'UNDER NO CIRCUMSTANCE MAY A RED TOWEL LEAVE RESTROOM.',
              },
            ].map((towel, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full shadow-md ${towel.bg}`} />
                    <h4 className="text-sm font-bold text-white">{towel.color} Towel</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${towel.badge}`}>
                    {towel.title}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{towel.desc}</p>
                <div className="text-[11px] font-semibold text-amber-300/90 pt-1 border-t border-slate-800/80">
                  ⚠️ {towel.caution}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-white block">Thermal Laundering Protocol:</span>
            <p>1. Scrub with industrial detergent at 45°C - 50°C. 2. Submerge in static hot water bath at ≥71°C (160°F) for at least 25 minutes. 3. Hang until 100% bone-dry.</p>
          </div>
        </div>
      )}

      {/* SECTION 2: CUTTING BOARDS & SERVING PLATES */}
      {activeSection === 'boards' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-400" />
              <span>Cutting Board Color Code Matrix (IKQA-SOP#010)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                { color: 'Red', hex: '#ef4444', food: 'Raw Meat', items: 'Beef, Pork, Lamb' },
                { color: 'Yellow', hex: '#eab308', food: 'Raw Poultry', items: 'Chicken, Turkey, Duck' },
                { color: 'Blue', hex: '#3b82f6', food: 'Raw Seafood', items: 'Fish, Shellfish, Squid' },
                { color: 'Green', hex: '#22c55e', food: 'Produce', items: 'Fresh Vegetables & Fruits' },
                { color: 'Brown', hex: '#a16207', food: 'Cooked Foods & Dairy', items: 'Cooked meats, cheeses, prepared sides' },
                { color: 'White', hex: '#f8fafc', food: 'Allergen-Free Orders', items: 'STRICTLY RESERVED for special allergy orders' },
              ].map((board, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-md flex-shrink-0"
                    style={{
                      backgroundColor: board.hex,
                      color: board.color === 'White' || board.color === 'Yellow' ? '#0f172a' : '#ffffff',
                    }}
                  >
                    {board.color.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block">{board.food}</span>
                    <span className="text-[11px] text-slate-400 truncate block">{board.items}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meat Serving Plates */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Meat Serving Plate Color Matrix (IKQA-SOP#010 Section 5.3)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Guarantees zero confusion between guest tables and prevents raw juice cross-contact:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="w-7 h-7 rounded-full bg-red-600 border-2 border-slate-950 shadow" />
                  <span className="w-7 h-7 rounded-full bg-yellow-500 border-2 border-slate-950 shadow" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">US Beef</span>
                  <span className="text-[10px] text-red-400 font-mono">Red & Yellow Plates</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="w-7 h-7 rounded-full bg-amber-800 border-2 border-slate-950 shadow" />
                  <span className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-slate-950 shadow" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Pork Belly</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Brown & Green Plates</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-orange-500 border-2 border-slate-950 shadow" />
                <div>
                  <span className="text-xs font-bold text-white block">Angus Beef</span>
                  <span className="text-[10px] text-orange-400 font-mono">Orange Plates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TEMPERATURES & COLD CHAIN */}
      {activeSection === 'temperatures' && (
        <div className="space-y-4">
          {/* Critical Thresholds */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <span>Critical Temperature Thresholds (IKQAP#001 & #003)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50">
                <span className="text-[10px] uppercase font-bold text-cyan-300 block">Frozen Storage</span>
                <span className="text-lg font-black text-cyan-200 block">-18°C or below</span>
                <span className="text-[10px] text-slate-400">Zero ice crystals or wet boxes</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/50">
                <span className="text-[10px] uppercase font-bold text-blue-300 block">Cold Storage & Receiving</span>
                <span className="text-lg font-black text-blue-200 block">4°C - 5°C or below</span>
                <span className="text-[10px] text-slate-400">Vertical fridge 3°C - 5°C</span>
              </div>

              <div className="p-3 rounded-xl bg-red-950/60 border border-red-700/60">
                <span className="text-[10px] uppercase font-bold text-red-300 block">Temperature Danger Zone</span>
                <span className="text-lg font-black text-red-400 block">5°C to 60°C</span>
                <span className="text-[10px] text-red-200 font-bold">MAX 1 HOUR cumulative!</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Kill Step / Cooked-Only</span>
                <span className="text-lg font-black text-amber-300 block">74°C (165°F)</span>
                <span className="text-[10px] text-slate-400">Internal core thermal target</span>
              </div>
            </div>
          </div>

          {/* Time Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white">The 15-Minute Intake Rule</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All accepted refrigerated and frozen deliveries must be transferred from the loading dock into deep cold storage within <strong>15 minutes of truck arrival</strong>.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white">The 30-Minute Batch Prepping Rule</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                During production, kitchen staff can only remove from refrigeration the exact amount of food that can be realistically prepped within a <strong>30-minute window</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: BIG 9 ALLERGENS */}
      {activeSection === 'allergens' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>The 9 Major Allergens (FDA & CODEX - IKQAP#004)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'Milk / Dairy', icon: '🥛', examples: 'Cheese, butter, cream' },
                { name: 'Eggs', icon: '🥚', examples: 'Egg noodles, mayonnaise' },
                { name: 'Fish', icon: '🐟', examples: 'Fish sauce, broth, fillet' },
                { name: 'Shellfish', icon: '🦐', examples: 'Shrimp, crab, lobster, clams' },
                { name: 'Tree Nuts', icon: '🌰', examples: 'Almonds, cashews, walnuts' },
                { name: 'Peanuts', icon: '🥜', examples: 'Peanut dipping sauce, oils' },
                { name: 'Wheat / Gluten', icon: '🌾', examples: 'Wheat noodles, flour batter' },
                { name: 'Soybeans', icon: '🌱', examples: 'Tofu, soy sauce, bean paste' },
                { name: 'Sesame', icon: '🫘', examples: 'Sesame oil, dipping paste' },
              ].map((all, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-purple-900/40">
                  <div className="text-lg">{all.icon}</div>
                  <span className="text-xs font-bold text-white block mt-1">{all.name}</span>
                  <span className="text-[10px] text-slate-400 block">{all.examples}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-red-300 uppercase tracking-wide">
              Anaphylaxis Emergency Response (IKQAP#004 Section 7)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-red-400 block mb-1">1. Call EMS</span>
                <p className="text-slate-300">Dial 911 / emergency services immediately.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">2. Notify Manager</span>
                <p className="text-slate-300">Alert Shift and Restaurant Manager on duty.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">3. Keep Stationary</span>
                <p className="text-slate-300">Do not move the guest if dizzy or fainting.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">4. Secure Food</span>
                <p className="text-slate-300">Keep plate for lab testing; DO NOT discard.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: 5S STORAGE HIERARCHY */}
      {activeSection === 'storage' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Upright Chiller Vertical Shelf Hierarchy (IKQAP#011)</span>
            </h3>

            {/* Visual Rack Illustration */}
            <div className="space-y-2 pt-1">
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-300">TOP SHELVES (Ready-to-Eat / Cooked)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-200">Zero Raw Juices</span>
                </div>
                <p className="text-xs text-slate-300">
                  Cooked broths, dipping sauce blends, condiments, and pre-portioned cooked side items in clear, tightly sealed lidded plastic boxes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-300">MIDDLE SHELVES (Fresh Produce & Leafy Greens)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900 text-blue-200">Airflow baskets</span>
                </div>
                <p className="text-xs text-slate-300">
                  Washed and portioned vegetables organized into uniform, perforated plastic baskets to allow air circulation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-300">LOWER SHELVES / DEDICATED (Raw Proteins)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900 text-red-200">Bottom Racks Only</span>
                </div>
                <p className="text-xs text-slate-300">
                  Raw sliced meats, hotpot meatballs, raw seafood. NEVER placed above cooked items or raw vegetables.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center text-xs text-amber-400 font-semibold">
                ⬇️ FLOOR CLEARANCE: Minimum 6 inches (15 cm) from ground. Nothing sits directly on floor!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CALIBRATION TOLERANCES */}
      {activeSection === 'calibration' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Daily Pre-Shift Calibration Checks (IKQAP#020)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300 block">🧊 Ice-Point Method (Cold Verification)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. Place probe directly into center of crushed ice water bath.<br />
                  2. Keep submerged for 30 seconds without touching container sides.<br />
                  3. Display must read <strong>0°C (32°F) ± 2°C</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300 block">🔥 Boiling-Point Method (Hot Verification)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. Place probe into boiling water.<br />
                  2. Keep submerged for 30 seconds without touching sides.<br />
                  3. Display must read <strong>100°C (212°F) ± 2°C</strong>.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong className="text-white block mb-1">Correction Factor Calculation:</strong>
              <code>{'{Actual Measurement} = {Equipment Reading} - {Highest Error in Reading}'}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
