import PropTypes from "prop-types";

const RandomRecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

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
        {recipe.instructions ? (
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Nutrition Information</h2>
        <p>{`Servings: ${recipe.servings}`}</p>
        <p>{`Ready in: ${recipe.readyInMinutes} minutes`}</p>
        {recipe.nutrition && recipe.nutrition.nutrients && (
          <>
            <p>{`Calories: ${
              recipe.nutrition.nutrients.find((n) => n.name === "Calories")
                ?.amount
            } kcal`}</p>
            <p>{`Fat: ${
              recipe.nutrition.nutrients.find((n) => n.name === "Fat")?.amount
            } g`}</p>
            <p>{`Carbohydrates: ${
              recipe.nutrition.nutrients.find((n) => n.name === "Carbohydrates")
                ?.amount
            } g`}</p>
            <p>{`Protein: ${
              recipe.nutrition.nutrients.find((n) => n.name === "Protein")
                ?.amount
            } g`}</p>
          </>
        )}
      </div>
    </div>
  );
};

RandomRecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    extendedIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        original: PropTypes.string,
      })
    ),
    instructions: PropTypes.string,
    servings: PropTypes.number,
    readyInMinutes: PropTypes.number,
    nutrition: PropTypes.shape({
      nutrients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          amount: PropTypes.number,
        })
      ),
    }),
  }),
};

export default RandomRecipeDetails;
