import { useState } from "react";
import PropTypes from "prop-types";
import FilterSection from "./FilterSection";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    diet: "",
    intolerances: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-peel"
        />
        <button
          type="submit"
          className="bg-orange-peel hover:bg-sandy-brown text-white px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
