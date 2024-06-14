import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipe details from API based on the `id`
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (response.ok) {
          const recipeData = await response.json();
          setRecipe(recipeData);
        } else {
          console.error("Failed to fetch recipe details");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
        <img
          className="w-full h-96 object-cover rounded-lg mb-6"
          src={recipe.image}
          alt={recipe.title}
        />
        <p className="text-lg mb-4">{recipe.description}</p>
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-2">Ingredients</h3>
          <ul className="list-disc pl-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Instructions</h3>
          <ol className="list-decimal pl-6">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="mb-4">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
