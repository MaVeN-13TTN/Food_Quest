import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, BookOpen, ChefHat } from "lucide-react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../contexts/RecipeContext";

const EmptyState = ({ type, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
  >
    <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-600 mb-4">No {type} recipes yet</p>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
      >
        <ChefHat className="w-5 h-5 mr-2" />
        Discover Recipes
      </Link>
    </motion.div>
  </motion.div>
);

EmptyState.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const RecipeGrid = ({ recipes, type }) => (
  <AnimatePresence>
    {recipes.length === 0 ? (
      <EmptyState 
        type={type} 
        icon={type === "favorite" ? Heart : BookOpen} 
      />
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.recipe_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

RecipeGrid.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      recipe_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      source_url: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.oneOf(['favorite', 'bookmarked']).isRequired,
};

const ProfilePage = () => {
  const { favorites, bookmarks, isLoading } = useContext(RecipeContext);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="animate-pulse space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl aspect-[4/3]"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Convert recipe_id to number for consistent handling
  const processedFavorites = favorites.map(recipe => ({
    ...recipe,
    recipe_id: Number(recipe.recipe_id || recipe.id)
  }));

  const processedBookmarks = bookmarks.map(recipe => ({
    ...recipe,
    recipe_id: Number(recipe.recipe_id || recipe.id)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
            <ChefHat className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            My Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your collection of favorite and bookmarked recipes
          </p>
        </motion.div>

        {/* Favorites Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Favorite Recipes
            </h2>
          </div>
          <RecipeGrid recipes={processedFavorites} type="favorite" />
        </motion.div>

        {/* Bookmarks Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-500" />
              Bookmarked Recipes
            </h2>
          </div>
          <RecipeGrid recipes={processedBookmarks} type="bookmarked" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
