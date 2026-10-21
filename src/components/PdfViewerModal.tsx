import React from 'react';
import { FoodSafetyDoc } from '../types/foodSafety';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface PdfViewerModalProps {
  doc: FoodSafetyDoc | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl mx-auto flex-1 flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-red-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-red-400">
                  {doc.code}
                </span>
                <span className="text-xs font-bold text-white truncate">
                  {doc.title}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                Official PDF Document (Rev {doc.revision})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={doc.pdfUrl}
              download
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={doc.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 w-full bg-slate-950 relative">
          <iframe
            src={`${doc.pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-0"
            title={`PDF for ${doc.code}`}
          />
        </div>
      </div>
    </div>
  );
};
