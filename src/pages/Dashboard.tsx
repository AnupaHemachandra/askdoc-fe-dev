import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DocumentSection from "../components/DocumentSection";
import QnASection from "../components/QnASection";
import PdfViewer from "../components/PdfViewer";
import Navbar from "../components/Navbar";
import { X } from "lucide-react";

const Dashboard = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<any>(null);

  const handleSourceClick = (source: any) => {
    setSelectedSource(source);
  };

  const handleCloseViewer = () => {
    setSelectedSource(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        {/* Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Section: Documents + QnA */}
          <div
            className={`transition-all duration-300 flex flex-col ${
              selectedSource ? "w-1/2" : "w-full"
            } overflow-hidden`}
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedCategoryId ? (
                <>
                  {/* ✅ Documents (fixed height, scrollable horizontally) */}
                  <div className="bg-gray-800 rounded-xl shadow p-4 h-[45vh] overflow-x-auto">
                    <DocumentSection categoryId={selectedCategoryId} />
                  </div>

                  {/* ✅ Q&A Section (same height) */}
                  <div className="bg-gray-800 rounded-xl shadow p-4 h-[45vh] overflow-y-auto">
                    <QnASection
                      categoryId={selectedCategoryId}
                      onSourceClick={handleSourceClick}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select or create a category from the left panel to continue.
                </div>
              )}
            </div>
          </div>

          {/* ✅ Right Section: PDF Viewer */}
<div
  className={`transition-all duration-300 ${
    selectedSource ? "w-1/2" : "w-1/2"
  } h-full bg-gray-950 border-l border-gray-800 relative flex items-center justify-center`}
>
  {selectedSource ? (
    <>
      {/* Floating Close Button */}
      <button
        onClick={handleCloseViewer}
        className="absolute top-4 right-4 z-20 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-md border border-gray-600 text-white rounded-full p-2 shadow-md transition"
        title="Close viewer"
      >
        <X size={18} />
      </button>

      {/* Scrollable PDF area */}
      <div className="w-full h-full overflow-y-auto p-4">
        <PdfViewer
          fileUrl={selectedSource.metadata.url}
          pageNumber={selectedSource.metadata.page}
        />
      </div>
    </>
  ) : (
    /* ✅ Informative Empty State */
    <div className="flex flex-col items-center justify-center text-center px-8 py-12 space-y-4">
      <div className="bg-gray-800/60 p-6 rounded-full shadow-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-200">
        No Document Selected
      </h3>
      <p className="text-gray-400 max-w-md leading-relaxed">
        To preview a document, select a <span className="text-blue-400">source</span> from the answer section below your query.
        Once selected, the related PDF page will appear here for easy reference.
      </p>
      <p className="text-gray-500 text-sm mt-2 italic">
        Tip: Ask a question in the “Ask from Documents” section and click one of the suggested sources.
      </p>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;