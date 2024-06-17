import { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../contexts/RecipeContext";

const ProfilePage = () => {
  const { favorites, bookmarks } = useContext(RecipeContext);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <div>
        <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Bookmarked Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarks.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
