import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import authApi from "../api/authApi";
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authApi.login({ email, password });
            login(res[0].access_token);
            navigate("/dashboard");
        }
        catch (err) {
            setError("Invalid credentials");
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-900 text-white", children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-gray-800 p-8 rounded-xl w-96", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-center text-blue-400", children: "Login" }), error && _jsx("p", { className: "text-red-400 mb-2", children: error }), _jsx("input", { type: "email", placeholder: "Email", className: "w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "password", placeholder: "Password", className: "w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold", children: "Sign In" }), _jsxs("p", { className: "mt-4 text-sm text-center", children: ["Don\u2019t have an account?", " ", _jsx(Link, { to: "/register", className: "text-blue-400 hover:underline", children: "Register" })] })] }) }));
};
export default Login;
