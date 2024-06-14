import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              FOOD QUEST
            </Link>
          </div>
          <div className="flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/saved-recipes"
              className={({ isActive }) =>
                isActive
                  ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Saved Recipes
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-900"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
