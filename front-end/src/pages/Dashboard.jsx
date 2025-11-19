import React, { useEffect, useState } from "react";
import API from "../api";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
    const [profile, setProfile] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [notes, setNotes] = useState([]);
    const [form, setForm] = useState({ title: "", content: "", tags: "" });
    const [q, setQ] = useState("");

    const fetchNotes = async (query) => {
        try {
            const res = await API.get("/api/notes", { params: { q: query } });
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotes("");
    }, []);

    const create = async (e) => {
        e.preventDefault();
        if (!form.title) return alert("Title needed");
        const payload = {
            ...form,
            tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        };
        const res = await API.post("/api/notes", payload);
        setNotes((prev) => [res.data, ...prev]);
        setForm({ title: "", content: "", tags: "" });
    };

    const remove = async (id) => {
        await API.delete(`/api/notes/${id}`);
        setNotes((prev) => prev.filter((n) => n._id !== id));
    };
    const updateNote = async (id, data) => {
        const res = await API.put(`/api/notes/${id}`, data);
        setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    };

    return (
        <div>
            <div className="mb-4  rounded-2xl bg-gradient-to-r from-sky-600 via-blue-300 to-pink-600  text-gray-900 shadow-md p-4">
                <h1 className="text-2xl font-bold">Welcome, {profile?.name}</h1>
                <p className="text-sm text-gray-800">{profile?.email}</p>
            </div>

            <div className="mb-6 bg-gray-100 p-4 rounded-2xl shadow">
                <h2 className="font-semibold mb-2">Create Note</h2>
                <form onSubmit={create} className="space-y-2">
                    <input
                        placeholder="Title"
                        className="w-full p-2 text-black border"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Content"
                        className="w-full p-2 border  text-black"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                    />
                    <input
                        placeholder="tags (comma)"
                        className="w-full p-2 border  text-black"
                        value={form.tags}
                        onChange={(e) =>
                            setForm({ ...form, tags: e.target.value })
                        }
                    />
                    <div className="flex gap-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded">
                            Create
                        </button>
                        
                    </div>

                </form>
               
            </div>
  <div className="shadow-md py-4 flex justify-between items-center space-x-2 mb-6 rounded-2xl">
    <input
                            className=" py-4 border-black mb-4 w-full
                             rounded-2xl  text-gray-900"
                            placeholder="Search notes..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => fetchNotes(q)}
                            className="bg-blue-600 text-white px-5  rounded-2xl  py-4  hover:bg-blue-800"
                        >
                            Search
                        </button>

                        
  </div>
  
                      

            <div className="grid md:grid-cols-2 gap-4">
                {notes.map((n) => (
                    <NoteCard
                        key={n._id}
                        note={n}
                        onDelete={() => remove(n._id)}
                        onUpdate={(data) => updateNote(n._id, data)}
                    />
                ))}
            </div>
        </div>
    );
}
