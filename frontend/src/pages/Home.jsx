import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import FoodJokeTrivia from "../components/FoodJokeTrivia";
import Footer from "../components/Footer";
import { searchRecipes } from "../utils/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query, filters) => {
    try {
      const data = await searchRecipes(query, filters);
      setRecipes(data.results);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <div>
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Welcome to FoodQuest
          </h1>
          <p className="text-lg mb-12 text-center">
            Discover amazing recipes and explore the world of culinary delights!
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <FoodJokeTrivia />
      <Footer />
    </div>
  );
};

export default Home;
