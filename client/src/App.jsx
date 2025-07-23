import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
      </Routes>
    </Router>
  );
}
