import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import ResetPassword from "./components/Auth/ResetPassword";
import Profile from "./components/Profile/Profile";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar /> {/* Include Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
