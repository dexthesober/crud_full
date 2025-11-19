import React, { useEffect, useState } from "react";

export default function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch Tasks
    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/notes", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setTasks(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load tasks");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


   

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?"))
            return;

        try {
            await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen p-6 flex justify-center">
            <div className="w-full max-w-2xl shadow-xl from-sky-600 via-blue-300 to-pink-600 rounded-xl p-8">
                <h1 className="text-4xl font-bold  from-sky-600 via-blue-300 to-pink-600 text-blue-700 mb-6 text-center">
                    Your Tasks
                </h1>

                {/* Task List */}
                {loading ? (
                    <p className="text-center text-black">Loading...</p>
                ) : tasks.length === 0 ? (
                    <p className="text-center text-gray-500">No tasks yet.</p>
                ) : (
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="p-5 bg-gray-100 rounded-lg border shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="text-xl font-bold text-gray-800">
                                    {task.title}
                                </h3>
                                <p className="text-gray-600">{task.content}</p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(
                                        task.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
