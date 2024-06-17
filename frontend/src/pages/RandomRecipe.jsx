import { useState } from "react";
import { getRandomRecipe } from "../utils/api";
import RandomRecipeDetails from "../components/RandomRecipeDetails";

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomRecipe = async () => {
    setIsLoading(true);
    try {
      const data = await getRandomRecipe();
      setRecipe(data.recipes[0]);
    } catch (error) {
      console.error("Error getting random recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetNewRecipe = () => {
    setRecipe(null);
    fetchRandomRecipe();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Random Recipe</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <RandomRecipeDetails recipe={recipe} />
          <div className="mt-8">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleGetNewRecipe}
            >
              Get New Recipe
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomRecipe;
