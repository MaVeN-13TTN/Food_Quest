import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-reseda-green">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            <Link to="/">FoodQuest</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-mindaro">
              Home
            </Link>
            <Link to="/random" className="text-white hover:text-mindaro">
              Random Recipe
            </Link>
            <Link to="/videos" className="text-white hover:text-mindaro">
              Food Videos
            </Link>
            <Link to="/profile" className="text-white hover:text-mindaro">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
