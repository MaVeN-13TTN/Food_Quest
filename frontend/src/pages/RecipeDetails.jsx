import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/Context";

const RecipeDetails = () => {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    };
    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  if (!recipeDetailsData) {
    return <p className="text-gray-600">Loading...</p>;
  }

  const isRecipeFavorite = favoritesList.some(
    (item) => item.id === recipeDetailsData?.recipe?.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt={recipeDetailsData?.recipe?.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {recipeDetailsData?.recipe?.title}
          </h1>
          <p className="text-gray-600 mb-4">
            Publisher: {recipeDetailsData?.recipe?.publisher}
          </p>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
            className={`py-2 px-4 rounded-md text-white font-bold ${
              isRecipeFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isRecipeFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="list-disc pl-6">
              {recipeDetailsData?.recipe?.ingredients.map(
                (ingredient, index) => (
                  <li key={index} className="mb-2">
                    {ingredient.quantity} {ingredient.unit}{" "}
                    {ingredient.description}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
