import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../api/authApi";
const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authApi.register(form);
            navigate("/login");
        }
        catch {
            setError("Registration failed");
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-900 text-white", children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-gray-800 p-8 rounded-xl w-96", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-center text-blue-400", children: "Register" }), error && _jsx("p", { className: "text-red-400 mb-2", children: error }), _jsx("input", { type: "text", placeholder: "Name", className: "w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }) }), _jsx("input", { type: "email", placeholder: "Email", className: "w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) }), _jsx("input", { type: "password", placeholder: "Password", className: "w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }) }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold", children: "Register" }), _jsxs("p", { className: "mt-4 text-sm text-center", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "text-blue-400 hover:underline", children: "Login" })] })] }) }));
};
export default Register;
