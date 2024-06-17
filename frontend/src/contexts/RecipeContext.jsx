import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  RecipeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const addToFavorites = (recipe) => {
    setFavorites([...favorites, recipe]);
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== recipeId));
  };

  const addToBookmarks = (recipe) => {
    setBookmarks([...bookmarks, recipe]);
  };

  const removeFromBookmarks = (recipeId) => {
    setBookmarks(bookmarks.filter((recipe) => recipe.id !== recipeId));
  };

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        bookmarks,
        addToFavorites,
        removeFromFavorites,
        addToBookmarks,
        removeFromBookmarks,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
