import React, { useState } from 'react';
import { FoodSafetyDoc } from '../types/foodSafety';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  BookOpen,
  User,
  Store,
  RefreshCw,
  AlertCircle,
  FileBadge,
} from 'lucide-react';

interface StaffQuizAuditProps {
  documents: FoodSafetyDoc[];
  readDocIds: string[];
  staffName: string;
  setStaffName: (name: string) => void;
  staffBranch: string;
  setStaffBranch: (branch: string) => void;
  onOpenDoc: (doc: FoodSafetyDoc) => void;
}

export const StaffQuizAudit: React.FC<StaffQuizAuditProps> = ({
  documents,
  readDocIds,
  staffName,
  setStaffName,
  staffBranch,
  setStaffBranch,
  onOpenDoc,
}) => {
  // Aggregate all quiz questions across all documents
  const allQuestions = documents.flatMap((d) =>
    (d.quizQuestions || []).map((q) => ({
      ...q,
      docCode: d.code,
      docTitle: d.title,
    }))
  );

  const [activeQuizQuestions, setActiveQuizQuestions] = useState(() =>
    allQuestions.slice(0, 10)
  );
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const readPercentage = Math.round((readDocIds.length / documents.length) * 100);

  const calculateScore = () => {
    let score = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIndex) score++;
    });
    return score;
  };

  const score = calculateScore();
  const passed = score >= 8; // 8 out of 10 to pass

  const handleRestartQuiz = () => {
    // Shuffle and pick 10
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setActiveQuizQuestions(shuffled.slice(0, 10));
    setUserAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-4 pb-12 animate-fadeIn">
      {/* Staff ID & Branch Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-red-400" />
            <span>Staff Compliance Profile</span>
          </h2>
          <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/40">
            Audit Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 font-medium block mb-1">
              Employee Full Name:
            </label>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="e.g. Maria Santos (Kitchen Captain)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 font-medium block mb-1">
              Branch / Store Location:
            </label>
            <input
              type="text"
              value={staffBranch}
              onChange={(e) => setStaffBranch(e.target.value)}
              placeholder="e.g. Jiangnan Hotpot - SM Mall of Asia"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Read Progress Bar */}
        <div className="pt-2 border-t border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Policy Review Progress</span>
            <span className="font-mono font-bold text-red-400">
              {readDocIds.length} / {documents.length} ({readPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${readPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Passed Certification Badge */}
      {isSubmitted && passed && (
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950/40 border border-emerald-600/60 rounded-2xl p-5 text-center space-y-2 shadow-xl animate-fadeIn">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center">
            <Award className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Food Safety Compliance Certified!
          </h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            {staffName || 'Staff Member'} ({staffBranch || 'Branch'}) has successfully demonstrated compliance with Imperial Kitchen Group Inc. & Jiangnan Hotpot standards.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-mono font-bold border border-emerald-700/60 mt-1">
            <FileBadge className="w-4 h-4" /> Score: {score} / 10 (Passed)
          </div>
        </div>
      )}

      {/* Comprehensive 10-Question Shift Quiz */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Shift Compliance Assessment (10 Questions)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Pass score is 8/10 to verify operational readiness.
            </p>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            <RefreshCw className="w-3 h-3" />
            <span>New Questions</span>
          </button>
        </div>

        <div className="space-y-4">
          {activeQuizQuestions.map((q, idx) => {
            const selectedOpt = userAnswers[idx];
            const isCorrect = selectedOpt === q.answerIndex;

            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-red-400 font-bold">{q.docCode}</span>
                  <span>Question {idx + 1} of 10</span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                  {q.question}
                </h4>

                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let btnStyle = 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700';

                    if (isSubmitted) {
                      if (optIdx === q.answerIndex) {
                        btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-700 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-950/80 text-red-200 border-red-700 font-medium';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-red-950 text-red-200 border-red-700 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => setUserAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && optIdx === q.answerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div
                    className={`p-2 rounded-lg text-[11px] mt-1 ${
                      isCorrect
                        ? 'bg-emerald-950/40 text-emerald-300'
                        : 'bg-red-950/40 text-red-300'
                    }`}
                  >
                    <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
          {!isSubmitted ? (
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              Submit Assessment
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white">
                Final Score: {score} / 10
              </span>
              <button
                onClick={handleRestartQuiz}
                className="text-xs text-red-400 hover:underline font-semibold"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
