import { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../contexts/RecipeContext";
import { Link } from "react-router-dom";

const EmptyState = ({ type }) => (
  <div className="text-center py-8 bg-gray-50 rounded-lg">
    <p className="text-gray-600 mb-4">No {type} recipes yet</p>
    <Link
      to="/"
      className="inline-block px-4 py-2 bg-orange-peel text-white rounded-md hover:bg-sandy-brown transition-colors"
    >
      Discover Recipes
    </Link>
  </div>
);

const ProfilePage = () => {
  const { favorites, bookmarks, isLoading } = useContext(RecipeContext);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-6 bg-gray-200 rounded w-1/6 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">My Recipes</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2>
        {favorites.length === 0 ? (
          <EmptyState type="favorite" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((recipe) => (
              <RecipeCard 
                key={recipe.recipe_id} 
                recipe={recipe}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Bookmarked Recipes</h2>
        {bookmarks.length === 0 ? (
          <EmptyState type="bookmarked" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((recipe) => (
              <RecipeCard 
                key={recipe.recipe_id} 
                recipe={recipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
