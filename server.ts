import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_FOOD_SAFETY_DOCUMENTS } from './src/data/foodSafetyDocuments';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Build comprehensive grounding catalog for all 33 documents (21 Policies + 12 SOPs)
const FULL_DOCUMENTS_GROUNDING_BRIEF = INITIAL_FOOD_SAFETY_DOCUMENTS.map((doc) => {
  const takeaways = (doc.keyTakeaways || []).map((t) => `  * ${t}`).join('\n');
  const rules = (doc.quickRules || []).map((r) => `  * [${r.type.toUpperCase()}] ${r.title}: ${r.rule}`).join('\n');
  const sectionsBrief = (doc.sections || []).map((s) => `  - ${s.title}: ${s.content}`).join('\n');
  const tablesBrief = doc.tables && doc.tables.length > 0
    ? `  Tables:\n` + doc.tables.map((t) => `    Table "${t.title}": ${t.headers.join(' | ')} -> ${t.rows.map(r => r.join(' / ')).slice(0, 5).join('; ')}`).join('\n')
    : '';

  return `### DOCUMENT: ${doc.code} - ${doc.title}
* Type: ${doc.type.toUpperCase()} | Category: ${doc.category} | Rev: ${doc.revision} | Effective: ${doc.effectiveDate}
* Official Summary: ${doc.summary}
* Key Takeaways:
${takeaways}
* Quick Critical Rules:
${rules}
* Key Policy Sections & Procedures:
${sectionsBrief}
${tablesBrief}
* Signatories: Prepared by ${doc.signatories?.preparedBy || 'QA'}, Reviewed by ${doc.signatories?.reviewedBy?.join(', ') || 'QA/SCM/HR/VP'}, Approved by ${doc.signatories?.approvedBy || 'Jack Julius Tiu (President)'}
----------------------------------------`;
}).join('\n\n');

function getRuleFallbackAnswer(query: string, contextDocTitle?: string, contextDocContent?: string): string {
  const q = query.toLowerCase().trim();

  // 1. Direct document code matching (e.g., IKQA-SOP#011, SOP 11, IKQAP#003, Policy 3, etc.)
  const sopCodeMatch = q.match(/sop[#\s\-_]*0*(\d{1,2})/i);
  const policyCodeMatch = q.match(/(?:policy|ikqap)[#\s\-_]*0*(\d{1,2})/i);

  if (sopCodeMatch) {
    const sopNum = parseInt(sopCodeMatch[1], 10);
    const targetCode = `IKQA-SOP#${sopNum.toString().padStart(3, '0')}`;
    const matchedDoc = INITIAL_FOOD_SAFETY_DOCUMENTS.find((d) => d.code.toUpperCase() === targetCode.toUpperCase());
    if (matchedDoc) {
      return formatDocumentDirectAnswer(matchedDoc);
    }
  }

  if (policyCodeMatch) {
    const policyNum = parseInt(policyCodeMatch[1], 10);
    const targetCode = `IKQAP#${policyNum.toString().padStart(3, '0')}`;
    const matchedDoc = INITIAL_FOOD_SAFETY_DOCUMENTS.find((d) => d.code.toUpperCase() === targetCode.toUpperCase());
    if (matchedDoc) {
      return formatDocumentDirectAnswer(matchedDoc);
    }
  }

  // 2. Specific Kitchen & Compliance Topic Triggers across all 12 SOPs & 21 Policies
  if (q.includes('handwash') || q.includes('hand wash') || q.includes('double wash') || q.includes('bar soap')) {
    return `### **Handwashing & Double Wash Protocol (IKQA-SOP#001)**
* **6-Step 20-Second Technique:** Wet hands with potable water -> Apply liquid antimicrobial soap -> Scrub vigorously for at least 10 seconds (backs of hands, wrists, webbing, nails) -> Rinse thoroughly -> Dry with single-use paper towel or air dryer -> Turn off faucet using the paper towel.
* **Restroom Double Wash Method:** Staff MUST wash hands first inside the comfort room, then immediately perform a second full 20-second wash at the kitchen handwash sink before touching food, clean wares, or equipment.
* **Prohibited Items:** Bar soap is STRICTLY PROHIBITED (it harbors bacterial reservoirs). Only approved liquid antimicrobial dispensers are allowed.
* **Contamination Breach:** Any food touched during an observed handwashing violation is deemed contaminated and must be immediately discarded. Retrain staff immediately.`;
  }

  if (q.includes('retention') || q.includes('food sample') || q.includes('retention sample') || q.includes('5-7 days')) {
    return `### **Food Retention Sample Protocol (IKQA-SOP#011)**
* **Mandatory Daily Sampling (Before Shift Opening):**
  - Hotpot Broths (Signature Spicy & Bone Broth): **100mL - 150mL**
  - Raw Marinated Proteins (Beef, Chicken, Pork): **100g**
  - Proprietary Dipping Sauces: **100g**
  - Potable / RO Ice & Water: **250mL**
* **Packaging & Labeling:** Sterile vacuum-sealed polyethylene bags with tamper-evident seal, marked with date, shift, lot, and collector.
* **Storage & Hold Time:** Kept in dedicated locked QA Retention Freezer (≤-18°C) or Chiller (≤4°C) for **5 to 7 days**.
* **Legal Chain of Custody:** Samples serve as official forensic evidence in the event of customer illness or food poisoning allegations; requires dual sign-off for release.`;
  }

  if (q.includes('wire slicer') || q.includes('luncheon') || q.includes('slicer') || q.includes('luncheon meat')) {
    return `### **Portioning Luncheon Meat with Wire Slicer (IKQA-SOP#012)**
* **Pre-Operational Wire Inspection:** Visually and physically inspect cutting wires for slack, misalignment, rust, or broken strands prior to every shift.
* **Portioning Standard:** Slice luncheon meat evenly to **0.8cm - 1.0cm** thickness.
* **Sanitation Schedule:** Complete disassembly, wash, rinse, and sanitization (100-200 ppm chlorine or 200 ppm Quat) every **4 hours**.
* **Wire Breakage Emergency:** If any wire snaps during slicing, immediately stop, quarantine the entire batch of sliced meat, discard for physical hazard risk, and notify kitchen supervisor/maintenance.`;
  }

  if (q.includes('waste') || q.includes('reject') || q.includes('pulveriz') || q.includes('garbage') || q.includes('trash')) {
    return `### **Waste Management & Product Rejection (IKQA-SOP#009)**
* **Color-Coded Segregation:** Green = Biodegradable; Blue = Recyclable; Black = General / Residual; Yellow = Hazardous / Chemical.
* **Food Reject Pulverization Protocol:** All rejected, spoiled, or recalled food items must be mechanically crushed, pulverized, or doused with colored sanitizer before disposal to prevent illegal salvaging, resale, or pilferage.
* **Brand Protection:** Deface or shred all proprietary branded boxes, labels, and packaging before discarding.
* **Grease Traps:** Inspected daily, skimmed, and thoroughly serviced weekly.`;
  }

  if (q.includes('fefo') || q.includes('fifo') || q.includes('first in') || q.includes('first expiry')) {
    return `### **FEFO & FIFO Storage Protocol (IKQA-SOP#004 & IKQAP#011)**
* **Rule of Precedence:** **FEFO (First-Expiry, First-Out) strictly overrides FIFO**. The item with the shortest remaining shelf life is placed at the front and used first.
* **Stocking Motion:** Back-to-front stocking. Never place newly received goods in front of older inventory.
* **Receiving Labels:** Mandatory tag showing Item Name, Intake Date, Expiry Date, and Lot/Batch Number.
* **Near-Expiry (<48 Hours):** Flagged with yellow highlight stickers and prioritized for immediate production or logged for authorized disposal.`;
  }

  if (q.includes('recall') || q.includes('traceability') || q.includes('mock recall')) {
    return `### **Product Recall & Traceability Protocol (IKQA-SOP#005)**
* **Traceability Mandate:** Achieve "One Step Back" (Supplier, Lot, Delivery Date) and "One Step Forward" (Store, Dispatch, Table POS) within **2 hours**.
* **Quarantine:** Immediately isolate suspect inventory in the designated Quarantine Cage under locked status with a RED "HOLD - RECALL IN PROGRESS" tag.
* **Mock Recalls:** Mandatory unannounced mock recall drills conducted every 6 months with a target completion time of under **4 hours**.`;
  }

  if (q.includes('crisis') || q.includes('cmt') || q.includes('suspension')) {
    return `### **Crisis Management & Incident Escalation (IKQA-SOP#007)**
* **Crisis Management Team (CMT):** Led by Jack Julius Tiu (President), Eric Co (VP Operations), Celine Joy Sanchez (QA Specialist), Anthony Co (HR).
* **3 Incident Phases:** 1. Alert & Assess (0-2 hours), 2. Contain & Respond (2-24 hours), 3. Recovery & Debrief (24-72 hours).
* **Staff Accountability:** Maximum 30-day preventive suspension pending investigation for critical food safety violations; 14-shift probation upon reinstatement.`;
  }

  if (q.includes('training') || q.includes('quiz') || q.includes('refresher') || q.includes('matrix')) {
    return `### **Employee Training & Qualification (IKQA-SOP#006)**
* **3-Tier Training Structure:** 1. Onboarding Induction (40 hours), 2. Role-specific station certification, 3. Annual refresher (8 hours).
* **Passing Standard:** Minimum 80% on written compliance quizzes + 100% on observed hygiene and critical control points.
* **Retraining Requirement:** Failure requires mandatory retraining and re-examination within 48 hours before returning to food prep.`;
  }

  if (q.includes('phone') || q.includes('locker') || q.includes('eyelash') || q.includes('jewelry') || q.includes('personal effect') || q.includes('tumbler')) {
    return `### **Personal Effects & Locker Protocol (IKQA-SOP#008 & IKQAP#012)**
* **Bare Below the Elbows:** No wristwatches, fitness trackers, bracelets, or rings (except one plain smooth wedding band).
* **Cosmetics & Nails:** False eyelashes, eyelash extensions, artificial nails, and nail polish are STRICTLY FORBIDDEN.
* **Cellphones:** Personal mobile phones are completely barred from food production and service lines (high pathogen vector).
* **Lockers & Tumblers:** Street clothes and bags must remain locked in designated lockers. Personal drinking tumblers must be transparent, sealable, and kept at designated hydrations stations away from food prep.`;
  }

  if (q.includes('hygiene') || q.includes('beard') || q.includes('hairnet') || q.includes('nail')) {
    return `### **Personnel Hygiene Standards (IKQA-SOP#002 & IKQAP#012)**
* **Grooming:** Daily bathing; hairnets covering 100% of hair and ears; beard snoods mandatory for facial hair >1.25cm (0.5 inch).
* **Fingernails:** Trimmed short, clean, unpolished, no artificial nails or tips.
* **Physical Contamination:** Stop-and-discard protocol for any food in contact with detached jewelry, false hair, or band-aids.`;
  }

  if (q.includes('15-minute') || q.includes('15 min') || q.includes('intake')) {
    return `### **The 15-Minute Intake Rule (IKQAP#003 & IKQAP#009)**
* **Requirement:** All accepted temperature-sensitive chilled (≤5°C) and frozen (≤-18°C) deliveries must be transferred completely from the loading dock into deep cold storage within **15 minutes** of vehicle arrival.
* **Purpose:** To prevent the product from breaking the cold chain and entering the Temperature Danger Zone (5°C to 60°C).
* **Reference:** Policy IKQAP#003 Section 3.1 & IKQA-SOP#010 Section 6.2.`;
  }

  if (q.includes('towel') || (q.includes('color code') && q.includes('towel'))) {
    return `### **Towel Color-Coding Matrix (IKQAP#015 & IKQA-SOP#010)**
* ⚪ **White:** Clean Wares, Cutlery, Glassware & Plating ONLY (Never touches raw food).
* 🟡 **Yellow:** Employee Handwashing Sink Perimeter ONLY.
* 🔵 **Blue:** Front of House (FOH) Dining Tables, Host Stands & Counters.
* 🟢 **Green:** Back of House (BOH) Kitchen & Active Prep Lines.
* 🔴 **Red:** Restrooms & Sanitary Facilities ONLY.
* ⚠️ **CRITICAL:** A Red or Green towel entering White or Blue areas constitutes an immediate major health code violation! Towels must remain submerged in sanitizer solution between uses.`;
  }

  if (q.includes('cutting board') || q.includes('board')) {
    return `### **Cutting Board Color-Coding (IKQA-SOP#010 Section 5.1)**
* 🔴 **Red:** Raw Meat (Beef, Pork, Lamb)
* 🟡 **Yellow:** Raw Poultry (Chicken, Turkey, Duck)
* 🔵 **Blue:** Raw Seafood (Fish, Shellfish, Squid)
* 🟢 **Green:** Produce (Fresh Fruits and Vegetables)
* 🟤 **Brown:** Dairy & Cooked Foods
* ⚪ **White:** Allergen-Free Orders (Strictly reserved, zero exceptions!)`;
  }

  if (q.includes('plate') || q.includes('meat plate')) {
    return `### **Meat Serving Plates Color Coding (IKQA-SOP#010 Section 5.3)**
* 🔴 **Red & 🟡 Yellow:** Intended for **US Beef**
* 🟤 **Brown & 🟢 Green:** Intended for **Pork Belly**
* 🟠 **Orange:** Intended for **Angus Beef**
* Designed to eliminate confusion between tables and protect against raw juice contact.`;
  }

  if (q.includes('danger zone') || q.includes('temp') || q.includes('cold storage')) {
    return `### **Temperature & Cold Chain Thresholds (IKQAP#001 & #003)**
* ❄️ **Frozen Storage:** -18°C or colder (no ice crystals or soft packaging).
* 🧊 **Cold Storage (Chillers):** 0°C to 4°C (never exceed 5°C).
* ⚠️ **Temperature Danger Zone:** **5°C to 60°C (40°F to 140°F)**. High-risk food must NEVER stay in this range for >1 hour cumulative.
* 🔥 **Internal Reheat / Kill Step:** **74°C (165°F)** minimum core internal temperature.`;
  }

  if (q.includes('allergen') || q.includes('anaphylaxis')) {
    return `### **Big 9 Allergens & Anaphylaxis Protocol (IKQAP#004)**
* **The 9 Major Allergens:** Milk, Eggs, Fish, Crustacean Shellfish, Tree Nuts, Peanuts, Wheat, Soybeans, Sesame.
* **Important Fact:** Cooking DOES NOT eliminate food allergens.
* **Hardware:** Use dedicated **Purple Allergen Tools** and White cutting boards.
* **Emergency Response:**
  1. Call Emergency Services (911/EMS) immediately.
  2. Notify Shift/Restaurant Manager.
  3. Keep dizzy/fainting guests stationary.
  4. **SECURE THE FOOD PLATE** for lab investigation; DO NOT discard.`;
  }

  if (q.includes('sick') || q.includes('illness') || q.includes('exclude') || q.includes('vomit') || q.includes('diarrhea')) {
    return `### **Employee Health & Exclusion Directives (IKQAP#005)**
* **EXCLUSION (Barred from premises):** Vomiting, Diarrhea, Jaundice, or diagnosis of Big 5 pathogens (Salmonella, Shigella, E. Coli, Hepatitis A, Norovirus). Must stay home until symptom-free for 24-48 hours.
* **RESTRICTION (Non-food duties only):** Sore throat with fever, persistent coughing or sneezing.
* **No-Penalty Reporting:** Employees will never be penalized for honestly reporting an illness.`;
  }

  if (q.includes('pest') || q.includes('rat') || q.includes('cockroach') || q.includes('insect') || q.includes('fly')) {
    return `### **Integrated Pest Management (IKQA-SOP#003 & IKQAP#006)**
* **3 Lines of Defense:** Exclusion (seal exterior, max 6mm door sweep gaps, 16-mesh window screens), Restriction (keep food off floor by 15cm/6in and walls by 45cm/18in), Elimination (monthly certified PCO).
* **EFK Positioning:** Electronic fly killers must be placed 2 to 3 meters away from exposed food prep and guest dining tables.
* **Sighting Action:** Log immediately in IQAF-PST logbook; cordon off affected zone and notify PCO for emergency flush-out.`;
  }

  if (q.includes('glass') || q.includes('break')) {
    return `### **Glass & Brittle Plastic Breakage Protocol (IKQAP#017)**
1. **Immediate Shutdown:** Cease all food production in the affected zone right away.
2. **3-Meter Quarantine:** Cordon off a 3-meter (10-ft) radius. Treat all food and packaging inside this zone as contaminated and discard.
3. **Segregated Cleanup:** Use dedicated tools and deposit shards into a labeled "Sharps" container.
4. **Supervisor Sign-Off:** Manager must inspect the zone and complete the Breakage Incident & Cleanup Report (CAR) before restarting.`;
  }

  if (q.includes('thaw') || q.includes('defrost')) {
    return `### **Thawing & Defrosting Protocol (IKQAP#010)**
* **Approved Methods Only:**
  1. Refrigerator at ≤5°C (2-3 days for large roasts)
  2. Submerged in cold running potable water ≤21°C (max 4 hours cumulative)
  3. Microwave (cook immediately)
  4. Part of the cooking process (verify 74°C internal kill step)
* **STRICT PROHIBITION:** Thawing at ambient room temperature or warm water is strictly prohibited.`;
  }

  if (q.includes('calibration') || q.includes('scale') || q.includes('thermometer')) {
    return `### **Equipment Calibration Standards (IKQAP#020)**
* **Probe Thermometers:** Daily verification using Ice Point (0°C ±1°C) or Boiling Point (100°C ±1°C).
* **Kitchen Portion Scales:** Daily test with certified standard test weights (tolerance ±2g).
* **Corrective Formula:** Actual Reading = Displayed Value - Calibrated Instrument Offset Error.`;
  }

  // 3. Search document titles & summaries for relevant matches
  const keywordDoc = INITIAL_FOOD_SAFETY_DOCUMENTS.find((d) => {
    const codeMatch = d.code.toLowerCase().includes(q);
    const titleMatch = d.title.toLowerCase().includes(q);
    const tagMatch = d.tags.some((t) => q.includes(t.toLowerCase()));
    return codeMatch || titleMatch || tagMatch;
  });

  if (keywordDoc) {
    return formatDocumentDirectAnswer(keywordDoc);
  }

  // General Company Fallback
  return `### **Imperial Kitchen Group Compliance Guidance**
Covering all **33 documents** (21 Policies: IKQAP#001 - #021 and 12 SOPs: IKQA-SOP#001 - #012):
* **Cold Storage & Danger Zone:** ≤4°C chillers, ≤-18°C freezers; 15-Minute Intake Rule; Never exceed 1 hour in Danger Zone (5°C to 60°C).
* **Sanitation & Hygiene:** 20-second handwashing + Restroom Double Wash (IKQA-SOP#001); beard snoods >1.25cm (IKQA-SOP#002); no personal phones on prep line (IKQA-SOP#008).
* **Hardware Matrix:** Red (raw meat), Yellow (poultry), Blue (seafood), Green (produce), Brown (dairy/cooked), White (allergens). Towels: Blue (FOH), Yellow (sink), Green (kitchen), White (wares), Red (restroom).
* **Storage & Inventory:** FEFO strictly overrides FIFO (IKQA-SOP#004); 48-hr near expiry prioritization.
* **Daily Retention Samples:** 100-150mL broth, 100g protein held for 5-7 days under lock (IKQA-SOP#011).
* **Wire Slicers & Equipment:** Inspect wires every shift; 0.8-1.0cm slice; discard batch if wire snaps (IKQA-SOP#012).`;
}

function formatDocumentDirectAnswer(doc: any): string {
  const takeaways = doc.keyTakeaways.map((t: string) => `* ${t}`).join('\n');
  const rules = doc.quickRules.map((r: any) => `* **[${r.type.toUpperCase()}] ${r.title}:** ${r.rule}`).join('\n');
  return `### **${doc.code}: ${doc.title}**
* **Type:** ${doc.type.toUpperCase()} | **Category:** ${doc.category} | **Revision:** ${doc.revision}
* **Summary:** ${doc.summary}

#### **Core Requirements & Key Takeaways:**
${takeaways}

#### **Mandatory Control Rules:**
${rules}

* **Authorized Signatories:** Prepared by ${doc.signatories?.preparedBy || 'QA'}, Approved by ${doc.signatories?.approvedBy || 'Jack Julius Tiu (President)'}.`;
}

// Endpoint for Gemini 3.8 Flash TTS
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore', style } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const trimmedText = text.trim().slice(0, 2500);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: trimmedText,
              speechMetadata: {
                style: style || 'Clear, professional, and reassuring food safety compliance auditor',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: ['Kore', 'Puck', 'Fenrir', 'Zephyr', 'Charon'].includes(voice) ? voice : 'Kore',
            },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio data received from Gemini TTS model');
    }

    return res.json({
      audio: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('Error generating TTS:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate speech with Gemini TTS',
    });
  }
});

// MULTI-TURN STREAMING CHATBOT ENDPOINT (Fast responses with gemini-3.1-flash-lite & SSE)
app.post('/api/chat/stream', async (req, res) => {
  const { message, history = [], speedMode = 'fast', contextDocTitle, contextDocContent } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Model selection based on feature spec:
  // - 'fast': gemini-3.1-flash-lite (default for lightning-fast sub-second responses)
  // - 'standard': gemini-3.8-flash (general tasks)
  // - 'complex': gemini-4-argon (complex audits/investigations)
  let selectedModel = 'gemini-3.1-flash-lite';
  if (speedMode === 'standard') {
    selectedModel = 'gemini-3.8-flash';
  } else if (speedMode === 'complex') {
    selectedModel = 'gemini-4-argon';
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  const systemInstruction = `You are the Imperial Kitchen Group Inc. (Jiangnan Hotpot) Food Safety & Compliance Intelligence Officer.
Provide lightning-fast, practical, and legally compliant answers to kitchen, warehouse, and service staff.
Your knowledge base covers ALL 33 official company documents in file:
- 21 Company Policies: IKQAP#001 through IKQAP#021
- 12 Standard Operating Procedures: IKQA-SOP#001 through IKQA-SOP#012
As well as Philippine Food Safety Act of 2013 (RA 10611), Code on Sanitation (PD 856), and NMIS regulations.

Official Company Knowledge Base (All 33 Documents):
${FULL_DOCUMENTS_GROUNDING_BRIEF}

${contextDocTitle ? `Current Document In Focus: ${contextDocTitle}` : ''}
${contextDocContent ? `Document Details:\n${contextDocContent.slice(0, 3000)}` : ''}

Instructions:
1. Provide a direct, actionable answer with clean markdown bullet points and bold highlights.
2. Keep responses fast, concise, and operational for busy kitchen and warehouse staff.
3. Highlight critical control numbers (temperatures like 4°C, 5°C, 60°C, 74°C, 15-minute cold chain rule, Big 9 allergens, 5-7 days retention, 0.8-1.0cm wire slicer thickness, towel/board color codes).
4. Always cite the exact document code (e.g., IKQAP#001 to #021, IKQA-SOP#001 to #012).
5. Maintain multi-turn conversational context with the user.`;

  try {
    // Format conversation history for @google/genai chats
    const formattedHistory = (Array.isArray(history) ? history : []).map((h: any) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: typeof h.text === 'string' ? h.text : String(h.text || '') }],
    }));

    const chat = ai.chats.create({
      model: selectedModel,
      config: {
        systemInstruction,
      },
      history: formattedHistory,
    });

    const stream = await chat.sendMessageStream({
      message,
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    return res.end();
  } catch (error: any) {
    console.warn(`Chat streaming failed with ${selectedModel}, falling back:`, error.message);
    const fallbackText = getRuleFallbackAnswer(message, contextDocTitle, contextDocContent);
    res.write(`data: ${JSON.stringify({ text: fallbackText, isFallback: true })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }
});

// Single-turn / Non-streaming Compliance Q&A Assistant
app.post('/api/compliance-assistant', async (req, res) => {
  const { question, history = [], speedMode = 'fast', contextDocTitle, contextDocContent } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  // Model selection: use gemini-3.1-flash-lite by default for fastest responses
  let selectedModel = 'gemini-3.1-flash-lite';
  if (speedMode === 'standard') {
    selectedModel = 'gemini-3.8-flash';
  } else if (speedMode === 'complex') {
    selectedModel = 'gemini-4-argon';
  }

  try {
    const prompt = `You are the Imperial Kitchen Group Inc. (Jiangnan Hotpot) Food Safety & Compliance Intelligence Assistant.
Assist restaurant, kitchen, warehouse, and service staff with fast, accurate, and actionable compliance guidance.
Base your answer on the complete database of 33 documents (21 Policies: IKQAP#001 to #021 and 12 SOPs: IKQA-SOP#001 to #012) and RA 10611 / PD 856.

Official Company Knowledge Base (All 33 Documents):
${FULL_DOCUMENTS_GROUNDING_BRIEF}

${contextDocTitle ? `Current Document Being Viewed: ${contextDocTitle}` : ''}
${contextDocContent ? `Document Excerpt/Context:\n${contextDocContent.slice(0, 3000)}` : ''}

Staff Query:
${question}

Instructions:
1. Provide a direct, practical, and clear response with markdown formatting (bullet points, bold highlights).
2. Keep it crisp, accurate, and fast.
3. Highlight critical control numbers (temperatures like 4°C, 5°C, 60°C, 74°C, 15-minute cold chain rule, Big 9 allergens, 5-7 days sample retention, 0.8-1.0cm slicer thickness, towel/board color codes).
4. Always cite the exact document number (e.g. IKQAP#001 to #021, IKQA-SOP#001 to #012).
5. Emphasize immediate corrective actions if an infraction or spill occurred.`;

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
    });

    const answer = response.text || getRuleFallbackAnswer(question, contextDocTitle, contextDocContent);
    return res.json({ answer, modelUsed: selectedModel });
  } catch (error: any) {
    console.warn('Gemini compliance call fallback triggered:', error.message);
    const fallbackAnswer = getRuleFallbackAnswer(question, contextDocTitle, contextDocContent);
    return res.json({
      answer: fallbackAnswer,
      isFallback: true,
      modelUsed: 'local-knowledge-base',
    });
  }
});

// Serve Vite in dev or static files in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Food Safety Compliance app listening on http://0.0.0.0:${PORT}`);
});
