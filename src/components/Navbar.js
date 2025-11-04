import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Navbar.tsx
import { useAuth } from "../auth/AuthContext";
const Navbar = () => {
    const { logout } = useAuth();
    return (_jsxs("nav", { className: "bg-gray-800 p-4 flex justify-between items-center text-white shadow", children: [_jsx("span", { className: "font-bold text-blue-400", children: "\uD83D\uDCDA RAG Workspace" }), _jsx("button", { onClick: logout, className: "bg-red-500 hover:bg-red-600 px-3 py-1 rounded", children: "Logout" })] }));
};
export default Navbar;
