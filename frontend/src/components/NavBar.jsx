import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/Context";

const NavBar = () => {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Food Quest
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
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
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Favorites ({favoritesList.length})
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
