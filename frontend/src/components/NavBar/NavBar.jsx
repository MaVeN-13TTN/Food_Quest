import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session)
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              FOOD QUEST
            </Link>
            <div className="ml-4 flex items-center md:hidden">
              <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:block md:ml-6">
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Home
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/saved-recipes"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Saved Recipes
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Sign Up
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/saved-recipes"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  onClick={toggleMenu}
                >
                  Saved Recipes
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  }
                  onClick={toggleMenu}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                }
                onClick={toggleMenu}
              >
                Sign Up
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Prop Types validation
NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default NavBar;
