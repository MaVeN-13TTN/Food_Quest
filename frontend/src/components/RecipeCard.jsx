import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { RecipeContext } from "../contexts/RecipeContext";
import { addToFavorites, removeFromFavorites, addToBookmarks, removeFromBookmarks } from "../utils/api";
import Toast from "./common/Toast";
import ConfirmationModal from "./common/ConfirmationModal";
import "react-lazy-load-image-component/src/effects/blur.css";

const RecipeCard = ({ recipe }) => {
  const { favorites, setFavorites, bookmarks, setBookmarks } = useContext(RecipeContext);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Handle both Spoonacular API (image) and our backend format (image_url)
  const imageUrl = recipe.image || recipe.image_url;
  const recipeId = recipe.id || recipe.recipe_id;
  const sourceUrl = recipe.sourceUrl || recipe.source_url || "";
  const readyInMinutes = recipe.readyInMinutes || recipe.ready_in_minutes;
  const dietsList = recipe.diets || [];

  // Check if recipe is in favorites/bookmarks using recipe_id or id
  const isFavorite = favorites.some(
    (favRecipe) => {
      const favId = favRecipe.recipe_id || favRecipe.id;
      const currentId = recipeId;
      return Number(favId) === Number(currentId);
    }
  );
  
  const isBookmarked = bookmarks.some(
    (bookmarkedRecipe) => {
      const bookmarkId = bookmarkedRecipe.recipe_id || bookmarkedRecipe.id;
      const currentId = recipeId;
      return Number(bookmarkId) === Number(currentId);
    }
  );

  const handleRemoveFavorite = async () => {
    try {
      await removeFromFavorites(recipeId);
      setFavorites(favorites.filter((favRecipe) => 
        Number((favRecipe.recipe_id || favRecipe.id)) !== Number(recipeId)
      ));
      setToast({ show: true, message: "Removed from favorites", type: "success" });
    } catch (error) {
      console.error('Error removing from favorites:', error);
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
        Number((bookmarkedRecipe.recipe_id || bookmarkedRecipe.id)) !== Number(recipeId)
      ));
      setToast({ show: true, message: "Removed from bookmarks", type: "success" });
    } catch (error) {
      console.error('Error removing from bookmarks:', error);
      setToast({ 
        show: true, 
        message: error.response?.status === 401 ? "Please login to remove bookmarks" : "Error removing from bookmarks", 
        type: "error" 
      });
    }
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event from bubbling up
    if (isFavorite) {
      setPendingAction('favorite');
      setShowConfirmModal(true);
    } else {
      try {
        const recipeData = {
          id: recipeId,
          title: recipe.title,
          image: imageUrl,
          sourceUrl: sourceUrl,
          readyInMinutes: readyInMinutes,
          servings: recipe.servings,
          diets: dietsList
        };
        const newFavorite = await addToFavorites(recipeData);
        setFavorites([...favorites, newFavorite]);
        setToast({ show: true, message: "Added to favorites", type: "success" });
      } catch (error) {
        console.error('Error adding to favorites:', error);
        setToast({ 
          show: true, 
          message: error.response?.status === 401 ? "Please login to add favorites" : "Error adding to favorites", 
          type: "error" 
        });
      }
    }
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event from bubbling up
    if (isBookmarked) {
      setPendingAction('bookmark');
      setShowConfirmModal(true);
    } else {
      try {
        const recipeData = {
          id: recipeId,
          title: recipe.title,
          image: imageUrl,
          sourceUrl: sourceUrl,
          readyInMinutes: readyInMinutes,
          servings: recipe.servings,
          diets: dietsList
        };
        const newBookmark = await addToBookmarks(recipeData);
        setBookmarks([...bookmarks, newBookmark]);
        setToast({ show: true, message: "Added to bookmarks", type: "success" });
      } catch (error) {
        console.error('Error adding to bookmarks:', error);
        setToast({ 
          show: true, 
          message: error.response?.status === 401 ? "Please login to add bookmarks" : "Error adding to bookmarks", 
          type: "error" 
        });
      }
    }
  };

  const handleConfirmRemove = () => {
    if (pendingAction === 'favorite') {
      handleRemoveFavorite();
    } else if (pendingAction === 'bookmark') {
      handleRemoveBookmark();
    }
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  if (!imageUrl || !recipe.title) {
    return null; // Don't render cards with missing required data
  }

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmRemove}
        title={`Remove ${pendingAction === 'favorite' ? 'Favorite' : 'Bookmark'}`}
        message={`Are you sure you want to remove "${recipe.title}" from your ${
          pendingAction === 'favorite' ? 'favorites' : 'bookmarks'
        }?`}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative">
          <Link to={`/recipe/${recipeId}`} className="block">
            <LazyLoadImage
              alt={recipe.title}
              effect="blur"
              src={imageUrl}
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="absolute top-2 right-2 flex space-x-2 z-10">
            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-600 hover:text-red-500" />
              )}
            </button>
            <button
              onClick={handleBookmarkClick}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
              aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              {isBookmarked ? (
                <BookmarkSolidIcon className="h-6 w-6 text-blue-500" />
              ) : (
                <BookmarkIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
              )}
            </button>
          </div>
          <Link to={`/recipe/${recipeId}`} className="block p-4">
            <h2 className="text-xl font-bold mb-2 line-clamp-2">{recipe.title}</h2>
            {readyInMinutes && recipe.servings && (
              <div className="flex items-center justify-between text-gray-600 mb-2">
                <span>{readyInMinutes} minutes</span>
                <span>{recipe.servings} servings</span>
              </div>
            )}
            {dietsList.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {dietsList.slice(0, 2).map((diet) => (
                  <span
                    key={diet}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                  >
                    {diet}
                  </span>
                ))}
                {dietsList.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                    +{dietsList.length - 2} more
                  </span>
                )}
              </div>
            )}
          </Link>
        </div>
      </motion.div>
    </>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    recipe_id: PropTypes.number,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    image_url: PropTypes.string,
    sourceUrl: PropTypes.string,
    source_url: PropTypes.string,
    readyInMinutes: PropTypes.number,
    ready_in_minutes: PropTypes.number,
    servings: PropTypes.number,
    diets: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default RecipeCard;
