import React, { useState, useEffect, useMemo } from 'react';
import { FoodSafetyDoc, DocumentType, DepartmentCategory } from './types/foodSafety';
import { INITIAL_FOOD_SAFETY_DOCUMENTS } from './data/foodSafetyDocuments';
import { AndroidHeader } from './components/AndroidHeader';
import { AndroidBottomNav, TabType } from './components/AndroidBottomNav';
import { DocumentCard } from './components/DocumentCard';
import { DocumentViewer } from './components/DocumentViewer';
import { QuickReferenceView } from './components/QuickReferenceView';
import { AudioReaderPanel } from './components/AudioReaderPanel';
import { StaffQuizAudit } from './components/StaffQuizAudit';
import { ComplianceAssistantModal } from './components/ComplianceAssistantModal';
import { ComplianceAssistantView } from './components/ComplianceAssistantView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { ConfidentialityPopup } from './components/ConfidentialityPopup';
import { StoreDocumentLockModal } from './components/StoreDocumentLockModal';
import { WelcomeTrainingHubModal } from './components/WelcomeTrainingHubModal';
import {
  Search,
  Bookmark,
  CheckCircle2,
  Filter,
  FileText,
  ShieldCheck,
  Flame,
  Layers,
  Sparkles,
  BookOpen,
  Headphones,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export default function App() {
  // Documents state (persisted with any custom added docs)
  const [documents, setDocuments] = useState<FoodSafetyDoc[]>(() => {
    try {
      const saved = localStorage.getItem('ikqa_documents_v2') || localStorage.getItem('ikqa_documents_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initial in case of updates
        const customDocs = parsed.filter((d: FoodSafetyDoc) => d.isCustom);
        return [...INITIAL_FOOD_SAFETY_DOCUMENTS, ...customDocs];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_FOOD_SAFETY_DOCUMENTS;
  });

  // Selected document for full view
  const [selectedDoc, setSelectedDoc] = useState<FoodSafetyDoc | null>(null);

  // Bottom navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('library');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | DocumentType>('all');
  const [selectedCategory, setSelectedCategory] = useState<DepartmentCategory>('All');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ikqa_bookmarks');
      return saved ? JSON.parse(saved) : ['ikqap-003', 'ikqap-015', 'ikqa-sop-010'];
    } catch {
      return ['ikqap-003', 'ikqap-015'];
    }
  });

  // Read Acknowledgments
  const [readDocIds, setReadDocIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ikqa_read_docs');
      return saved ? JSON.parse(saved) : ['ikqap-001', 'ikqap-003'];
    } catch {
      return ['ikqap-001'];
    }
  });

  // Staff Info: Name, Position & Branch
  const [staffName, setStaffName] = useState(() => {
    try {
      return localStorage.getItem('ikqa_staff_name') || 'Maria Santos';
    } catch {
      return 'Maria Santos';
    }
  });
  const [staffPosition, setStaffPosition] = useState(() => {
    try {
      return localStorage.getItem('ikqa_staff_position') || 'Kitchen Shift Lead';
    } catch {
      return 'Kitchen Shift Lead';
    }
  });
  const [staffBranch, setStaffBranch] = useState(() => {
    try {
      return localStorage.getItem('ikqa_staff_branch') || 'Jiangnan Hotpot - SM Mall of Asia';
    } catch {
      return 'Jiangnan Hotpot - SM Mall of Asia';
    }
  });

  // Frame Simulation State (phone frame vs desktop)
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);

  // Modals state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [pdfModalDoc, setPdfModalDoc] = useState<FoodSafetyDoc | null>(null);

  // Mandatory Confidentiality & Non-Disclosure Agreement Gatekeeper
  const [hasAgreedNDA, setHasAgreedNDA] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ld_training_hub_nda_accepted') === 'true';
    } catch {
      return false;
    }
  });

  // Welcome to Learning and Development Training Hub Pop-up from the start
  // Must remain open until the user accepts the Confidentiality & Non-Disclosure Agreement
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(() => {
    try {
      const agreed = localStorage.getItem('ld_training_hub_nda_accepted') === 'true';
      // If not yet agreed, it must open and cannot proceed
      return !agreed;
    } catch {
      return true;
    }
  });

  // Confidentiality Agreement State (Required popup on every page viewed)
  const [pendingDocToView, setPendingDocToView] = useState<FoodSafetyDoc | null>(null);
  const [isConfidentialityOpen, setIsConfidentialityOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'viewDoc' | 'viewPdf'>('viewDoc');
  const [storeLockDoc, setStoreLockDoc] = useState<FoodSafetyDoc | null>(null);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('ikqa_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Persist read documents
  useEffect(() => {
    localStorage.setItem('ikqa_read_docs', JSON.stringify(readDocIds));
  }, [readDocIds]);

  // Persist staff profile
  useEffect(() => {
    localStorage.setItem('ikqa_staff_name', staffName);
    localStorage.setItem('ikqa_staff_position', staffPosition);
    localStorage.setItem('ikqa_staff_branch', staffBranch);
  }, [staffName, staffPosition, staffBranch]);

  // Handlers
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleRead = (id: string) => {
    setReadDocIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAgreeNDA = () => {
    try {
      localStorage.setItem('ld_training_hub_nda_accepted', 'true');
      localStorage.setItem('ld_training_hub_nda_timestamp', new Date().toISOString());
    } catch (e) {
      console.error(e);
    }
    setHasAgreedNDA(true);
    setIsWelcomeOpen(false);
  };

  const handleQuickTTS = (doc: FoodSafetyDoc, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDoc(doc);
    setActiveTab('audio');
  };

  // Confidentiality Gatekeeper: Required popup on every page / document viewed
  const handleInitiateViewDoc = (doc: FoodSafetyDoc) => {
    setPendingDocToView(doc);
    setPendingAction('viewDoc');
    setIsConfidentialityOpen(true);
  };

  const handleInitiateViewPdf = (doc: FoodSafetyDoc, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Feature Locked: Prompt that actual document viewing is via store documents
    setStoreLockDoc(doc);
  };

  const handleAgreeConfidentiality = () => {
    if (pendingDocToView) {
      if (pendingAction === 'viewDoc') {
        setSelectedDoc(pendingDocToView);
      } else {
        setPdfModalDoc(pendingDocToView);
      }
    }
    setIsConfidentialityOpen(false);
    setPendingDocToView(null);
  };

  const handleCancelConfidentiality = () => {
    setIsConfidentialityOpen(false);
    setPendingDocToView(null);
  };

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Type filter
      if (selectedType !== 'all' && doc.type !== selectedType) return false;

      // Category filter
      if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;

      // Bookmarks filter
      if (showOnlyBookmarks && !bookmarkedIds.includes(doc.id)) return false;

      // Unread filter
      if (showOnlyUnread && readDocIds.includes(doc.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inCode = doc.code.toLowerCase().includes(query);
        const inTitle = doc.title.toLowerCase().includes(query);
        const inSummary = doc.summary.toLowerCase().includes(query);
        const inTakeaways = doc.keyTakeaways.some((t) => t.toLowerCase().includes(query));
        const inTags = doc.tags.some((tag) => tag.toLowerCase().includes(query));
        return inCode || inTitle || inSummary || inTakeaways || inTags;
      }

      return true;
    });
  }, [
    documents,
    selectedType,
    selectedCategory,
    showOnlyBookmarks,
    showOnlyUnread,
    searchQuery,
    bookmarkedIds,
    readDocIds,
  ]);

  // Document Counts
  const policiesCount = documents.filter((d) => d.type === 'policy').length;
  const sopsCount = documents.filter((d) => d.type === 'sop').length;
  const guidesCount = documents.filter((d) => d.type === 'guide').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center selection:bg-red-500 selection:text-white">
      {/* App Container - Responsive or simulated Android frame */}
      <div
        className={`w-full transition-all duration-300 flex flex-col min-h-screen ${
          isPhoneFrame
            ? 'max-w-md my-4 rounded-[40px] border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden ring-1 ring-slate-700/60'
            : 'max-w-4xl'
        }`}
      >
        {/* Header */}
        <AndroidHeader
          onSearchClick={() => {
            if (activeTab !== 'library') setActiveTab('library');
            const searchInput = document.getElementById('main-search-input');
            searchInput?.focus();
          }}
          bookmarksCount={bookmarkedIds.length}
          onBookmarksClick={() => {
            setActiveTab('library');
            setShowOnlyBookmarks((prev) => !prev);
          }}
          isPhoneFrame={isPhoneFrame}
          togglePhoneFrame={() => setIsPhoneFrame((prev) => !prev)}
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onOpenWelcomeModal={() => setIsWelcomeOpen(true)}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto">
          {/* If a document is selected, render DocumentViewer */}
          {selectedDoc ? (
            <DocumentViewer
              doc={selectedDoc}
              onBack={() => setSelectedDoc(null)}
              isBookmarked={bookmarkedIds.includes(selectedDoc.id)}
              onToggleBookmark={handleToggleBookmark}
              isRead={readDocIds.includes(selectedDoc.id)}
              onToggleRead={handleToggleRead}
              staffName={staffName}
              staffPosition={staffPosition}
              staffBranch={staffBranch}
              onOpenPdfModal={(d) => handleInitiateViewPdf(d)}
            />
          ) : (
            <div className="p-4 space-y-4">
              {/* TAB 1: LIBRARY */}
              {activeTab === 'library' && (
                <div className="space-y-4">
                  {/* Hero compliance banner */}
                  <div className="bg-gradient-to-br from-red-950 via-slate-900 to-amber-950/60 border border-red-800/40 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-black ring-1 ring-red-500/50 shadow-xl flex-shrink-0 mt-0.5">
                          <img 
                            src="./assets/aistudio/JN_HOTPOT_LOGO_d76d212e.webp" 
                            alt="Jiangnan Hotpot Logo" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-900/60 text-red-200 border border-red-700/60 text-[10px] font-bold">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                            Imperial Kitchen Group Inc.
                          </span>
                          <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                            Learning and Development Training Hub
                          </h1>
                          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                            Official compliance standards for Jiangnan Hotpot restaurants, commissaries, and logistics.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsWelcomeOpen(true)}
                        className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold shadow-lg active:scale-95 transition-all flex-shrink-0"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>L&D Team & NDA</span>
                      </button>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      <div className="p-2 rounded-xl bg-slate-950/60 text-center border border-slate-800/60">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Policies</span>
                        <span className="text-sm font-black text-white">{policiesCount} Active</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950/60 text-center border border-slate-800/60">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">SOPs & Guides</span>
                        <span className="text-sm font-black text-amber-400">{sopsCount + guidesCount} Stored</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950/60 text-center border border-slate-800/60">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Reviewed</span>
                        <span className="text-sm font-black text-emerald-400">
                          {readDocIds.length} / {documents.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="main-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search policy code, title, allergen, temp, towel color..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-red-500/80 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors shadow-inner"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Document Type Selector Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                    <button
                      onClick={() => setSelectedType('all')}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        selectedType === 'all'
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      All Documents ({documents.length})
                    </button>

                    <button
                      onClick={() => setSelectedType('policy')}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        selectedType === 'policy'
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      Policies ({policiesCount})
                    </button>

                    <button
                      onClick={() => setSelectedType('sop')}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        selectedType === 'sop'
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      SOPs ({sopsCount})
                    </button>

                    <button
                      onClick={() => setSelectedType('guide')}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        selectedType === 'guide'
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      Guides ({guidesCount})
                    </button>
                  </div>

                  {/* Category Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                    {[
                      'All',
                      'Temperature & Cold Chain',
                      'Sanitation & Pest',
                      'Allergens & Health',
                      'Receiving & Storage',
                      'Operations & Maintenance',
                      'Uniform & Visitor',
                      'Corporate & Quality',
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as DepartmentCategory)}
                        className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                          selectedCategory === cat
                            ? 'bg-slate-200 text-slate-950 font-bold'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Active Filters Bar */}
                  {(showOnlyBookmarks || showOnlyUnread) && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                      <span className="text-slate-400">Active Filters:</span>
                      {showOnlyBookmarks && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                          <Bookmark className="w-3 h-3 fill-amber-300" /> Bookmarked Only
                          <button onClick={() => setShowOnlyBookmarks(false)}>
                            <X className="w-3 h-3 ml-1" />
                          </button>
                        </span>
                      )}
                      {showOnlyUnread && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/40">
                          Unreviewed Only
                          <button onClick={() => setShowOnlyUnread(false)}>
                            <X className="w-3 h-3 ml-1" />
                          </button>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Document Grid / List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                      <span>Showing {filteredDocuments.length} compliance documents</span>
                      <button
                        onClick={() => setShowOnlyUnread((p) => !p)}
                        className={`text-[11px] hover:underline font-semibold ${
                          showOnlyUnread ? 'text-red-400' : 'text-slate-400'
                        }`}
                      >
                        {showOnlyUnread ? 'Show All Docs' : 'Filter Unread'}
                      </button>
                    </div>

                    {filteredDocuments.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredDocuments.map((doc) => (
                          <DocumentCard
                            key={doc.id}
                            doc={doc}
                            onSelect={(d) => handleInitiateViewDoc(d)}
                            isBookmarked={bookmarkedIds.includes(doc.id)}
                            onToggleBookmark={handleToggleBookmark}
                            isRead={readDocIds.includes(doc.id)}
                            onQuickTTS={handleQuickTTS}
                            onOpenPdf={handleInitiateViewPdf}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl p-6 space-y-3">
                        <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
                        <h4 className="text-sm font-bold text-white">No documents matched your search</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          Try adjusting your search terms or clearing category filters.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedType('all');
                            setSelectedCategory('All');
                            setShowOnlyBookmarks(false);
                            setShowOnlyUnread(false);
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold"
                        >
                          Reset Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: QUICK REFERENCE */}
              {activeTab === 'quickref' && <QuickReferenceView />}

              {/* TAB 3: AUDIO READER (GEMINI 3.8 FLASH TTS) */}
              {activeTab === 'audio' && (
                <AudioReaderPanel
                  documents={documents}
                  selectedDoc={selectedDoc}
                  onSelectDoc={(d) => setSelectedDoc(d)}
                />
              )}

              {/* TAB 4: AUDIT & QUIZ */}
              {activeTab === 'audit' && (
                <StaffQuizAudit
                  documents={documents}
                  readDocIds={readDocIds}
                  staffName={staffName}
                  setStaffName={setStaffName}
                  staffPosition={staffPosition}
                  setStaffPosition={setStaffPosition}
                  staffBranch={staffBranch}
                  setStaffBranch={setStaffBranch}
                  onOpenDoc={(d) => handleInitiateViewDoc(d)}
                  onOpenWelcomeModal={() => setIsWelcomeOpen(true)}
                />
              )}

              {/* TAB 5: AI COMPLIANCE ASSISTANT */}
              {activeTab === 'assistant' && (
                <ComplianceAssistantView
                  activeDoc={selectedDoc}
                  documents={documents}
                  onOpenDoc={(id) => {
                    const found = documents.find((d) => d.id === id);
                    if (found) handleInitiateViewDoc(found);
                  }}
                />
              )}
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <AndroidBottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedDoc(null);
            setActiveTab(tab);
          }}
          totalDocsCount={documents.length}
        />

        {/* AI Compliance Assistant Modal */}
        <ComplianceAssistantModal
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
          activeDoc={selectedDoc}
          documents={documents}
          onOpenDoc={(id) => {
            const found = documents.find((d) => d.id === id);
            if (found) handleInitiateViewDoc(found);
          }}
        />

        {/* Source PDF Preview Modal (Maintained for emergency admin fallback) */}
        {pdfModalDoc && (
          <PdfViewerModal
            doc={pdfModalDoc}
            onClose={() => setPdfModalDoc(null)}
          />
        )}

        {/* Store Document Lock Modal: "Actual document viewing is via store documents" */}
        <StoreDocumentLockModal
          isOpen={!!storeLockDoc}
          doc={storeLockDoc}
          onClose={() => setStoreLockDoc(null)}
          onReadDigitalText={() => {
            if (storeLockDoc) {
              handleInitiateViewDoc(storeLockDoc);
            }
            setStoreLockDoc(null);
          }}
        />

        {/* Confidentiality Agreement Gatekeeper Popup on every page viewed */}
        <ConfidentialityPopup
          doc={pendingDocToView}
          isOpen={isConfidentialityOpen}
          onAgree={handleAgreeConfidentiality}
          onCancel={handleCancelConfidentiality}
        />

        {/* Welcome to Learning and Development Training Hub Modal (Agreement required before entering) */}
        <WelcomeTrainingHubModal
          isOpen={isWelcomeOpen || !hasAgreedNDA}
          onClose={() => {
            if (hasAgreedNDA) {
              setIsWelcomeOpen(false);
            }
          }}
          hasAgreedNDA={hasAgreedNDA}
          onAgreeNDA={handleAgreeNDA}
        />
      </div>
    </div>
  );
}
