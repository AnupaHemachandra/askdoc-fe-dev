import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import documentApi, {} from "../api/documentApi";
import { FileText, FileSpreadsheet, FileCode, FileImage, FileArchive, File, Loader2, } from "lucide-react";
import FileUploader from "../pages/FileUploader";
const getFileIcon = (name, status) => {
    const ext = name.split(".").pop()?.toLowerCase();
    const iconClass = status === "UPLOADING"
        ? "text-yellow-400 animate-pulse"
        : status === "READY" || status === "UPLOADED"
            ? "text-green-400"
            : "text-gray-400";
    switch (ext) {
        case "pdf":
            return _jsx(FileText, { className: iconClass, size: 40 });
        case "csv":
        case "xls":
        case "xlsx":
            return _jsx(FileSpreadsheet, { className: iconClass, size: 40 });
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
            return _jsx(FileImage, { className: iconClass, size: 40 });
        case "zip":
        case "rar":
            return _jsx(FileArchive, { className: iconClass, size: 40 });
        case "py":
        case "js":
        case "ts":
        case "json":
            return _jsx(FileCode, { className: iconClass, size: 40 });
        default:
            return _jsx(File, { className: iconClass, size: 40 });
    }
};
const DocumentSection = ({ categoryId }) => {
    const { data, isLoading, isError, refetch, } = useQuery({
        queryKey: ["documents", categoryId],
        queryFn: () => documentApi.getAllByCategory(categoryId),
        enabled: !!categoryId,
    });
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-2xl font-semibold text-blue-400", children: "Documents" }), _jsx("button", { onClick: () => refetch(), className: "text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded", children: "Refresh" })] }), _jsx("div", { className: "mb-6", children: _jsx(FileUploader, { categoryId: categoryId }) }), isLoading && (_jsxs("div", { className: "flex items-center text-gray-400 mt-6", children: [_jsx(Loader2, { size: 20, className: "animate-spin mr-2" }), "Loading documents..."] })), isError && (_jsx("p", { className: "text-red-400", children: "Failed to fetch documents. Please retry." })), data && data.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4", children: data.map((doc) => (_jsxs("div", { className: "bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center shadow hover:bg-gray-700 transition-all duration-200", children: [_jsx("div", { className: "mb-3", children: getFileIcon(doc.name, doc.status) }), _jsx("h3", { className: "font-medium truncate w-full", children: doc.name }), _jsx("p", { className: `text-xs mt-1 ${doc.status === "UPLOADING"
                                ? "text-yellow-400"
                                : doc.status === "UPLOADED" || doc.status === "READY"
                                    ? "text-green-400"
                                    : "text-gray-400"}`, children: doc.status }), doc.url && (_jsx("a", { href: doc.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:underline text-xs mt-2", children: "Open" }))] }, doc.id))) })) : (!isLoading && (_jsx("p", { className: "text-gray-400 text-sm mt-10 text-center", children: "No documents found in this category." })))] }));
};
export default DocumentSection;
