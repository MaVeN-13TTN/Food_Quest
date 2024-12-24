import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../utils/api";
import Toast from "../common/Toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      // Store tokens securely
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      
      setToast({
        show: true,
        message: "Login successful!",
        type: "success"
      });

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setToast({
        show: true,
        message: error.response?.data?.detail || "Login failed. Please try again.",
        type: "error"
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
