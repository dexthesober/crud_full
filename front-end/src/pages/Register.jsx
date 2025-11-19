import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || form.password.length < 6)
            return setError("Please fill fields correctly (password >=6)");
        try {
            const res = await API.post("/api/auth/register", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            setError(err?.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-black text-left mb-4">Register</h2>
            {error && (
                <div className="bg-red-100 text-red-800 p-2 mb-2">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 mb-2 border-black-100 rounded-sm"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
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
                <button className="w-full bg-blue-600  hover:bg-blue-800 text-white py-2 rounded-2xl mt-2">
                    Register
                </button>
            </form>
        </div>
    );
}
