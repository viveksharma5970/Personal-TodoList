import axios from "axios";
import { toast } from "react-toastify";
export default function TodoItem({ todo, fetchTodos, setEditingTodo }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this todo?");
    if (!confirm) return;

    try {
      await axios.delete(`https://personal-todo-list-backend.vercel.app/todos/${todo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task Deleted!");
      fetchTodos();
    } catch (err) {
      console.error("Delete failed:", err.response?.data?.msg);
    }
  };

  // New: Toggle Completion Handler
  const handleToggle = async (id) => {
    try {
      await axios.put(
        `https://personal-todo-list-backend.vercel.app/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task Completed!");
      fetchTodos();
    } catch (err) {
      console.error("Toggle failed:", err.response?.data?.msg);
      toast.error("Error in completing the task!");
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm bg-gray-50 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}>
            {todo.title}
          </h3>
          <p className="text-sm text-gray-700">{todo.description}</p>
          {todo.dueDate && (
            <p className="text-xs text-gray-500 mt-1">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </p>
          )}
          <p className="text-xs mt-1">
            Status:{" "}
            <span className={todo.completed ? "text-green-600" : "text-yellow-600"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <button
            onClick={() => setEditingTodo(todo)}
            className="text-blue-600 underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 underline text-sm"
          >
            Delete
          </button>
          <label className="text-xs flex items-center gap-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo._id)}
            />
            Done
          </label>
        </div>
      </div>
    </div>
  );
}
