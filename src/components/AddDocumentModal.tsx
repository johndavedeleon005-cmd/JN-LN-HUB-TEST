import React, { useState } from 'react';
import { FoodSafetyDoc, DocumentType, DepartmentCategory } from '../types/foodSafety';
import { X, Upload, Plus, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDoc: (newDoc: FoodSafetyDoc) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDoc,
}) => {
  const [docType, setDocType] = useState<DocumentType>('sop');
  const [category, setCategory] = useState<DepartmentCategory>('Operations & Maintenance');
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [revision, setRevision] = useState(0);
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  );
  const [summary, setSummary] = useState('');
  const [keyTakeawaysText, setKeyTakeawaysText] = useState('');
  const [mainContent, setMainContent] = useState('');
  const [preparedBy, setPreparedBy] = useState('Quality Assurance Specialist');
  const [approvedBy, setApprovedBy] = useState('Jack Julius Tiu (President)');
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfDataUrl, setPdfDataUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPdfDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Document title is required.');
      return;
    }
    const cleanCode = code.trim() || (docType === 'sop' ? 'IKQA-SOP#NEW' : 'IKQA-GUIDE#NEW');

    const takeaways = keyTakeawaysText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newDoc: FoodSafetyDoc = {
      id: `custom-${Date.now()}`,
      code: cleanCode,
      title: title.trim(),
      type: docType,
      category,
      revision,
      effectiveDate,
      pdfUrl: pdfDataUrl || '/assets/aistudio/IKQA-SOP_010__Cross-Contamination.docx_61777ef8.pdf',
      summary: summary.trim() || `Official compliance document for ${title}.`,
      keyTakeaways:
        takeaways.length > 0
          ? takeaways
          : ['Follow standard operating procedures', 'Maintain full audit readiness', 'Report non-conformance immediately'],
      sections: [
        {
          id: '1',
          title: '1. Standard Operating Procedure & Guidelines',
          content: mainContent.trim() || 'Detailed instructions and operational procedures.',
        },
      ],
      signatories: {
        preparedBy,
        reviewedBy: ['Operations Manager', 'SCM Manager', 'HR Manager'],
        approvedBy,
      },
      changeHistory: [
        {
          rev: revision,
          date: effectiveDate,
          author: preparedBy,
          purpose: 'New Document Upload',
        },
      ],
      tags: [docType.toUpperCase(), category, cleanCode],
      isCustom: true,
    };

    onAddDoc(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <Upload className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Add SOP / Guide / Policy
              </h3>
              <p className="text-[11px] text-slate-400">
                Expand the Jiangnan Hotpot compliance library
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Document Type Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Document Type:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['sop', 'guide', 'policy'] as DocumentType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setDocType(t)}
                  className={`py-2 rounded-xl font-bold uppercase tracking-wider text-[11px] border transition-all ${
                    docType === t
                      ? 'bg-red-600 text-white border-red-500 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Code & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Document Code:
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={docType === 'sop' ? 'e.g. IKQA-SOP#011' : docType === 'guide' ? 'e.g. IKQA-GUIDE#001' : 'e.g. IKQAP#022'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Category / Department:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white text-xs focus:outline-none focus:border-red-500"
              >
                <option value="Operations & Maintenance">Operations & Maintenance</option>
                <option value="Temperature & Cold Chain">Temperature & Cold Chain</option>
                <option value="Allergens & Health">Allergens & Health</option>
                <option value="Sanitation & Pest">Sanitation & Pest</option>
                <option value="Receiving & Storage">Receiving & Storage</option>
                <option value="Uniform & Visitor">Uniform & Visitor</option>
                <option value="Corporate & Quality">Corporate & Quality</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Document Title *:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep Cleaning of Fryers and Exhaust Hoods"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Summary / Scope:
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief overview of what this SOP or guide mandates..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* Key Takeaways */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Key Requirements (1 per line):
            </label>
            <textarea
              rows={3}
              value={keyTakeawaysText}
              onChange={(e) => setKeyTakeawaysText(e.target.value)}
              placeholder="• Clean filters every Monday&#10;• Wear protective goggles and gloves&#10;• Sign off in daily maintenance checklist"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-red-500 resize-none font-sans"
            />
          </div>

          {/* Full Instructions / Content */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Detailed Operational Steps:
            </label>
            <textarea
              rows={4}
              value={mainContent}
              onChange={(e) => setMainContent(e.target.value)}
              placeholder="Step-by-step instructions for staff to follow..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-red-500 resize-none"
            />
          </div>

          {/* PDF Attachment */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Attach Official PDF Document:
            </label>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                <Upload className="w-3.5 h-3.5 text-red-400" />
                <span>Choose PDF File</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {pdfFileName && (
                <span className="text-[11px] text-emerald-400 font-semibold truncate">
                  ✓ {pdfFileName}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Save Document</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
