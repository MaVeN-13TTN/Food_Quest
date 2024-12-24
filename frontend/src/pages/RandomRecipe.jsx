import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice5, Clock, Users, ChefHat, Loader2, Heart, Bookmark, ExternalLink } from "lucide-react";
import { getRandomRecipe } from "../utils/api";

const RecipeDetails = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="relative aspect-video">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {recipe.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-white/90">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
            {recipe.cuisines?.length > 0 && (
              <div className="flex items-center">
                <ChefHat className="w-4 h-4 mr-1" />
                <span>{recipe.cuisines.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
          >
            <Heart className="w-5 h-5 mr-2" />
            Favorite
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors duration-200"
          >
            <Bookmark className="w-5 h-5 mr-2" />
            Save
          </motion.button>
        </div>

        <div className="prose prose-orange max-w-none">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
          <div
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            className="text-gray-600"
          />

          {recipe.sourceUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-6 text-orange-500 hover:text-orange-600 transition-colors duration-200"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Original Recipe
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomRecipe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRandomRecipe();
      setRecipe(data.recipes[0]);
    } catch (err) {
      setError("Failed to fetch recipe. Please try again.");
      console.error("Error getting random recipe:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
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
            <Dice5 className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Random Recipe
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover something new and exciting to cook today!
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-8 h-8 text-orange-500" />
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-red-500 mb-4">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchRandomRecipe}
                className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <RecipeDetails key={recipe?.id} recipe={recipe} />
          )}
        </AnimatePresence>

        {/* Action Button */}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchRandomRecipe}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            >
              <Dice5 className="w-5 h-5 mr-2" />
              Get New Recipe
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RandomRecipe;
