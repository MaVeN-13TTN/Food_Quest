import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import { Dice5, Clock, Users, ChefHat, Loader2, Heart, Bookmark, ExternalLink } from "lucide-react";
import { getRandomRecipe, addToFavorites, removeFromFavorites, addToBookmarks, removeFromBookmarks } from "../utils/api";
import { RecipeContext } from "../contexts/RecipeContext";
import Toast from "../components/common/Toast";
import ConfirmationModal from "../components/common/ConfirmationModal";

const RecipeDetails = ({ recipe, setToast }) => {
  const { favorites, setFavorites, bookmarks, setBookmarks } = useContext(RecipeContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  if (!recipe) return null;

  const recipeId = Number(recipe.id);
  
  const isFavorite = favorites.some(
    (favRecipe) => Number(favRecipe.recipe_id || favRecipe.id) === recipeId
  );
  
  const isBookmarked = bookmarks.some(
    (bookmarkedRecipe) => Number(bookmarkedRecipe.recipe_id || bookmarkedRecipe.id) === recipeId
  );

  const handleRemoveFavorite = async () => {
    try {
      await removeFromFavorites(recipeId);
      setFavorites(favorites.filter((favRecipe) => 
        Number(favRecipe.recipe_id || favRecipe.id) !== recipeId
      ));
      setToast({ show: true, message: "Removed from favorites", type: "success" });
    } catch (error) {
      setToast({ 
        show: true, 
        message: error.response?.status === 401 ? "Please login to remove favorites" : "Error removing from favorites", 
        type: "error" 
      });
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      await removeFromBookmarks(recipeId);
      setBookmarks(bookmarks.filter((bookmarkedRecipe) => 
        Number(bookmarkedRecipe.recipe_id || bookmarkedRecipe.id) !== recipeId
      ));
      setToast({ show: true, message: "Removed from bookmarks", type: "success" });
    } catch (error) {
      setToast({ 
        show: true, 
        message: error.response?.status === 401 ? "Please login to remove bookmarks" : "Error removing from bookmarks", 
        type: "error" 
      });
    }
  };

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      setPendingAction('favorite');
      setShowConfirmModal(true);
    } else {
      try {
        const recipeData = {
          id: recipeId,
          title: recipe.title,
          image: recipe.image,
          sourceUrl: recipe.sourceUrl,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          diets: recipe.diets || []
        };
        const newFavorite = await addToFavorites(recipeData);
        setFavorites([...favorites, newFavorite]);
        setToast({ show: true, message: "Added to favorites", type: "success" });
      } catch (error) {
        setToast({ 
          show: true, 
          message: error.response?.status === 401 ? "Please login to add favorites" : "Error adding to favorites",
          type: "error" 
        });
      }
    }
  };

  const handleBookmarkClick = async () => {
    if (isBookmarked) {
      setPendingAction('bookmark');
      setShowConfirmModal(true);
    } else {
      try {
        const recipeData = {
          id: recipeId,
          title: recipe.title,
          image: recipe.image,
          sourceUrl: recipe.sourceUrl,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          diets: recipe.diets || []
        };
        const newBookmark = await addToBookmarks(recipeData);
        setBookmarks([...bookmarks, newBookmark]);
        setToast({ show: true, message: "Added to bookmarks", type: "success" });
      } catch (error) {
        setToast({ 
          show: true, 
          message: error.response?.status === 401 ? "Please login to add bookmarks" : "Error adding to bookmarks",
          type: "error" 
        });
      }
    }
  };

  const handleConfirmRemove = async () => {
    if (pendingAction === 'favorite') {
      await handleRemoveFavorite();
    } else if (pendingAction === 'bookmark') {
      await handleRemoveBookmark();
    }
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmRemove}
        title={`Remove from ${pendingAction === 'favorite' ? 'favorites' : 'bookmarks'}?`}
        message={`Are you sure you want to remove this recipe from your ${pendingAction === 'favorite' ? 'favorites' : 'bookmarks'}?`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mt-16 md:mt-24"
      >
        <div className="relative aspect-video">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
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

        <div className="p-8 pt-10">
          <div className="flex justify-end gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteClick}
              className={`inline-flex items-center px-4 py-2 rounded-xl ${
                isFavorite 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              } transition-colors duration-200`}
            >
              <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookmarkClick}
              className={`inline-flex items-center px-4 py-2 rounded-xl ${
                isBookmarked 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              } transition-colors duration-200`}
            >
              <Bookmark className={`w-5 h-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
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
    </>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string,
    readyInMinutes: PropTypes.number.isRequired,
    servings: PropTypes.number.isRequired,
    instructions: PropTypes.string,
    cuisines: PropTypes.arrayOf(PropTypes.string),
    diets: PropTypes.arrayOf(PropTypes.string)
  }),
  setToast: PropTypes.func.isRequired
};

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

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
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
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
            <RecipeDetails key={recipe?.id} recipe={recipe} setToast={setToast} />
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
