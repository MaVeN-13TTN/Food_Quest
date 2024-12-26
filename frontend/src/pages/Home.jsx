import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Search } from "lucide-react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import FoodJokeTrivia from "../components/FoodJokeTrivia";
import Footer from "../components/Footer";
import { searchRecipes } from "../utils/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query, filters) => {
    if (!query && !Object.values(filters).some(value => value)) {
      setRecipes([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchRecipes(query, filters);
      setRecipes(data);
    } catch (err) {
      const errorMessage = err.message === 'API key is not configured. Please check your environment variables.'
        ? 'API configuration error. Please contact support.'
        : 'Failed to fetch recipes. Please try again.';
      setError(errorMessage);
      console.error("Error in search:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block"
          >
            <ChefHat className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and share the best recipes from around the world. Start your culinary journey today!
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search className="w-8 h-8 text-orange-500" />
              </motion.div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch("")}
                className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Try Again
              </motion.button>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Start searching for recipes to see the results here!
              </p>
            </div>
          )}
        </motion.div>

        {/* Trivia Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <FoodJokeTrivia />
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
