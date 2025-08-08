import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TaskMind from "../assets/TaskMind_logo2.png"
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://personal-todo-list-backend.vercel.app/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      toast.success(res.data.msg);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
  >
    {/* Brand Header */}
    <div className="flex items-center justify-center gap-3 mb-6">
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

    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome Back 👋
      </h2>
      <p className="text-gray-500">Login to manage your daily tasks</p>
    </div>

    {/* Error Message */}
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    {/* Email Input */}
    <input
      type="email"
      name="email"
      placeholder="Email"
      className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      required
    />

    {/* Password Input */}
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      required
    />

    {/* Login Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
    >
      Login
    </button>

    {/* Footer */}
    <p className="text-center mt-6 text-sm text-gray-600">
      Don’t have an account?{" "}
      <span
        className="text-blue-600 cursor-pointer underline"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </span>
    </p>
  </form>
</div>

  );
}
