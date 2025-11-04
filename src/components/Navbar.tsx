// src/components/Navbar.tsx
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white shadow">
      <span className="font-bold text-blue-400">📚 RAG Workspace</span>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;