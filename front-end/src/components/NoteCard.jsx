import React, { useState } from "react";

export default function NoteCard({ note, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({
        title: note.title,
        content: note.content,
        tags: (note.tags || []).join(","),
    });

    const save = () => {
        onUpdate({
            title: draft.title,
            content: draft.content,
            tags: draft.tags.split(",").map((t) => t.trim()),
        });
        setEditing(false);
    };

    return (
        <div className=" rounded-t-2xl justify-evenly bg-gradient-to-r from-sky-500 to-green-200  text-grey-900 shadow-md p-4 rounded shadow">
            {editing ? (
                <div>
                    <input
                        className="w-full p-2 text-black mb-2 border"
                        value={draft.title}
                        onChange={(e) =>
                            setDraft({ ...draft, title: e.target.value })
                        }
                    />
                    <textarea
                        className="w-full p-2 text-black   mb-2 border"
                        value={draft.content}
                        onChange={(e) =>
                            setDraft({ ...draft, content: e.target.value })
                        }
                    />
                    <input
                        className="w-full  text-black  p-2 mb-2 border"
                        value={draft.tags}
                        onChange={(e) =>
                            setDraft({ ...draft, tags: e.target.value })
                        }
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={save}
                            className="bg-blue-600 text-lg text-white px-3 py-1 rounded-2xl"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="px-3 py-1 text-lg bg-red-600 text-white border-black rounded-2xl"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="text-sm text-gray-900">{note.content}</p>
                    <div className="text-xs text-gray-900 mt-2">
                        {(note.tags || []).join(", ")}
                    </div>
                    <div className="mt-2 flex gap-4">
                        <button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 border-black rounded-2xl hover:bg-green-600 bg-green-500"
                        >
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 border-black rounded-2xl hover:bg-red-600 bg-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
