import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getFavorites, getBookmarks, checkAuthentication } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const checkAuthStatus = async () => {
    try {
      await checkAuthentication();
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      // Only redirect to login if the error is 401 and we're not already on the login or signup page
      if (error.response?.status === 401 && 
          !location.pathname.includes('/login') && 
          !location.pathname.includes('/signup')) {
        navigate("/login");
      }
      return false;
    }
  };

  // Check authentication status only when not on auth pages
  useEffect(() => {
    if (!location.pathname.includes('/login') && !location.pathname.includes('/signup')) {
      checkAuthStatus();
    }
  }, [location.pathname]);

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
