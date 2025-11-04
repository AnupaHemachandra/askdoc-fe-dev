import { useState } from "react";
import queryApi,{ type QueryResponse } from "../api/queryApi";
import { Loader2, FileText, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  categoryId: number;
}

interface Props {
  categoryId: number;
  onSourceClick: (source: {
    score: number;
    page: number;
    text: string;
    user_id: number;
    metadata: {
      batch_id: number;
      category_id: number;
      document_id: number;
      page: number;
      url: string;
      user_id: number;
    };
  }) => void;
}

const QueryInterface: React.FC<Props> = ({ categoryId, onSourceClick }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleAsk = async () => {
    if (!query.trim() || !categoryId) return;
    setLoading(true);
    setResponse(null);

    try {
      const data = await queryApi.ask(query, categoryId);
      setResponse(data);
    } catch (err) {
      console.error("Query failed:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        Ask from Documents
      </h2>

      {/* Input + Button */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded outline-none"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded text-white text-sm disabled:opacity-50"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {/* Answer */}
      {loading && (
        <div className="flex items-center text-gray-400 mt-4">
          <Loader2 size={18} className="animate-spin mr-2" />
          Generating answer...
        </div>
      )}

      {response && (
        <div className="mt-4">
          <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
            {response.answer}
          </p>

          {/* Sources Toggle */}
          <button
            onClick={() => setShowSources(!showSources)}
            className="text-sm text-blue-400 hover:underline mt-3 flex items-center gap-1"
          >
            {showSources ? (
              <>
                <ChevronUp size={16} /> Hide Sources
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Show Sources
              </>
            )}
          </button>

          {showSources && (
            <div className="mt-3 space-y-3">
              {response.source_nodes.map((node, i) => (
                <div
                  key={i}
                  onClick={() =>
                    onSourceClick({
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
                    })
                  }
                  className="bg-gray-700 p-3 rounded-lg text-sm text-gray-300 cursor-pointer hover:bg-gray-600 transition"
                >
                  <div className="flex items-center mb-1 text-gray-400">
                    <FileText size={14} className="mr-1" />
                    <span>
                      Document #{node.metadata.document_id} – Page{" "}
                      {node.metadata.page}
                    </span>
                  </div>
                  <p className="text-gray-200 line-clamp-3">{node.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryInterface;