import { useContext } from "react";
import PropTypes from "prop-types";
import { RecipeContext } from "../contexts/RecipeContext";
import {
  addToFavorites,
  removeFromFavorites,
  addToBookmarks,
  removeFromBookmarks,
} from "../utils/api";

const RecipeDetails = ({ recipe }) => {
  const { favorites, setFavorites, bookmarks, setBookmarks } =
    useContext(RecipeContext);

  const isFavorite = favorites.some(
    (favRecipe) => favRecipe.recipe_id === recipe.id
  );
  const isBookmarked = bookmarks.some(
    (bookmarkedRecipe) => bookmarkedRecipe.recipe_id === recipe.id
  );

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe.id);
        setFavorites(
          favorites.filter((favRecipe) => favRecipe.recipe_id !== recipe.id)
        );
      } else {
        const newFavorite = await addToFavorites({
          recipe_id: recipe.id,
          title: recipe.title,
          image_url: recipe.image,
          source_url: recipe.sourceUrl,
        });
        setFavorites([...favorites, newFavorite]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        await removeFromBookmarks(recipe.id);
        setBookmarks(
          bookmarks.filter(
            (bookmarkedRecipe) => bookmarkedRecipe.recipe_id !== recipe.id
          )
        );
      } else {
        const newBookmark = await addToBookmarks({
          recipe_id: recipe.id,
          title: recipe.title,
          image_url: recipe.image,
          source_url: recipe.sourceUrl,
        });
        setBookmarks([...bookmarks, newBookmark]);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-96 object-cover mb-8"
      />
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
        <ol className="list-decimal pl-6">
          {recipe.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number} className="mb-4">
              {step.step}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-8">
        <button
          onClick={handleFavoriteClick}
          className={`mr-4 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-peel ${
            isFavorite
              ? "bg-orange-peel text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <button
          onClick={handleBookmarkClick}
          className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-peel ${
            isBookmarked
              ? "bg-orange-peel text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          aria-label={isBookmarked ? "Remove Bookmark" : "Bookmark Recipe"}
        >
          {isBookmarked ? "Remove Bookmark" : "Bookmark Recipe"}
        </button>
      </div>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    extendedIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        original: PropTypes.string.isRequired,
      })
    ).isRequired,
    analyzedInstructions: PropTypes.arrayOf(
      PropTypes.shape({
        steps: PropTypes.arrayOf(
          PropTypes.shape({
            number: PropTypes.number.isRequired,
            step: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    sourceUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
