import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) return setError("Fill both fields");
        try {
            const res = await API.post("/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto text-black bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-left mb-4">Login</h2>
            {error && (
                <div className="bg-red-100 text-red-800 p-2 mb-2">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 mb-2 border"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    className="w-full p-2 mb-2 border"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
                <button className="w-full bg-blue-600 text-white hover:bg-blue-800 py-2 rounded-2xl mt-2">
                    Login
                </button>
            </form>
        </div>
    );
}
