import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const RecipeList = ({ recipes }) => {
  // Rest of the code

  RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired,
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 my-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border border-gray-300 rounded-md overflow-hidden w-48 shadow-md"
        >
          <Link to={`/recipe/${recipe.id}`}>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-gray-600">Rating: {recipe.rating}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
