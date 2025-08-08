import { useNavigate } from "react-router-dom";
import TaskMind from "../assets/TaskMind_logo2.png";
export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>

      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={TaskMind}
            alt="TaskMind Logo"
            className="h-12 w-12 object-contain rounded"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight leading-none">
              <span>Task</span>
              <span className="text-green-500">Mind</span>
            </h1>
            <p className="text-sm text-gray-500 -mt-1">
              Your Intelligent Organizer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
    </>

  );
}
