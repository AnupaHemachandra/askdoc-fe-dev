import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import categoryApi, {} from "../api/categoryApi";
const Sidebar = ({ selectedCategoryId, onSelectCategory }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const queryClient = useQueryClient();
    // 🔹 Fetch all categories
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: categoryApi.getAll,
    });
    // 🔹 Create category
    const createMutation = useMutation({
        mutationFn: (payload) => categoryApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            setShowModal(false);
            setNewName("");
            setNewDesc("");
        },
    });
    // 🔹 Delete category
    const deleteMutation = useMutation({
        mutationFn: (id) => categoryApi.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    return (_jsxs("aside", { className: `bg-gray-800 text-white h-screen border-r border-gray-700 flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-72"}`, children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-gray-700", children: [!collapsed && _jsx("h2", { className: "text-lg font-semibold text-blue-400", children: "Categories" }), _jsxs("div", { className: "flex items-center space-x-2", children: [!collapsed && (_jsx("button", { onClick: () => setShowModal(true), className: "text-blue-400 hover:text-blue-300", title: "Add category", children: _jsx(Plus, { size: 18 }) })), _jsx("button", { onClick: () => setCollapsed(!collapsed), className: "text-gray-400 hover:text-gray-200", title: "Collapse panel", children: collapsed ? _jsx(ChevronRight, { size: 18 }) : _jsx(ChevronLeft, { size: 18 }) })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? (_jsx("p", { className: "text-gray-400 p-4 text-sm", children: "Loading categories..." })) : data?.categories?.length ? (data.categories.map((cat) => (_jsxs("div", { onClick: () => onSelectCategory(cat.id), className: `flex justify-between items-center px-4 py-2 cursor-pointer rounded ${selectedCategoryId === cat.id
                        ? "bg-blue-600"
                        : "hover:bg-gray-700"}`, children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: cat.name }), !collapsed && cat.description && (_jsx("span", { className: "text-xs text-gray-400 line-clamp-1", children: cat.description }))] }), !collapsed && (_jsx("button", { onClick: (e) => {
                                e.stopPropagation();
                                deleteMutation.mutate(cat.id);
                            }, className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { size: 14 }) }))] }, cat.id)))) : (_jsx("p", { className: "text-gray-400 p-4 text-sm", children: "No categories yet." })) }), showModal && (_jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-800 p-6 rounded-xl shadow-xl w-96", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-blue-400", children: "Create New Category" }), _jsx("input", { type: "text", placeholder: "Category name", value: newName, onChange: (e) => setNewName(e.target.value), className: "w-full p-2 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none" }), _jsx("textarea", { placeholder: "Description", value: newDesc, onChange: (e) => setNewDesc(e.target.value), className: "w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none", rows: 3 }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "px-3 py-1 rounded bg-gray-700 hover:bg-gray-600", children: "Cancel" }), _jsx("button", { onClick: () => createMutation.mutate({ name: newName, description: newDesc }), disabled: !newName.trim(), className: "px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50", children: "Create" })] })] }) }))] }));
};
export default Sidebar;
