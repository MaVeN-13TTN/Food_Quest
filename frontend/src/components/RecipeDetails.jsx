import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon, BookmarkIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { RecipeContext } from "../contexts/RecipeContext";
import {
  addToFavorites,
  removeFromFavorites,
  addToBookmarks,
  removeFromBookmarks,
  getRecipeDetails,
} from "../utils/api";
import Toast from "./common/Toast";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const { favorites, setFavorites, bookmarks, setBookmarks } = useContext(RecipeContext);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (error) {
        setError("Failed to load recipe details");
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const isFavorite = favorites.some((favRecipe) => favRecipe.recipe_id === Number(id));
  const isBookmarked = bookmarks.some((bookmarkedRecipe) => bookmarkedRecipe.recipe_id === Number(id));

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe.id);
        setFavorites(favorites.filter((favRecipe) => favRecipe.recipe_id !== recipe.id));
        setToast({ show: true, message: "Removed from favorites", type: "success" });
      } else {
        const newFavorite = await addToFavorites(recipe);
        setFavorites([...favorites, newFavorite]);
        setToast({ show: true, message: "Added to favorites", type: "success" });
      }
    } catch (error) {
      setToast({ 
        show: true, 
        message: error.response?.status === 401 ? "Please login to add favorites" : "Error adding to favorites", 
        type: "error" 
      });
    }
  };

  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        await removeFromBookmarks(recipe.id);
        setBookmarks(bookmarks.filter((bookmarkedRecipe) => bookmarkedRecipe.recipe_id !== recipe.id));
        setToast({ show: true, message: "Removed from bookmarks", type: "success" });
      } else {
        const newBookmark = await addToBookmarks(recipe);
        setBookmarks([...bookmarks, newBookmark]);
        setToast({ show: true, message: "Added to bookmarks", type: "success" });
      }
    } catch (error) {
      setToast({ 
        show: true, 
        message: error.response?.status === 401 ? "Please login to add bookmarks" : "Error adding to bookmarks", 
        type: "error" 
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-8 mt-16 sm:mt-20"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleFavoriteClick}
                className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="h-8 w-8 text-red-500" />
                ) : (
                  <HeartIcon className="h-8 w-8 text-gray-600 hover:text-red-500" />
                )}
              </button>
              <button
                onClick={handleBookmarkClick}
                className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
              >
                {isBookmarked ? (
                  <BookmarkSolidIcon className="h-8 w-8 text-blue-500" />
                ) : (
                  <BookmarkIcon className="h-8 w-8 text-gray-600 hover:text-blue-500" />
                )}
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
              <div className="flex items-center text-gray-600">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            {recipe.diets && recipe.diets.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Dietary Info</h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.diets.map((diet) => (
                    <span
                      key={diet}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.summary && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <div 
                  className="text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
              </div>
            )}

            {recipe.instructions && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                <div 
                  className="text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            )}

            {recipe.extendedIngredients && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RecipeDetails;
