import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout, isAuthenticated } from "../utils/auth";
import Toast from "./common/Toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleLogout = () => {
    logout();
    setToast({
      show: true,
      message: "Logged out successfully!",
      type: "success"
    });
    
    // Navigate after a short delay to show the success message
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <nav className="bg-white shadow-lg">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <span className="font-bold text-xl">FoodQuest</span>
            </Link>
            {isAuthenticated() && (
              <>
                <Link
                  to="/random"
                  className="ml-8 flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Random Recipe
                </Link>
                <Link
                  to="/videos"
                  className="ml-4 flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Food Videos
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated() ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
