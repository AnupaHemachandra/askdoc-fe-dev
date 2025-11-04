import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DocumentSection from "../components/DocumentSection";
import QnASection from "../components/QnASection";
import PdfViewer from "../components/PdfViewer";
import Navbar from "../components/Navbar";
import { X } from "lucide-react";
const Dashboard = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const handleSourceClick = (source) => {
        setSelectedSource(source);
    };
    const handleCloseViewer = () => {
        setSelectedSource(null);
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-900 text-white", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(Sidebar, { selectedCategoryId: selectedCategoryId, onSelectCategory: setSelectedCategoryId }), _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [_jsx("div", { className: `transition-all duration-300 flex flex-col ${selectedSource ? "w-1/2" : "w-full"} overflow-hidden`, children: _jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: selectedCategoryId ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-gray-800 rounded-xl shadow p-4 h-[45vh] overflow-x-auto", children: _jsx(DocumentSection, { categoryId: selectedCategoryId }) }), _jsx("div", { className: "bg-gray-800 rounded-xl shadow p-4 h-[45vh] overflow-y-auto", children: _jsx(QnASection, { categoryId: selectedCategoryId, onSourceClick: handleSourceClick }) })] })) : (_jsx("div", { className: "flex items-center justify-center h-full text-gray-400", children: "Select or create a category from the left panel to continue." })) }) }), _jsx("div", { className: `transition-all duration-300 ${selectedSource ? "w-1/2" : "w-1/2"} h-full bg-gray-950 border-l border-gray-800 relative flex items-center justify-center`, children: selectedSource ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleCloseViewer, className: "absolute top-4 right-4 z-20 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-md border border-gray-600 text-white rounded-full p-2 shadow-md transition", title: "Close viewer", children: _jsx(X, { size: 18 }) }), _jsx("div", { className: "w-full h-full overflow-y-auto p-4", children: _jsx(PdfViewer, { fileUrl: selectedSource.metadata.url, pageNumber: selectedSource.metadata.page }) })] })) : (
                                /* ✅ Informative Empty State */
                                _jsxs("div", { className: "flex flex-col items-center justify-center text-center px-8 py-12 space-y-4", children: [_jsx("div", { className: "bg-gray-800/60 p-6 rounded-full shadow-inner", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10 text-blue-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "1.5", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v16m8-8H4" }) }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-200", children: "No Document Selected" }), _jsxs("p", { className: "text-gray-400 max-w-md leading-relaxed", children: ["To preview a document, select a ", _jsx("span", { className: "text-blue-400", children: "source" }), " from the answer section below your query. Once selected, the related PDF page will appear here for easy reference."] }), _jsx("p", { className: "text-gray-500 text-sm mt-2 italic", children: "Tip: Ask a question in the \u201CAsk from Documents\u201D section and click one of the suggested sources." })] })) })] })] })] }));
};
export default Dashboard;
