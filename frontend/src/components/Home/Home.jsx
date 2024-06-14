import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import FilterBar from "../FilterBar/FilterBar";
import RecipeList from "../RecipeList/RecipeList";

const Home = () => {
  const [recipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    diet: "",
    cuisine: "",
    // Add more filters as needed
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // const recipesData = await getRecipes();
        // setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const titleMatch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const dietMatch = filters.diet ? recipe.diet === filters.diet : true;
    const cuisineMatch = filters.cuisine
      ? recipe.cuisine === filters.cuisine
      : true;

    return titleMatch && dietMatch && cuisineMatch;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Welcome to Food Quest
          </h1>
          <p className="text-xl text-center text-gray-600 mb-8">
            Discover a world of delicious recipes at your fingertips
          </p>
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="mb-8">
            <FilterBar filters={filters} onFilters={handleFilters} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RecipeList recipes={filteredRecipes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
