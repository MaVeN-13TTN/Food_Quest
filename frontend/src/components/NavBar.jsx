import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout, isAuthenticated } from "../utils/auth";
import Toast from "./common/Toast";
import { motion } from "framer-motion";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setToast({
      show: true,
      message: "Logged out successfully!",
      type: "success"
    });
    
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 top-0 left-0 border-b border-gray-200">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center">
                <span className="font-extrabold text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  FoodQuest
                </span>
              </Link>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-4 ml-8">
              {isAuthenticated() && (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/random"
                      className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                    >
                      Random Recipe
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/videos"
                      className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                    >
                      Food Videos
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                  >
                    Profile
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated() && (
            <>
              <Link
                to="/random"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              >
                Random Recipe
              </Link>
              <Link
                to="/videos"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              >
                Food Videos
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated() && (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
