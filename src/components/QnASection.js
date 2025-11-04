import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import queryApi, {} from "../api/queryApi";
import { Loader2, FileText, ChevronDown, ChevronUp } from "lucide-react";
const QueryInterface = ({ categoryId, onSourceClick }) => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSources, setShowSources] = useState(false);
    const handleAsk = async () => {
        if (!query.trim() || !categoryId)
            return;
        setLoading(true);
        setResponse(null);
        try {
            const data = await queryApi.ask(query, categoryId);
            setResponse(data);
        }
        catch (err) {
            console.error("Query failed:", err);
            alert("Something went wrong. Check console for details.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "bg-gray-800 rounded-xl p-6 mt-6 shadow-lg", children: [_jsx("h2", { className: "text-2xl font-semibold text-blue-400 mb-4", children: "Ask from Documents" }), _jsxs("div", { className: "flex gap-3 mb-4", children: [_jsx("input", { type: "text", placeholder: "Type your question...", value: query, onChange: (e) => setQuery(e.target.value), className: "flex-1 bg-gray-700 text-white px-3 py-2 rounded outline-none" }), _jsx("button", { onClick: handleAsk, disabled: loading || !query.trim(), className: "bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded text-white text-sm disabled:opacity-50", children: loading ? "Asking..." : "Ask" })] }), loading && (_jsxs("div", { className: "flex items-center text-gray-400 mt-4", children: [_jsx(Loader2, { size: 18, className: "animate-spin mr-2" }), "Generating answer..."] })), response && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-gray-200 leading-relaxed whitespace-pre-wrap", children: response.answer }), _jsx("button", { onClick: () => setShowSources(!showSources), className: "text-sm text-blue-400 hover:underline mt-3 flex items-center gap-1", children: showSources ? (_jsxs(_Fragment, { children: [_jsx(ChevronUp, { size: 16 }), " Hide Sources"] })) : (_jsxs(_Fragment, { children: [_jsx(ChevronDown, { size: 16 }), " Show Sources"] })) }), showSources && (_jsx("div", { className: "mt-3 space-y-3", children: response.source_nodes.map((node, i) => (_jsxs("div", { onClick: () => onSourceClick({
                                metadata: {
                                    batch_id: node.metadata.batch_id,
                                    category_id: node.metadata.category_id,
                                    document_id: node.metadata.document_id,
                                    page: node.metadata.page,
                                    url: node.metadata.url,
                                    user_id: node.metadata.user_id
                                },
                                score: node.score,
                                page: node.metadata.page,
                                text: node.text,
                                user_id: node.metadata.user_id
                            }), className: "bg-gray-700 p-3 rounded-lg text-sm text-gray-300 cursor-pointer hover:bg-gray-600 transition", children: [_jsxs("div", { className: "flex items-center mb-1 text-gray-400", children: [_jsx(FileText, { size: 14, className: "mr-1" }), _jsxs("span", { children: ["Document #", node.metadata.document_id, " \u2013 Page", " ", node.metadata.page] })] }), _jsx("p", { className: "text-gray-200 line-clamp-3", children: node.text })] }, i))) }))] }))] }));
};
export default QueryInterface;
