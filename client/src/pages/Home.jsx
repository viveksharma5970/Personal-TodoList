import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <TodoList />
    </div>
  );
}
