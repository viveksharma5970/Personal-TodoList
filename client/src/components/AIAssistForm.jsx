import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AIAssistForm({ fetchTodos}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAIParse = async () => {
    if (!prompt.trim()) {
      alert("Please enter a task description");
      return;
    }

    setLoading(true);
    let task = null;

    try {
      // Call AI parse API
      const res = await axios.post(
        "https://personal-todo-list-backend.vercel.app/api/ai/parse-task",
        { prompt }
      );

      const { title, dueDate } = res.data;
      console.log("AI response:", res.data);

      task = {
        title: title,
        description: title,
        dueDate: dueDate
      };

      // Clear input
      setPrompt("");
    } catch (err) {
      console.error("AI parse error:", err);
      alert("Could not parse task with AI. Please try again.");
      setLoading(false);
      return; // Stop if AI parsing fails
    }

    try {
      // Create todo in backend
      const token = localStorage.getItem("token");
      await axios.post(
        "https://personal-todo-list-backend.vercel.app/todos", // note /api/todos
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task added successfully!");
      fetchTodos();
    } catch (err) {
      console.error("Failed to create todo:", err.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">AI-Powered Task Creator</h2>
      <input
        type="text"
        placeholder='e.g. "Remind me to call mom tomorrow at 6pm"'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border px-3 py-2 w-full mb-2 rounded"
      />
      <button
        onClick={handleAIParse}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Generate Task"}
      </button>
    </div>
  );
}
