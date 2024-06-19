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
          <option value="african">African</option>
          <option value="asian">Asian</option>
          <option value="american">American</option>
          <option value="british">British</option>
          <option value="cajun">Cajun</option>
          <option value="caribbean">Caribbean</option>
          <option value="chinese">Chinese</option>
          <option value="eastern_european">Eastern European</option>
          <option value="european">European</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="irish">Irish</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="jewish">Jewish</option>
          <option value="korean">Korean</option>
          <option value="latin_american">Latin American</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="mexican">Mexican</option>
          <option value="middle_eastern">Middle Eastern</option>
          <option value="nordic">Nordic</option>
          <option value="southern">Southern</option>
          <option value="spanish">Spanish</option>
          <option value="thai">Thai</option>
          <option value="vietnamese">Vietnamese</option>
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
