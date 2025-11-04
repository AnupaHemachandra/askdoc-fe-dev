import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import categoryApi, { type Category } from "../api/categoryApi";

interface Props {
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
}

const Sidebar: React.FC<Props> = ({ selectedCategoryId, onSelectCategory }) => {
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
    mutationFn: (payload: { name: string; description: string }) =>
      categoryApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setShowModal(false);
      setNewName("");
      setNewDesc("");
    },
  });

  // 🔹 Delete category
  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return (
    <aside
      className={`bg-gray-800 text-white h-screen border-r border-gray-700 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        {!collapsed && <h2 className="text-lg font-semibold text-blue-400">Categories</h2>}
        <div className="flex items-center space-x-2">
          {!collapsed && (
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-400 hover:text-blue-300"
              title="Add category"
            >
              <Plus size={18} />
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-gray-200"
            title="Collapse panel"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* Category list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="text-gray-400 p-4 text-sm">Loading categories...</p>
        ) : data?.categories?.length ? (
          data.categories.map((cat: Category) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded ${
                selectedCategoryId === cat.id
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium">{cat.name}</span>
                {!collapsed && cat.description && (
                  <span className="text-xs text-gray-400 line-clamp-1">
                    {cat.description}
                  </span>
                )}
              </div>
              {!collapsed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMutation.mutate(cat.id);
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 p-4 text-sm">No categories yet.</p>
        )}
      </div>

      {/* Create Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Create New Category
            </h3>
            <input
              type="text"
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <textarea
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  createMutation.mutate({ name: newName, description: newDesc })
                }
                disabled={!newName.trim()}
                className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;