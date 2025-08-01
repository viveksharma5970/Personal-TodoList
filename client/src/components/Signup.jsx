import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
      const res = await axios.post("https://personal-todo-list-backend.vercel.app/signup", formData);

      toast(res.data.msg);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
            Personal Todo List
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Create an Account ✨
          </h2>
          <p className="text-gray-500">Join and start organizing your tasks</p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Username Input */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

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

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
