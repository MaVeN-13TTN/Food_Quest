import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecipeItem = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={item?.image_url}
          alt={item?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/recipe/${item?.id}`}
            className="text-white text-lg font-bold py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            View Recipe
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{item?.title}</h3>
        <p className="text-gray-600">{item?.publisher}</p>
      </div>
    </div>
  );
};

RecipeItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeItem;
