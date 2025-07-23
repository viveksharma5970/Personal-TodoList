import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://personal-todo-list-backend.vercel.app/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err.response?.data?.msg);
    }
  };
console.log(todos);
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <TodoForm
        fetchTodos={fetchTodos}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
      />
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet. Add some!</p>
      ) : (
        todos.map((todo) => (
          <div>
            <p>{todo._id}</p>
            <TodoItem
            todo={todo}
            fetchTodos={fetchTodos}
            setEditingTodo={setEditingTodo}
          />
          </div>
          
        ))
      )}
    </div>
  );
}
