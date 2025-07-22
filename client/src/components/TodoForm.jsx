import { useState, useEffect } from "react";
import axios from "axios";

export default function TodoForm({ fetchTodos, editingTodo, setEditingTodo }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const token = localStorage.getItem("token");

  // Prefill when editing
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description,
        dueDate: editingTodo.dueDate?.slice(0, 10) || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug
    console.log("Form Data:", formData);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editingTodo) {
        await axios.put(
          `http://localhost:5000/todos/${editingTodo._id}`,
          formData,
          config
        );
        setEditingTodo(null);
      } else {
        await axios.post("http://localhost:5000/todos", formData, config);
      }

      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });

      fetchTodos();
    } catch (err) {
      console.error("Error submitting todo:", err.response?.data?.msg || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-4"
    >
      <h2 className="text-xl font-semibold mb-2">
        {editingTodo ? "Update Todo" : "Add Todo"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingTodo ? "Update" : "Add"}
      </button>
    </form>
  );
}
