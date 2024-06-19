import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecipeProvider } from "./contexts/RecipeContext";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import RandomRecipe from "./pages/RandomRecipe";
import FoodVideos from "./pages/FoodVideos";
import ProfilePage from "./pages/ProfilePage";
import RecipeDetails from "./components/RecipeDetails";
import Login from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <RecipeProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/random"
              element={
                <ProtectedRoute>
                  <RandomRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/videos"
              element={
                <ProtectedRoute>
                  <FoodVideos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/:id"
              element={
                <ProtectedRoute>
                  <RecipeDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </RecipeProvider>
  );
};

export default App;
