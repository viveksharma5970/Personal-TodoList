import axios from "axios";

export default function TodoItem({ key, todo, fetchTodos, setEditingTodo }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this todo?");
    if (!confirm) return;

    try {
      const delete_todo = await axios.delete(`https://personal-todo-list-backend.vercel.app/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(delete_todo);
      fetchTodos();
    } catch (err) {
      console.error("Delete failed:", err.response?.data?.msg);
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm bg-gray-50 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          <p className="text-sm text-gray-700">{todo.description}</p>
          {todo.dueDate && (
            <p className="text-xs text-gray-500 mt-1">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </p>
          )}
          <p className="text-xs mt-1">
            Status:{" "}
            <span className={todo.isCompleted ? "text-green-600" : "text-yellow-600"}>
              {todo.isCompleted ? "Completed" : "Pending"}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
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
        </div>
      </div>
    </div>
  );
}
