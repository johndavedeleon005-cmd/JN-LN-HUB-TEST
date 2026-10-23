import React, { useState } from 'react';
import { FoodSafetyDoc } from '../types/foodSafety';
import {
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  BookOpen,
  UserCheck,
  MessageSquare,
  AlertTriangle,
  Award,
  ChevronRight,
  Flame,
  Clock,
  Receipt,
  Utensils,
  ShieldAlert,
  HelpCircle,
  CheckSquare,
  ArrowRight,
  Star,
} from 'lucide-react';
import { TrainingCertificateModal } from './TrainingCertificateModal';

interface ReceptionistChecklistGameProps {
  documents: FoodSafetyDoc[];
  staffName: string;
  staffPosition?: string;
  staffBranch?: string;
  onOpenDoc: (doc: FoodSafetyDoc) => void;
}

interface SimulationStep {
  id: string;
  sectionCode: string;
  sectionTitle: string;
  guestAvatar: string;
  guestName: string;
  guestContext: string;
  guestDialogue: string;
  taskPrompt: string;
  options: {
    id: string;
    scriptOrAction: string;
    tag: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  billOutCheck?: {
    label: string;
    correctValue: string;
    choices: string[];
  };
}

const SIMULATION_SCENARIOS: SimulationStep[] = [
  {
    id: 'step-1',
    sectionCode: 'SECTION I (Task 1.1)',
    sectionTitle: 'Initial Greeting & Accommodation',
    guestAvatar: '👨‍👩‍👧‍👦',
    guestName: 'Ms. Reyes & Family (5 Pax)',
    guestContext: 'Walk-in guests arriving at the Jiang Nan reception podium on a Wednesday afternoon.',
    guestDialogue: '"Good afternoon! Table for 5, please. We’ve eaten at your Makati branch before!"',
    taskPrompt:
      'How must you greet the guest and respond once they mention they have dined with Jiang Nan before?',
    options: [
      {
        id: '1a',
        scriptOrAction:
          '"Ni Hao! Welcome to Jiang Nan! Is this your first time dining with us po?" → Since they are returning: "Welcome back po!"',
        tag: 'Official Script 1.1',
        isCorrect: true,
        feedback:
          'Exact match! Task 1.1 requires greeting every guest warmly with "Ni Hao! Welcome to Jiang Nan! Is this your first time dining with us po?" and replying "Welcome back po!" to returning guests.',
      },
      {
        id: '1b',
        scriptOrAction:
          '"Hi, how many pax? Sit anywhere you want since you already know our menu."',
        tag: 'Incomplete Greeting',
        isCorrect: false,
        feedback:
          'Incorrect. You skipped the mandatory "Ni Hao! Welcome to Jiang Nan!" greeting and failed to verify table readiness first.',
      },
      {
        id: '1c',
        scriptOrAction:
          '"Welcome po! Please go straight to the cashier to pay before we talk."',
        tag: 'Wrong Sequence',
        isCorrect: false,
        feedback:
          'Incorrect. Dine-in guests do not pay before greeting and guest details verification.',
      },
    ],
  },
  {
    id: 'step-2',
    sectionCode: 'SECTION II (Tasks 2.1 & 2.2)',
    sectionTitle: 'Guest Details Verification & Waitlist Protocol',
    guestAvatar: '👨‍👩‍👧‍👦',
    guestName: 'Ms. Reyes & Family (5 Pax)',
    guestContext: 'You check with the assigned Server and learn all 6-seater tables are currently occupied for the next 15 minutes.',
    guestDialogue: '"Oh, are there any tables open right now for 5 of us?"',
    taskPrompt:
      'What details must you confirm, and what is the mandatory protocol when no table is immediately available?',
    options: [
      {
        id: '2a',
        scriptOrAction:
          'Confirm Name, Pax (5), & Preferred Payment Method (Cash, Credit/Debit Card, or GCash). Record on the approved waitlist, state the ~15 min estimated wait time, hand them the menu, explain policies/reminders, and monitor waiting guests.',
        tag: 'Full Task 2.1 & 2.2',
        isCorrect: true,
        feedback:
          'Spot on! Section II requires confirming name, pax, and preferred mode of payment (Cash, Credit, Debit, or GCash), logging them on the waitlist with estimated wait time, handing the menu, and monitoring waiting guests.',
      },
      {
        id: '2b',
        scriptOrAction:
          'Tell them to come back in an hour without writing their name or handing a menu.',
        tag: 'Policy Violation',
        isCorrect: false,
        feedback:
          'Violation of Task 2.2. You must record guests on the approved waitlist, give an estimated waiting time, and hand them the menu.',
      },
      {
        id: '2c',
        scriptOrAction:
          'Only ask for their first name and tell them we only accept Cash payments.',
        tag: 'Wrong Payment Info',
        isCorrect: false,
        feedback:
          'Incorrect! Under Task 2.1, Jiang Nan accepts cash, credit card, debit card, or GCash.',
      },
    ],
  },
  {
    id: 'step-3',
    sectionCode: 'SECTION III (Tasks 3.1, 3.2 & 3.3)',
    sectionTitle: 'Service & Menu Introduction (Weekday vs. Weekend & Hotpot-Only Rules)',
    guestAvatar: '🧑🏻‍💼',
    guestName: 'Mr. Tan (Weekend Walk-In, 2 Pax)',
    guestContext: 'Saturday evening dinner service. Mr. Tan asks about the rates and then specifically asks: "What if we only want Hotpot without the Grill?"',
    guestDialogue: '"How much is your dinner rate today (Saturday), and how much if we only avail Hotpot without the grill?"',
    taskPrompt:
      'Select the exact compliant explanation for Weekend Package pricing, the Hotpot-only rate rule, and the Premium Meat upgrade:',
    options: [
      {
        id: '3a',
        scriptOrAction:
          'Lead with Hotpot with Grill at ₱999/person on weekends (+5% service charge). Since the guest asked for Hotpot-only, state the Weekend Hotpot-only rate is ₱799 (Grill is ₱200). Also offer the Premium Meat Selection upgrade for +₱200/person.',
        tag: 'Exact Task 3.2 & 3.3',
        isCorrect: true,
        feedback:
          'Perfect! Always lead with Hotpot with Grill (₱899 Weekday / ₱999 Weekend + 5% service charge). Only state Hotpot-only when asked (₱699 Weekday / ₱799 Weekend, Grill ₱200), and offer the +₱200/person Premium Meat Selection upgrade.',
      },
      {
        id: '3b',
        scriptOrAction:
          'Lead with Hotpot-only at ₱599 on weekends with no service charge, and +₱500 for Premium Meat.',
        tag: 'Outdated / Wrong Rate',
        isCorrect: false,
        feedback:
          'Incorrect! You must ALWAYS lead with the Hotpot with Grill Package (₱999 Weekend / ₱899 Weekday + 5% service charge), and Weekend Hotpot-only was updated from ₱699 to ₱799.',
      },
      {
        id: '3c',
        scriptOrAction:
          'Tell the guest Hotpot-only is not available on weekends and Weekend package is ₱899.',
        tag: 'Wrong Weekday/Weekend Rate',
        isCorrect: false,
        feedback:
          'Incorrect. ₱899 (+5% SC) is the Weekday rate. Weekend package rate is ₱999 (+5% SC), and Hotpot-only on weekends is ₱799 when asked.',
      },
    ],
    billOutCheck: {
      label: 'Bill Out Form — Selected Weekend Package Rate:',
      correctValue: '₱999/pax + 5% SC (or ₱799 Hotpot-only if requested)',
      choices: [
        '₱599/pax flat rate',
        '₱999/pax + 5% SC (or ₱799 Hotpot-only if requested)',
        '₱1,299/pax no service charge',
      ],
    },
  },
  {
    id: 'step-4',
    sectionCode: 'SECTION III (Task 3.5)',
    sectionTitle: 'Food Allergies & Bill Out Endorsement',
    guestAvatar: '👩🏻‍🦱',
    guestName: 'Ms. Reyes (Dine-In Table 8)',
    guestContext: 'During menu introduction, Ms. Reyes mentions her son has a severe shellfish & shrimp allergy.',
    guestDialogue: '"My son is allergic to shrimp and shellfish. How do you make sure the server and kitchen know?"',
    taskPrompt:
      'According to Task 3.5, what is the mandatory Receptionist procedure for handling guest food allergies?',
    options: [
      {
        id: '4a',
        scriptOrAction:
          'Check the approved Allergen Information / Allergen Guide (never provide unverified info), and write the specific allergen ("Shrimp/Shellfish Allergy") directly on the Bill Out form so it is visible when endorsed to the Server.',
        tag: 'Mandatory Bill Out Note',
        isCorrect: true,
        feedback:
          'Excellent! Task 3.5 strictly requires referring to the approved Allergen Guide, never giving unverified answers, and writing the specific allergen on the Bill Out form for the Server.',
      },
      {
        id: '4b',
        scriptOrAction:
          'Assure her from memory that none of the sauces have shellfish, and do not write anything on the Bill Out form.',
        tag: 'Critical Safety Breach',
        isCorrect: false,
        feedback:
          'Critical Violation! Task 3.5 states: "Never provide unverified information" and mandates writing the specific allergen on the Bill Out form.',
      },
      {
        id: '4c',
        scriptOrAction:
          'Ask the guest to tell the kitchen cook themselves after sitting down.',
        tag: 'Failed Endorsement',
        isCorrect: false,
        feedback:
          'Incorrect. The Receptionist must screen for allergies upfront and write it on the Bill Out form before endorsing to the Server.',
      },
    ],
    billOutCheck: {
      label: 'Bill Out Form — Allergen Endorsement Entry:',
      correctValue: 'WITH ALLERGEN: Shrimp / Crustacean Shellfish (Verified via Allergen Guide)',
      choices: [
        'Leave blank (verbal mention only)',
        'WITH ALLERGEN: Shrimp / Crustacean Shellfish (Verified via Allergen Guide)',
        'No food allowed for child',
      ],
    },
  },
  {
    id: 'step-5',
    sectionCode: 'SECTION IV (Tasks 4.1 & 4.2)',
    sectionTitle: 'Birthday Promo & Senior Citizen / PWD Discount Mechanics',
    guestAvatar: '🎂',
    guestName: 'Lolo Ernesto & Birthday Group',
    guestContext: 'The group has 1 birthday celebrant (celebrating within her birth month, not exact day) and Lolo Ernesto who presents a valid Senior Citizen ID.',
    guestDialogue: '"It’s my daughter’s birth month (her birthday was last week), and I have my Senior Citizen ID! How do both promos work?"',
    taskPrompt:
      'Which explanation accurately follows Section IV (Tasks 4.1 & 4.2) for BOTH the Birthday Promo and the Senior Citizen / PWD discount?',
    options: [
      {
        id: '5a',
        scriptOrAction:
          'Birthday Promo: Exact birthday today needs 4 paying guests (+1 celebrant FREE), while within Birth Month needs 5 paying guests (+1 celebrant FREE) with valid ID. Senior/PWD: Only the 12% VAT component is deducted because our rate already reflects an unlimited dining promotion. Verify IDs & endorse to Bill Out form.',
        tag: 'Exact Task 4.1 & 4.2',
        isCorrect: true,
        feedback:
          '100% Compliant! Exact birthday = 4 paying + 1 free; Birth month = 5 paying + 1 free. For Senior/PWD, only the 12% VAT component is deducted since the rate is already an unlimited dining promotion. Both must be verified with valid IDs and noted on the Bill Out form.',
      },
      {
        id: '5b',
        scriptOrAction:
          'Birth month only needs 2 paying guests, and Senior Citizens get 50% off the unlimited promo plus VAT exemption.',
        tag: 'Incorrect Mechanics',
        isCorrect: false,
        feedback:
          'Incorrect! Birth month requires 5 paying guests (exact birthday requires 4 paying guests), and Senior/PWD cardholders receive the 12% VAT deduction on the unlimited dining promo rate.',
      },
      {
        id: '5c',
        scriptOrAction:
          'We do not accept Senior Citizen cards or birth month celebrants, only exact birthday today.',
        tag: 'False Policy',
        isCorrect: false,
        feedback:
          'Incorrect! Both birth month (5 paying + 1 free) and Senior/PWD (12% VAT deduction) are honored with valid ID verification.',
      },
    ],
    billOutCheck: {
      label: 'Bill Out Form — Promo & Discount Endorsement:',
      correctValue: 'Birth Month (5 Paying + 1 Free, ID Verified) + Senior ID (12% VAT Deduction)',
      choices: [
        'Birth Month (5 Paying + 1 Free, ID Verified) + Senior ID (12% VAT Deduction)',
        'Exact Day (2 Paying + 1 Free) + 20% Senior Stack',
        'No ID verification needed on Bill Out',
      ],
    },
  },
  {
    id: 'step-6',
    sectionCode: 'SECTION V (Tasks 5.1, 5.2 & 5.3)',
    sectionTitle: 'Soup Base Composition & Initial Meat Ordering Rules',
    guestAvatar: '🍲',
    guestName: 'Ms. Reyes & Family (Table 8)',
    guestContext: 'One guest in the group avoids pork for religious/dietary reasons and asks which soup bases are non-pork and how many meat plates they can order first.',
    guestDialogue: '"Which of your soup bases has NO pork? How many soup flavors can we pick, and how many meat plates can we get on our first round?"',
    taskPrompt:
      'What is the exact information you must provide under Section V (Tasks 5.1, 5.2 & 5.3)?',
    options: [
      {
        id: '6a',
        scriptOrAction:
          'All soup bases are pork-based EXCEPT the Mushroom Soup. You may choose up to two (2) soup flavors per table. For the initial order, you may choose up to three (3) plates of meat (reorders anytime via the Additional Order Form on the table). Desserts and beverages are unlimited and included!',
        tag: 'Complete Section V Script',
        isCorrect: true,
        feedback:
          'Bulls-eye! All soup bases are pork-based except Mushroom Soup; max 2 soup flavors per table; up to 3 plates of meat for the initial order; reorders anytime via Additional Order Form; unlimited desserts and beverages.',
      },
      {
        id: '6b',
        scriptOrAction:
          'All soup bases are chicken-based, you can choose 4 flavors per table, and order 10 plates of meat on the first round.',
        tag: 'Critical Misinformation',
        isCorrect: false,
        feedback:
          'Dangerous error! All soup bases are PORK-BASED except Mushroom Soup. Max 2 flavors per table and up to 3 meat plates for the initial order.',
      },
      {
        id: '6c',
        scriptOrAction:
          'Only Spicy Mala soup is pork-free, and beverages/desserts cost extra.',
        tag: 'Wrong Inclusions',
        isCorrect: false,
        feedback:
          'Incorrect. Only Mushroom Soup is non-pork, and desserts and beverages are unlimited and already included in the package.',
      },
    ],
  },
  {
    id: 'step-7',
    sectionCode: 'SECTION VI (Task 6.1)',
    sectionTitle: 'Dining Time Limit, Leftover Charge & Outside Food Waiver',
    guestAvatar: '🍰',
    guestName: 'Ms. Reyes & Family (Bringing a Birthday Cake)',
    guestContext: 'The family is holding a boxed birthday cake from an outside bakery and asks about time limits and policies.',
    guestDialogue: '"Can we bring this birthday cake inside to our table? And what are your house rules on dining time and leftovers?"',
    taskPrompt:
      'Select the compliant Section VI (Task 6.1) guidelines to communicate before escorting them:',
    options: [
      {
        id: '7a',
        scriptOrAction:
          'Dining time is up to two (2) hours. We observe a No Leftover Policy where excessive leftovers incur a ₱1,000 charge. Outside food is allowed provided you complete our Updated Outside Food Waiver Form before bringing it to the table.',
        tag: 'Exact Task 6.1 Rules',
        isCorrect: true,
        feedback:
          'Correct! Up to 2 hours dining time, ₱1,000 excessive leftover charge, and outside food is allowed once the guest fills out the Updated Outside Food Waiver Form.',
      },
      {
        id: '7b',
        scriptOrAction:
          'Dining time is 4 hours, leftover fee is ₱200, and outside food is allowed with no forms required.',
        tag: 'Policy Breach',
        isCorrect: false,
        feedback:
          'Incorrect! Dining time is up to 2 hours, excessive leftovers carry a ₱1,000 charge, and the Updated Outside Food Waiver Form is mandatory for any outside food.',
      },
      {
        id: '7c',
        scriptOrAction:
          'Confiscate the cake at the door and tell them there is no time limit.',
        tag: 'Wrong Procedure',
        isCorrect: false,
        feedback:
          'Incorrect. Outside food is permitted as long as the guest completes the Updated Outside Food Waiver Form.',
      },
    ],
  },
  {
    id: 'step-8',
    sectionCode: 'SECTIONS VII & VIII (Tasks 7.1–8.2)',
    sectionTitle: 'Server Turnover Endorsement & Guest Departure Receipt Check',
    guestAvatar: '🧾',
    guestName: 'Table 8 Turnover & Exit Verification',
    guestContext: 'Part A: Table 8 is ready for seating. Part B: Two hours later, the guests finish dining and walk toward the exit.',
    guestDialogue: '"Thank you! We’re heading out now!"',
    taskPrompt:
      'Which combination properly executes BOTH the Server Turnover (Section VII) and Guest Departure (Section VIII)?',
    options: [
      {
        id: '8a',
        scriptOrAction:
          'Turnover: Escort to ready table & endorse to Server ("Table 8 po, 5 pax, hotpot with grill, with shrimp allergen & birthday/senior request"). Departure: Politely check & stamp OR/Invoice receipt ("May I kindly check your receipt or OR/Invoice before you go?")—if missing, courteously check with Cashier first—then say "Xie xie! Thank you for dining with us at Jiang Nan Hotpot! See us again!"',
        tag: 'Complete Sec VII & VIII',
        isCorrect: true,
        feedback:
          'Outstanding! You executed the exact Server endorsement script, verified and stamped the OR/Invoice receipt (with courteous non-accusatory cashier check if missing), and closed with "Xie xie! Thank you for dining with us at Jiang Nan Hotpot! See us again!"',
      },
      {
        id: '8b',
        scriptOrAction:
          'Turnover: Point toward Table 8 from the podium without telling the server. Departure: Let them walk out without checking or stamping the OR/Invoice receipt.',
        tag: 'Audit Failure',
        isCorrect: false,
        feedback:
          'Violation of Sections VII & VIII! You must escort the guest, verbally endorse pax/package/allergens to the Server, and verify + stamp the OR/Invoice upon departure.',
      },
      {
        id: '8c',
        scriptOrAction:
          'Departure: If a guest cannot find their receipt, loudly accuse them of not paying in front of other diners.',
        tag: 'Hospitality Violation',
        isCorrect: false,
        feedback:
          'Violation of Task 8.1! If the receipt is not available, you must courteously check with the Cashier first while maintaining a polite, non-accusatory approach.',
      },
    ],
  },
];

const SEQUENCE_STEPS = [
  { code: 'I', title: 'Initial Greeting and Accommodation ("Ni Hao! Welcome to Jiang Nan!")' },
  { code: 'II', title: 'Guest Details Verification (Name, Pax, Payment Mode & Waitlist)' },
  { code: 'III', title: 'Service & Menu Introduction (Rates, +₱200 Upgrade & Allergen Guide)' },
  { code: 'IV', title: 'Promotions & Special Occasions (Birthday 4/5 Rule & Senior/PWD 12% VAT)' },
  { code: 'V', title: 'Dining & Ordering Information (Mushroom Non-Pork, 2 Soups, 3 Meat Plates)' },
  { code: 'VI', title: 'Dining Guidelines & Policies (2-Hr Limit, ₱1,000 Leftover & Food Waiver)' },
  { code: 'VII', title: 'Guest Turnover to Service Team (Escort & Server Endorsement Script)' },
  { code: 'VIII', title: 'Guest Departure (Verify & Stamp OR/Invoice + "Xie xie!" Farewell)' },
];

export const ReceptionistChecklistGame: React.FC<ReceptionistChecklistGameProps> = ({
  documents,
  staffName,
  staffPosition = 'Front of House Receptionist',
  staffBranch = 'Jiangnan Hotpot - SM Mall of Asia',
  onOpenDoc,
}) => {
  const receptionistDoc = documents.find((d) => d.code === 'JNLD-CHK-FOH-REC-001');

  const [gameMode, setGameMode] = useState<'simulation' | 'sequencer'>('simulation');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedBillOutChoice, setSelectedBillOutChoice] = useState<string | null>(null);
  const [stepSubmitted, setStepSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [showScriptCheatSheet, setShowScriptCheatSheet] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Sequencer mini-challenge state
  const [shuffledSequence, setShuffledSequence] = useState(() =>
    [...SEQUENCE_STEPS].sort(() => Math.random() - 0.5)
  );
  const [pickedSequence, setPickedSequence] = useState<typeof SEQUENCE_STEPS>([]);
  const [sequenceError, setSequenceError] = useState<string | null>(null);
  const [sequenceCompleted, setSequenceCompleted] = useState(false);

  const currentStep = SIMULATION_SCENARIOS[currentStepIdx];
  const totalSimSteps = SIMULATION_SCENARIOS.length;
  const isFinished = Object.keys(completedSteps).length === totalSimSteps;

  const handleSubmitStep = () => {
    if (!selectedOptionId) return;
    if (currentStep.billOutCheck && !selectedBillOutChoice) return;

    const chosenOpt = currentStep.options.find((o) => o.id === selectedOptionId);
    const isOptCorrect = !!chosenOpt?.isCorrect;
    const isBillOutCorrect = currentStep.billOutCheck
      ? selectedBillOutChoice === currentStep.billOutCheck.correctValue
      : true;

    const passedBoth = isOptCorrect && isBillOutCorrect;
    setStepSubmitted(true);

    if (passedBoth && !completedSteps[currentStep.id]) {
      setScore((prev) => prev + 125 + streak * 15);
      setStreak((prev) => prev + 1);
      setCompletedSteps((prev) => ({ ...prev, [currentStep.id]: true }));
    } else if (!passedBoth) {
      setStreak(0);
    }
  };

  const handleNextStep = () => {
    setSelectedOptionId(null);
    setSelectedBillOutChoice(null);
    setStepSubmitted(false);
    if (currentStepIdx < totalSimSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleResetGame = () => {
    setCurrentStepIdx(0);
    setSelectedOptionId(null);
    setSelectedBillOutChoice(null);
    setStepSubmitted(false);
    setScore(0);
    setStreak(0);
    setCompletedSteps({});
    setPickedSequence([]);
    setSequenceCompleted(false);
    setSequenceError(null);
    setShuffledSequence([...SEQUENCE_STEPS].sort(() => Math.random() - 0.5));
  };

  const handlePickSequenceItem = (item: (typeof SEQUENCE_STEPS)[0]) => {
    const expectedNext = SEQUENCE_STEPS[pickedSequence.length];
    if (item.code === expectedNext.code) {
      const nextPicked = [...pickedSequence, item];
      setPickedSequence(nextPicked);
      setSequenceError(null);
      if (nextPicked.length === SEQUENCE_STEPS.length) {
        setSequenceCompleted(true);
        setScore((prev) => prev + 250);
      }
    } else {
      setSequenceError(
        `Out of order! Section ${expectedNext.code} ("${expectedNext.title.split(' (')[0]}") comes next before Section ${item.code}.`
      );
      setStreak(0);
    }
  };

  const currentOpt = currentStep.options.find((o) => o.id === selectedOptionId);
  const billOutCorrect = currentStep.billOutCheck
    ? selectedBillOutChoice === currentStep.billOutCheck.correctValue
    : true;
  const stepPassed = !!currentOpt?.isCorrect && billOutCorrect;

  return (
    <div className="space-y-4 pb-8">
      {/* Top Hero Header */}
      <div className="bg-gradient-to-br from-amber-950/90 via-slate-900 to-red-950/80 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                <ClipboardCheck className="w-3 h-3" />
                Station Checklist Simulator
              </span>
              <span className="font-mono text-xs font-bold text-red-300 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/60">
                JNLD-CHK-FOH-REC-001 (Ver. 2)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Receptionist Station Master: Guest Journey & Script Challenge
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Master all 8 official Front-of-House Receptionist stages—from the <span className="text-amber-300 font-semibold">"Ni Hao!"</span> greeting, ₱899/₱999 package scripts, and Bill Out allergen endorsements to Birthday/Senior promos and exit receipt stamping.
            </p>
          </div>

          {/* Score & Quick Actions */}
          <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
            <div className="bg-slate-950/90 border border-amber-500/30 rounded-xl px-3 py-1.5 text-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Hospitality Score</div>
              <div className="text-base font-black text-amber-400 flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                {score} pts
              </div>
            </div>
            <div className="bg-slate-950/90 border border-emerald-500/30 rounded-xl px-3 py-1.5 text-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Stages Cleared</div>
              <div className="text-base font-black text-emerald-400">
                {Object.keys(completedSteps).length}/{totalSimSteps}
              </div>
            </div>
            {receptionistDoc && (
              <button
                onClick={() => onOpenDoc(receptionistDoc)}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Checklist</span>
              </button>
            )}
          </div>
        </div>

        {/* Mode Switcher Tabs + Script Reference Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGameMode('simulation')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                gameMode === 'simulation'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>1. Live Guest Shift Roleplay (8 Stages)</span>
            </button>
            <button
              onClick={() => setGameMode('sequencer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                gameMode === 'sequencer'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>2. Section I–VIII Sequence Drill {sequenceCompleted ? '✓' : ''}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowScriptCheatSheet((prev) => !prev)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{showScriptCheatSheet ? 'Hide Quick Rates & Rules' : 'Quick Rates & Script Guide'}</span>
            </button>
            <button
              onClick={handleResetGame}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Collapsible Quick Cheat Sheet */}
        {showScriptCheatSheet && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-950/95 border border-amber-500/30 text-xs space-y-2 animate-fadeIn">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JNLD-CHK-FOH-REC-001 Official Quick Reference (Version 2)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">Package & Hotpot-Only Rates (Sec III):</span>
                • Weekday Package (Hotpot+Grill): <strong className="text-amber-300">₱899 + 5% SC</strong> (Hotpot-only if asked: ₱699 + ₱200 Grill)
                <br />• Weekend Package (Hotpot+Grill): <strong className="text-amber-300">₱999 + 5% SC</strong> (Hotpot-only if asked: ₱799 + ₱200 Grill)
                <br />• Premium Meat Selection Upgrade: <strong className="text-emerald-300">+₱200 / person</strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">Promos, Soups & House Rules (Sec IV–VIII):</span>
                • Birthday: <strong className="text-amber-300">4 paying (Exact Day)</strong> or <strong className="text-amber-300">5 paying (Birth Month)</strong> = Celebrant FREE
                <br />• Senior/PWD: <strong className="text-amber-300">12% VAT deducted only</strong> (unlimited promo rate)
                <br />• Soups & Meat: All pork-based except <strong className="text-emerald-300">Mushroom Soup</strong> (max 2 flavors; max 3 initial meat plates)
                <br />• Policies: <strong className="text-red-300">2-hr limit, ₱1,000 leftover fee</strong>, Outside Food Waiver Form, OR/Invoice stamp on exit.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODE 1: 8-STAGE LIVE GUEST SIMULATION */}
      {gameMode === 'simulation' && (
        <div className="space-y-4">
          {/* 8-Stage Progress Stepper */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {SIMULATION_SCENARIOS.map((step, idx) => {
              const done = !!completedSteps[step.id];
              const isCurrent = idx === currentStepIdx;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentStepIdx(idx);
                    setSelectedOptionId(null);
                    setSelectedBillOutChoice(null);
                    setStepSubmitted(false);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                      : done
                      ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span>STAGE {idx + 1}</span>
                    {done && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="text-[10px] font-bold truncate mt-0.5">
                    {step.sectionTitle.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Guest Podium Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {currentStep.sectionCode}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {currentStep.sectionTitle}
                </h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                Stage {currentStepIdx + 1} of {totalSimSteps}
              </span>
            </div>

            {/* Guest Dialogue Bubble */}
            <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                {currentStep.guestAvatar}
              </div>
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white">{currentStep.guestName}</span>
                  <span className="text-[11px] text-slate-400">• {currentStep.guestContext}</span>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/50 to-slate-900 border border-amber-700/40 text-amber-100 text-xs sm:text-sm font-medium italic">
                  {currentStep.guestDialogue}
                </div>
              </div>
            </div>

            {/* Task Question Prompt */}
            <div className="space-y-2.5">
              <div className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{currentStep.taskPrompt}</span>
              </div>

              <div className="space-y-2.5">
                {currentStep.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardStyle =
                    'bg-slate-950/70 hover:bg-slate-950 border-slate-800 text-slate-200';
                  if (stepSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100';
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = 'bg-red-950/60 border-red-500 text-red-100';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-amber-950/50 border-amber-400 text-white shadow-md';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={stepSubmitted}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${cardStyle}`}
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700">
                          {opt.tag}
                        </span>
                        <p className="text-xs sm:text-sm leading-relaxed font-medium">
                          {opt.scriptOrAction}
                        </p>
                      </div>
                      <div className="mt-1 flex-shrink-0">
                        {stepSubmitted ? (
                          opt.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                          ) : null
                        ) : (
                          <div
                            className={`w-4 h-4 rounded-full border ${
                              isSelected
                                ? 'border-amber-400 bg-amber-400'
                                : 'border-slate-600'
                            }`}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Bill Out Form Endorsement Sub-Task (if applicable to stage) */}
            {currentStep.billOutCheck && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Receipt className="w-4 h-4" />
                    <span>Receptionist Bill Out Form Endorsement Check</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Required before Server Turnover</span>
                </div>
                <p className="text-xs text-slate-300 font-semibold">
                  {currentStep.billOutCheck.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentStep.billOutCheck.choices.map((choice) => {
                    const isPicked = selectedBillOutChoice === choice;
                    const isRightChoice = choice === currentStep.billOutCheck?.correctValue;
                    let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (stepSubmitted) {
                      if (isRightChoice) {
                        btnClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                      } else if (isPicked && !isRightChoice) {
                        btnClass = 'bg-red-950/70 border-red-500 text-red-200';
                      }
                    } else if (isPicked) {
                      btnClass = 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold';
                    }

                    return (
                      <button
                        key={choice}
                        disabled={stepSubmitted}
                        onClick={() => setSelectedBillOutChoice(choice)}
                        className={`p-2.5 rounded-lg border text-xs text-left transition-all cursor-pointer ${btnClass}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Feedback Banner after Submission */}
            {stepSubmitted && currentOpt && (
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  stepPassed
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                    : 'bg-red-950/50 border-red-500/50 text-red-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  {stepPassed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Standard Met! +125 Hospitality Points</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span>Checklist Deviation Detected</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{currentOpt.feedback}</p>
                {currentStep.billOutCheck && !billOutCorrect && (
                  <p className="text-amber-300 font-semibold">
                    Bill Out Form Note: You must select "{currentStep.billOutCheck.correctValue}" on the Bill Out endorsement slip.
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              {!stepSubmitted ? (
                <button
                  onClick={handleSubmitStep}
                  disabled={!selectedOptionId || (!!currentStep.billOutCheck && !selectedBillOutChoice)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Receptionist Response</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  {!stepPassed && (
                    <button
                      onClick={() => setStepSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry This Stage</span>
                    </button>
                  )}
                  {currentStepIdx < totalSimSteps - 1 && (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Guest Stage</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {isFinished && (
                <button
                  onClick={() => setIsCertModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Claim Receptionist Station Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SECTION I TO VIII SEQUENCER DRILL */}
      {gameMode === 'sequencer' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                JNLD-CHK-FOH-REC-001 • WORKFLOW ORDER DRILL
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                Arrange the 8 Official Receptionist Checklist Sections in Order (I → VIII)
              </h3>
            </div>
            <button
              onClick={() => {
                setPickedSequence([]);
                setSequenceCompleted(false);
                setSequenceError(null);
                setShuffledSequence([...SEQUENCE_STEPS].sort(() => Math.random() - 0.5));
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold self-start cursor-pointer"
            >
              Shuffle Again
            </button>
          </div>

          {sequenceError && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{sequenceError}</span>
            </div>
          )}

          {sequenceCompleted && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm text-white">
                    Perfect 8-Stage Sequence! (+250 Bonus Points)
                  </div>
                  <p>You have mastered the exact flow from Section I (Initial Greeting) to Section VIII (Guest Departure).</p>
                </div>
              </div>
              <button
                onClick={() => setGameMode('simulation')}
                className="px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex-shrink-0 cursor-pointer"
              >
                Back to Roleplay
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Remaining Unordered Tasks */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tap the Next Checklist Section in Order:
              </div>
              {shuffledSequence
                .filter((item) => !pickedSequence.some((p) => p.code === item.code))
                .map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handlePickSequenceItem(item)}
                    className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-slate-200">{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  </button>
                ))}
            </div>

            {/* Right: Verified Sequence */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Your Verified Receptionist Sequence ({pickedSequence.length}/8):
              </div>
              <div className="space-y-2 min-h-[240px] p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                {pickedSequence.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-8 text-center">
                    Click Section I from the left column to start building the official guest flow...
                  </p>
                ) : (
                  pickedSequence.map((item, i) => (
                    <div
                      key={item.code}
                      className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-center gap-2.5 text-xs text-emerald-200"
                    >
                      <span className="font-mono font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {i + 1}. Sec {item.code}
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal when all 8 stages completed */}
      {receptionistDoc && (
        <TrainingCertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          quizTitle={`${receptionistDoc.code}: ${receptionistDoc.title} — Station Master Simulation`}
          staffName={staffName || 'Receptionist Staff'}
          staffPosition={staffPosition}
          staffBranch={staffBranch}
          score={totalSimSteps}
          totalQuestions={totalSimSteps}
        />
      )}
    </div>
  );
};
