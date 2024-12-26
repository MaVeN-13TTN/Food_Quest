import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const FilterSection = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState(filters);

  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  const cuisines = [
    "African", "Asian", "American", "British", "Caribbean", "Chinese",
    "European", "French", "German", "Greek", "Indian", "Italian",
    "Japanese", "Korean", "Mediterranean", "Mexican", "Middle Eastern",
    "Spanish", "Thai", "Vietnamese"
  ];

  const diets = [
    "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
    "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", 
    "Low FODMAP", "Whole30"
  ];

  const intolerances = [
    "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood",
    "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"
  ];

  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...selectedFilters,
      [category]: selectedFilters[category] === value ? "" : value,
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderFilterButtons = (options, category) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedFilters[category] === option;
        return (
          <button
            key={option}
            onClick={() => handleFilterChange(category, option)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option}
            {isSelected && (
              <X className="inline-block ml-1 h-3 w-3" />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Cuisine</h3>
        {renderFilterButtons(cuisines, "cuisine")}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Diet</h3>
        {renderFilterButtons(diets, "diet")}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Intolerances</h3>
        {renderFilterButtons(intolerances, "intolerances")}
      </div>

      {Object.values(selectedFilters).some(value => value) && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              const clearedFilters = {
                cuisine: "",
                diet: "",
                intolerances: "",
              };
              setSelectedFilters(clearedFilters);
              onFilterChange(clearedFilters);
            }}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear all filters
          </button>
        </div>
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
