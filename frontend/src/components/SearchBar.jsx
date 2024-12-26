import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sliders } from "lucide-react";
import FilterSection from "./FilterSection";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    diet: "",
    intolerances: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative flex items-center mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for recipes, ingredients, or cuisines..."
              value={query}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-l-xl bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 placeholder-gray-400 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Sliders className={`h-5 w-5 transition-colors duration-200 ${showFilters ? 'text-orange-500' : 'text-gray-400'}`} />
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="ml-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-r-xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg transition-all duration-200"
          >
            Search
          </motion.button>
        </form>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full bg-white rounded-xl p-4 shadow-lg border border-gray-200"
            >
              <FilterSection filters={filters} onFilterChange={handleFilterChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
