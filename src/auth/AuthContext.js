import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const login = (token) => {
        localStorage.setItem("access_token", token);
        setToken(token);
    };
    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
    };
    const isAuthenticated = !!token;
    return (_jsx(AuthContext.Provider, { value: { token, login, logout, isAuthenticated }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within AuthProvider");
    return context;
};
