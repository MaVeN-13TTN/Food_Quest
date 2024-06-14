import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details from API
    // setRecipe(response.data);
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-xl mx-auto mb-4"
      />
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Ingredients</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Instructions</h3>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Nutritional Information</h3>
        <p>{recipe.nutritionalInfo}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Rating: {recipe.rating}</h3>
        {/* Display user reviews and option to leave a review */}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Save to Collection
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">
        Share Recipe
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Related Recipes</h3>
        {/* Display related recipes */}
      </div>
    </div>
  );
};

export default RecipeDetails;
