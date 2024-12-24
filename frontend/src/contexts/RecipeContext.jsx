import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getFavorites, getBookmarks, checkAuthentication } from "../utils/api";
import { useNavigate } from "react-router-dom";

// Create context with default values
export const RecipeContext = createContext({
  favorites: [],
  setFavorites: () => {},
  bookmarks: [],
  setBookmarks: () => {},
  isLoading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuthStatus: () => {}
});

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      await checkAuthentication();
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      // Only redirect to login if the error is 401
      if (error.response?.status === 401) {
        navigate("/login");
      }
      return false;
    }
  };

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Load favorites and bookmarks only when authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const [favoritesData, bookmarksData] = await Promise.all([
          getFavorites(),
          getBookmarks()
        ]);
        setFavorites(favoritesData || []); // Ensure we always have an array
        setBookmarks(bookmarksData || []); // Ensure we always have an array
      } catch (error) {
        console.error("Error loading user data:", error);
        // Handle specific error cases
        if (error.response?.status === 401) {
          // Token might be expired, trigger a re-auth check
          const isStillAuthenticated = await checkAuthStatus();
          if (isStillAuthenticated) {
            // If we're still authenticated after refresh, retry loading data
            loadUserData();
          }
        }
        // Set empty arrays on error to prevent undefined
        setFavorites([]);
        setBookmarks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [isAuthenticated]); // Reload when authentication status changes

  const contextValue = {
    favorites,
    setFavorites,
    bookmarks,
    setBookmarks,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthStatus
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
