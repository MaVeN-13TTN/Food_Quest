import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecipeProvider } from "./contexts/RecipeContext";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import RandomRecipe from "./pages/RandomRecipe";
import FoodVideos from "./pages/FoodVideos";
import ProfilePage from "./pages/ProfilePage";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  return (
    <RecipeProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/random" element={<RandomRecipe />} />
            <Route path="/videos" element={<FoodVideos />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </Router>
    </RecipeProvider>
  );
};

export default App;
