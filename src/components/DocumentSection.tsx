import { useQuery } from "@tanstack/react-query";
import documentApi, { type DocItem } from "../api/documentApi";
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  FileImage,
  FileArchive,
  File,
  Loader2,
} from "lucide-react";
import FileUploader from "../pages/FileUploader";

interface Props {
  categoryId: number;
}

const getFileIcon = (name: string, status: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  const iconClass =
    status === "UPLOADING"
      ? "text-yellow-400 animate-pulse"
      : status === "READY" || status === "UPLOADED"
      ? "text-green-400"
      : "text-gray-400";

  switch (ext) {
    case "pdf":
      return <FileText className={iconClass} size={40} />;
    case "csv":
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className={iconClass} size={40} />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return <FileImage className={iconClass} size={40} />;
    case "zip":
    case "rar":
      return <FileArchive className={iconClass} size={40} />;
    case "py":
    case "js":
    case "ts":
    case "json":
      return <FileCode className={iconClass} size={40} />;
    default:
      return <File className={iconClass} size={40} />;
  }
};

const DocumentSection: React.FC<Props> = ({ categoryId }) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["documents", categoryId],
    queryFn: () => documentApi.getAllByCategory(categoryId),
    enabled: !!categoryId,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-400">Documents</h2>
        <button
          onClick={() => refetch()}
          className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
        >
          Refresh
        </button>
      </div>

      {/* Upload */}
      <div className="mb-6">
        <FileUploader categoryId={categoryId} />
      </div>

      {/* Status / Errors */}
      {isLoading && (
        <div className="flex items-center text-gray-400 mt-6">
          <Loader2 size={20} className="animate-spin mr-2" />
          Loading documents...
        </div>
      )}
      {isError && (
        <p className="text-red-400">Failed to fetch documents. Please retry.</p>
      )}

      {/* Document Tiles */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((doc: DocItem) => (
            <div
              key={doc.id}
              className="bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center shadow hover:bg-gray-700 transition-all duration-200"
            >
              <div className="mb-3">{getFileIcon(doc.name, doc.status)}</div>
              <h3 className="font-medium truncate w-full">{doc.name}</h3>
              <p
                className={`text-xs mt-1 ${
                  doc.status === "UPLOADING"
                    ? "text-yellow-400"
                    : doc.status === "UPLOADED" || doc.status === "READY"
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {doc.status}
              </p>
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-xs mt-2"
                >
                  Open
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-400 text-sm mt-10 text-center">
            No documents found in this category.
          </p>
        )
      )}
    </div>
  );
};

export default DocumentSection;