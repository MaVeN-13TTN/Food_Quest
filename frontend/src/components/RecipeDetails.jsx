import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { RecipeContext } from "../contexts/RecipeContext";
import { getRecipeDetails } from "../utils/api";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const {
    favorites,
    bookmarks,
    addToFavorites,
    removeFromFavorites,
    addToBookmarks,
    removeFromBookmarks,
  } = useContext(RecipeContext);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const isFavorite = favorites.some((favRecipe) => favRecipe.id === recipe.id);
  const isBookmarked = bookmarks.some(
    (bookmarkedRecipe) => bookmarkedRecipe.id === recipe.id
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeFromBookmarks(recipe.id);
    } else {
      addToBookmarks(recipe);
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
        <h2 className="text-2xl font-bold mb-2">Nutrition Information</h2>
        <p>{`Servings: ${recipe.servings}`}</p>
        <p>{`Ready in: ${recipe.readyInMinutes} minutes`}</p>
        <p>{`Calories: ${
          recipe.nutrition.nutrients.find((n) => n.name === "Calories").amount
        } kcal`}</p>
        <p>{`Fat: ${
          recipe.nutrition.nutrients.find((n) => n.name === "Fat").amount
        } g`}</p>
        <p>{`Carbohydrates: ${
          recipe.nutrition.nutrients.find((n) => n.name === "Carbohydrates")
            .amount
        } g`}</p>
        <p>{`Protein: ${
          recipe.nutrition.nutrients.find((n) => n.name === "Protein").amount
        } g`}</p>
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
    nutrition: PropTypes.shape({
      nutrients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
    servings: PropTypes.number.isRequired,
    readyInMinutes: PropTypes.number.isRequired,
  }).isRequired,
};

export default RecipeDetails;
