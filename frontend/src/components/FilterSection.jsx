import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const FilterSection = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: filters.cuisine || "",
    diet: filters.diet || "",
    intolerances: filters.intolerances || "",
  });

  const cuisines = [
    "African", "Asian", "American", "British", "Caribbean", "Chinese",
    "European", "French", "German", "Greek", "Indian", "Italian",
    "Japanese", "Korean", "Mediterranean", "Mexican", "Middle Eastern",
    "Spanish", "Thai", "Vietnamese"
  ];

  const diets = [
    "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
    "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP",
    "Whole30"
  ];

  const intolerances = [
    "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood",
    "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"
  ];

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const renderFilterButtons = (options, category) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedFilters[category] === option;
        return (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterChange(category, option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option}
            {isSelected && (
              <X className="inline-block ml-1 h-4 w-4" />
            )}
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Cuisine</h3>
        {renderFilterButtons(cuisines, "cuisine")}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Diet</h3>
        {renderFilterButtons(diets, "diet")}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Intolerances</h3>
        {renderFilterButtons(intolerances, "intolerances")}
      </div>

      {Object.values(selectedFilters).some(value => value) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFilters({ cuisine: "", diet: "", intolerances: "" })}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
          >
            Clear all filters
          </motion.button>
        </motion.div>
      )}
    </div>
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
