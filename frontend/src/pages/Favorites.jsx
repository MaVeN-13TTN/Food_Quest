import { useContext } from "react";
import { GlobalContext } from "../context/Context";
import RecipeItem from "../components/RecipeItem";

const Favorites = () => {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Favorite Recipes</h1>
      {favoritesList.length === 0 ? (
        <p className="text-gray-600">No favorite recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritesList.map((item) => (
            <RecipeItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
