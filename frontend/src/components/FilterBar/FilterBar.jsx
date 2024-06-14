import { useState } from "react";

const FilterBar = () => {
  const [filters, setFilters] = useState({
    diet: "",
    cuisine: "",
    // Add more filters as needed
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform filter logic here (e.g., API call or filter recipes)
    console.log("Filters:", filters);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-wrap -mx-2">
        <div className="px-2 mb-2">
          <select
            name="diet"
            value={filters.diet}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            {/* Add more diet options as needed */}
          </select>
        </div>
        <div className="px-2 mb-2">
          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Cuisine</option>
            <option value="italian">Italian</option>
            <option value="indian">Indian</option>
            {/* Add more cuisine options as needed */}
          </select>
        </div>
        {/* Add more filter options as needed */}
        <div className="px-2 mb-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Filter
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
