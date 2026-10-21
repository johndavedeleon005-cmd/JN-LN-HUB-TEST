import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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

// Grounding reference for Imperial Kitchen Group / Jiangnan Hotpot Food Safety
const POLICY_GROUNDING_BRIEF = `
COMPANY COMPLIANCE DATABASE (IMPERIAL KITCHEN GROUP INC. / JIANGNAN HOTPOT):
- IKQAP#001 (Food Safety Policy): RA 10611, NMIS accreditation, CLAYGO, Danger Zone 5°C-60°C max 1 hr, cold storage ≤4°C, quarterly internal audits, non-compliance tiers (minor, major, critical).
- IKQAP#002 (Customer Complaint Policy): Category A (food poisoning, allergy, physical injury) triggers 24-hr internal audit, freezer sample quarantine, RA 10173 privacy consent. Category B (taste, temp, service).
- IKQAP#003 (Cold Chain Management): Rejection if chilled >5°C, frozen >-18°C or ice crystals. 15-Minute Intake Rule (dock to freezer ≤15 mins). Batch prep 30-min window. Thaw at ≤4°C fridge or running water ≤21°C. Power halt: <1h re-chill, 1-3h (<25°C) cook to 74°C, 3h in hot kitchen (>30°C) DISCARD.
- IKQAP#004 (Allergen Management): Big 9 allergens (Milk, Eggs, Fish, Crustaceans, Tree Nuts, Peanuts, Wheat, Soy, Sesame). Cooking DOES NOT remove allergens. Dedicated Purple tools. Store allergens BELOW non-allergens. Bold POS flagging. Manager personal table delivery. Anaphylaxis: Call 911, notify manager, keep still, secure food plate.
- IKQAP#005 (Employee Health & Exclusion): PD 856 Sanitary permit. Mandatory symptoms: Diarrhea, Vomiting, Jaundice, Sore throat with fever, Infected wounds. Exclusion (Big 5: Salmonella, Shigella, E. Coli, Hep A, Norovirus) = stay home. Restriction (sore throat/fever) = no food handling. Fit to work: 24-48h asymptomatic. No-Penalty Reporting.
- IKQAP#006 (Pest Control): Zero tolerance. Exclusion (tight door sweeps, fly screens, air curtains ON during deliveries). Restriction (15cm/6in floor clearance & off walls). Destruction (licensed PCO monthly, no toxic bait in food zones). Pest sighting log.
- IKQAP#007 (Chemical Storage & Handling): Absolute isolation from food/packaging. Dedicated locked cabinet. Secondary containment spill trays. 24/7 SDS folder. Secondary labeling on spray bottles (name & dilution). Never repurpose food containers. Tag contaminated food DO NOT CONSUME.
- IKQAP#008 (Approved Supplier Policy): Only source from Approved Supplier List (ASL). FDA LTO, CPR, LGU permits. High-risk foods need on-site QA audit. First 3 deliveries COA. One-step-back traceability.
- IKQAP#009 (Receiving Inspection): Verify LTO, CPR, clean dedicated vehicle, perishables <5°C, frozen <-18°C. QA retention samples archived. Red "HOLD" sticker for quarantine. Keep records 2 years or expiry+1yr.
- IKQAP#010 (Thawing Policy): ONLY 4 approved methods: 1. Refrigerator ≤5°C (2-3 days large meat), 2. Cold running water ≤21°C (max 4h cumulative), 3. Microwave (cook immediately), 4. Part of cooking (verify kill step). Room temp thawing is STRICTLY PROHIBITED. Label: Name, Date, Use-by (48-72h). Rework: Cooked-Only ≥74°C, 1.5cm clean trim.
- IKQAP#011 (Storage Hierarchy Policy): 5S Framework (Sort, Set in order, Shine, Standardize, Sustain). Upright Chiller: Top = Cooked/RTE/Broths; Middle = Produce in perforated baskets; Bottom = Raw meat & seafood. 6-inch clearance from floor. FIFO rotation. Color-coded bins (red, yellow, orange, green, brown).
- IKQAP#012 (Personal Hygiene & Uniform): Daily bathing, clean nails, no heavy scent/jewelry. Closed-toe non-slip shoes. Department uniforms (Head office, Managers, FOH, BOH Kitchen, Dishwasher, Maintenance). Progressive disciplinary matrix.
- IKQAP#013 (Visitor & Contractor Policy): Security access, health screening, button count before & after entry, empty pockets, hairnets/beard snoods, lint-rolled lab gowns, no personal glass or phones in plant. Visitors logbook.
- IKQAP#014 (Preventive Maintenance): Master Maintenance Schedule (MMS). NSF H1 food-grade lubricants only. No temporary tape/wire. Calibrations traceable to NIST. Orange Tag isolation. Clean Break: Repair -> Sanitation -> QA ATP Swab -> CAR sign-off.
- IKQAP#015 (Towel Management): 5 Colors: White = Clean Wares & Cutlery; Yellow = Handwash Sink Perimeter; Blue = Front of House Dining & Tables; Green = BOH Kitchen & Prep Lines; Red = Restrooms & Sanitary ONLY (Never cross into food zone). Submerged in sanitizer between uses. Wash 45-50°C, 71°C static hot bath for 25 mins, dry 100% bone-dry.
- IKQAP#016 (Records Retention): Traceability/COA: 2 years or shelf-life+6mo. Daily ops & temp logs: 1 year. Sanitation: 2 years. Personnel/health: Employment+1yr. Incidents/audits: 3 years. Active on-site binders 0-6 months.
- IKQAP#017 (Glass & Brittle Plastic): Zero personal glass. Master register with shatterproof covers. Daily crack inspection on acrylics. Breakage: Immediate shutdown, 3-meter quarantine radius, sharps container, supervisor CAR clearance.
- IKQAP#018 (Good Manufacturing Practices): 20-second handwashing + Restroom Double Wash method. Clean-as-you-go. Sanitize contact surfaces min twice per shift. Daily drain scrubbing. Clean Zone RPC sanitization.
- IKQAP#019 (Food Fraud Policy): Truth in Menu. Prevent Economically Motivated Adulteration (Wagyu, Angus beef, seafood species). Physical check at delivery. No unauthorized substitution without guest notification.
- IKQAP#020 (Equipment Calibration): Scales (<5kg, ≥5kg, 300kg) checked daily ±2g. Probe thermometers checked daily via Ice-point (0°C ±2°C) or Boiling-point (100°C ±2°C). Infrared ±2°C. Out of service tagging. Actual = Reading - Highest Error.
- IKQAP#021 (Good Warehousing Practices): Facility security, IPM, humidity control, shatterproof lighting, interlocking pallet stacks with stretch-wrap, aisle floor markings, daily MHE forklift safety check.
- IKQA-SOP#010 (Cross-Contamination SOP): Hardware color coding: Red board = Raw Meat, Yellow board = Raw Poultry, Blue board = Raw Seafood, Green board = Produce, Brown board = Dairy & Cooked, White board = Allergen-Free Only. Meat plates: Red/Yellow = US Beef, Brown/Green = Pork Belly, Orange = Angus Beef. Cooking line boundary with separate grill tongs.
`;

function getRuleFallbackAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('15-minute') || q.includes('15 min') || q.includes('intake')) {
    return `### **The 15-Minute Intake Rule (IKQAP#003 & IKQAP#009)**
* **Requirement:** All accepted temperature-sensitive chilled (≤5°C) and frozen (≤-18°C) deliveries must be transferred completely from the loading dock into deep cold storage within **15 minutes** of vehicle arrival.
* **Purpose:** To prevent the product from breaking the cold chain and entering the Temperature Danger Zone (5°C to 60°C).
* **Reference:** Policy IKQAP#003 Section 3.1 & IKQA-SOP#010 Section 6.2.`;
  }
  if (q.includes('towel') || (q.includes('color code') && q.includes('towel'))) {
    return `### **Towel Color-Coding Matrix (IKQAP#015)**
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
  if (q.includes('glass') || q.includes('break')) {
    return `### **Glass & Brittle Plastic Breakage Protocol (IKQAP#017)**
1. **Immediate Shutdown:** Cease all food production in the affected zone right away.
2. **3-Meter Quarantine:** Cordon off a 3-meter (10-ft) radius. Treat all food and packaging inside this zone as contaminated and discard.
3. **Segregated Cleanup:** Use dedicated tools and deposit shards into a labeled "Sharps" container.
4. **Supervisor Sign-Off:** Manager must inspect the zone and complete the Breakage Incident & Cleanup Report (CAR) before restarting.`;
  }
  return `### **Imperial Kitchen Group Compliance Guidance**
Based on company policies (IKQAP#001 to #021) and the Food Safety Act of 2013 (RA 10611):
* Maintain strict cold chain control (≤4°C chillers, ≤-18°C freezers, max 1 hour in 5°C-60°C Danger Zone).
* Follow the 15-Minute Intake Rule and 30-Minute Batch Prepping principle.
* Adhere to color-coded cutting boards and towels (White for clean wares, Blue for FOH, Green for kitchen, Red for restroom only).
* Practice continuous "Clean as you Go" (CLAYGO) and the Restroom Double Wash method.`;
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
Knowledge base includes RA 10611, PD 856, IKQAP#001 to #021 and IKQA-SOP#010.

Official Company Knowledge:
${POLICY_GROUNDING_BRIEF}

${contextDocTitle ? `Current Document In Focus: ${contextDocTitle}` : ''}
${contextDocContent ? `Document Details:\n${contextDocContent.slice(0, 2000)}` : ''}

Instructions:
1. Provide a direct, actionable answer with clean markdown bullet points and bold highlights.
2. Keep responses fast and to the point.
3. Highlight critical control numbers (temperatures like 4°C, 5°C, 60°C, 74°C, 15-minute cold chain rule, Big 9 allergens, towel/board color codes).
4. Always cite the exact policy document number (e.g., IKQAP#003, IKQAP#015, IKQAP#004, IKQA-SOP#010).
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
    const fallbackText = getRuleFallbackAnswer(message);
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
Base your answer on Philippine Food Safety Act of 2013 (RA 10611), Code on Sanitation of the Philippines (PD 856), and company policies (IKQAP#001 to #021 and IKQA-SOP#010).

Official Company Knowledge Base:
${POLICY_GROUNDING_BRIEF}

${contextDocTitle ? `Current Document Being Viewed: ${contextDocTitle}` : ''}
${contextDocContent ? `Document Excerpt/Context:\n${contextDocContent.slice(0, 3000)}` : ''}

Staff Query:
${question}

Instructions:
1. Provide a direct, practical, and clear response with markdown formatting (bullet points, bold highlights).
2. Keep it crisp and fast.
3. Highlight critical control numbers (temperatures like 4°C, 5°C, 60°C, 74°C, 15-minute cold chain rule, Big 9 allergens, towel/board color codes).
4. Always cite the exact policy document number (e.g. IKQAP#003 for Cold Chain, IKQAP#015 for Towels, IKQAP#004 for Allergens, IKQA-SOP#010 for Cross-Contamination).
5. Emphasize immediate corrective actions if an infraction or spill occurred.`;

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
    });

    const answer = response.text || getRuleFallbackAnswer(question);
    return res.json({ answer, modelUsed: selectedModel });
  } catch (error: any) {
    console.warn('Gemini compliance call fallback triggered:', error.message);
    const fallbackAnswer = getRuleFallbackAnswer(question);
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
