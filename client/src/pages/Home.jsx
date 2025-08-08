import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import AIAssistForm from "../components/AIAssistForm";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const fetchTodos = () => {
    setRefresh(!refresh); // toggle to re-render TodoList
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AIAssistForm fetchTodos={fetchTodos}/>
      <TodoList refresh={refresh} />
      <Footer/>
    </div>
  );
}
