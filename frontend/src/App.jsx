import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import GlobalState from "./context/Context";

function App() {
  return (
    <Router>
      <GlobalState>
        <div className="min-h-screen bg-gray-100">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </GlobalState>
    </Router>
  );
}

export default App;
