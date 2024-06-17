import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const RecipeCard = ({ recipe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <LazyLoadImage
        alt={recipe.title}
        effect="blur"
        src={recipe.image}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600">{`${recipe.readyInMinutes} minutes`}</p>
        <p className="text-gray-600">{`Servings: ${recipe.servings}`}</p>
        <Link
          to={`/recipe/${recipe.id}`}
          className="mt-4 inline-block bg-orange-peel hover:bg-sandy-brown text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-peel"
        >
          View Recipe
        </Link>
      </div>
    </motion.div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    readyInMinutes: PropTypes.number.isRequired,
    servings: PropTypes.number.isRequired,
  }).isRequired,
};

export default RecipeCard;
