import { useContext } from "react";
import { GlobalContext } from "../context/Context";
import RecipeItem from "../components/RecipeItem";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { recipeList, loading } = useContext(GlobalContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Food Quest</h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover a world of delicious recipes at your fingertips
      </p>
      <div className="mb-8">
        <SearchBar />
      </div>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          {recipeList.length === 0 ? (
            <p className="text-gray-600">
              No recipes found. Please search something.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipeList.map((item) => (
                <RecipeItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
