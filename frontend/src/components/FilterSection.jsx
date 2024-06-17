import PropTypes from "prop-types";

const FilterSection = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <form className="mt-4">
      <div className="mb-4">
        <label htmlFor="cuisine" className="block mb-2 font-bold text-gray-700">
          Cuisine
        </label>
        <select
          id="cuisine"
          name="cuisine"
          value={filters.cuisine}
          onChange={handleChange}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-peel"
        >
          <option value="">All</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
          {/* Add more cuisine options */}
        </select>
      </div>
      {/* Add more filter options */}
    </form>
  );
};

FilterSection.propTypes = {
  filters: PropTypes.shape({
    cuisine: PropTypes.string,
    diet: PropTypes.string,
    intolerances: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterSection;
