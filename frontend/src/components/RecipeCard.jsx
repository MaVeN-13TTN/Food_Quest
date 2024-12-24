import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HeartIcon, BookmarkIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";
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
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = recipe.image || recipe.image_url;
  const recipeId = recipe.id || recipe.recipe_id;
  const sourceUrl = recipe.sourceUrl || recipe.source_url || "";
  const readyInMinutes = recipe.readyInMinutes || recipe.ready_in_minutes;
  const dietsList = recipe.diets || [];

  const isFavorite = favorites.some(
    (favRecipe) => Number(favRecipe.recipe_id || favRecipe.id) === Number(recipeId)
  );
  
  const isBookmarked = bookmarks.some(
    (bookmarkedRecipe) => Number(bookmarkedRecipe.recipe_id || bookmarkedRecipe.id) === Number(recipeId)
  );

  const handleRemoveFavorite = async () => {
    try {
      await removeFromFavorites(recipeId);
      setFavorites(favorites.filter((favRecipe) => 
        Number(favRecipe.recipe_id || favRecipe.id) !== Number(recipeId)
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
        Number(bookmarkedRecipe.recipe_id || bookmarkedRecipe.id) !== Number(recipeId)
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

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        setToast({ 
          show: true, 
          message: error.response?.status === 401 ? "Please login to add favorites" : "Error adding to favorites",
          type: "error" 
        });
      }
    }
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        setToast({ 
          show: true, 
          message: error.response?.status === 401 ? "Please login to add bookmarks" : "Error adding to bookmarks",
          type: "error" 
        });
      }
    }
  };

  const handleConfirmAction = async () => {
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
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmAction}
          title={`Remove from ${pendingAction === 'favorite' ? 'Favorites' : 'Bookmarks'}`}
          message={`Are you sure you want to remove "${recipe.title}" from your ${pendingAction === 'favorite' ? 'favorites' : 'bookmarks'}?`}
        />
      )}
      <motion.div
        className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Link to={`/recipe/${recipeId}`} className="block">
          <div className="relative aspect-w-16 aspect-h-9">
            <LazyLoadImage
              src={imageUrl}
              alt={recipe.title}
              effect="blur"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="absolute top-2 right-2 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors duration-200"
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmarkClick}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors duration-200"
            >
              {isBookmarked ? (
                <BookmarkSolidIcon className="h-5 w-5 text-blue-500" />
              ) : (
                <BookmarkIcon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
              {recipe.title}
            </h3>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{readyInMinutes} mins</span>
              </div>
              {recipe.servings && (
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  <span>{recipe.servings} servings</span>
                </div>
              )}
            </div>

            {dietsList.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {dietsList.slice(0, 3).map((diet, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                  >
                    {diet}
                  </span>
                ))}
                {dietsList.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    +{dietsList.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>
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
    diets: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default RecipeCard;
