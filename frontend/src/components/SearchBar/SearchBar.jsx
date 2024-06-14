// SearchBar.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={term}
          onChange={handleInputChange}
          className="border rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for recipes..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
