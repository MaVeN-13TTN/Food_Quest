// FilterBar.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const FilterBar = ({ onFilter }) => {
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
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <label htmlFor="diet" className="block text-gray-700 font-bold mb-2">
            Diet
          </label>
          <select
            id="diet"
            name="diet"
            value={filters.diet}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            {/* Add more diet options as needed */}
          </select>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <label
            htmlFor="cuisine"
            className="block text-gray-700 font-bold mb-2"
          >
            Cuisine
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={filters.cuisine}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All</option>
            <option value="italian">Italian</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
            <option value="japanese">Japanese</option>
            <option value="thai">Thai</option>
            <option value="greek">Greek</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="moroccan">Moroccan</option>
            <option value="lebanese">Lebanese</option>
            <option value="brazilian">Brazilian</option>
            <option value="peruvian">Peruvian</option>
            <option value="korean">Korean</option>
            <option value="vietnamese">Vietnamese</option>

            {/* Add more cuisine options as needed */}
          </select>
        </div>
        {/* Add more filter options as needed */}
        <div className="w-full md:w-1/3 px-2 mb-4 flex items-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

FilterBar.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterBar;
