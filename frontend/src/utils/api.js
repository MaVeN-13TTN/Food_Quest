import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const searchRecipes = async (query, cuisine) => {
  try {
    const response = await api.get("/recipes/complexSearch", {
      params: {
        query,
        cuisine,
        addRecipeInformation: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await api.get(`/recipes/${recipeId}/information`);
    return response.data;
  } catch (error) {
    console.error("Error getting recipe details:", error);
    throw error;
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await api.get("/recipes/random", {
      params: {
        number: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting random recipe:", error);
    throw error;
  }
};

export const searchFoodVideos = async (query) => {
  try {
    const response = await api.get("/food/videos/search", {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching food videos:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register/`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login/`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const checkAuthentication = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/check-auth/`);
    return response.data.authenticated;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export const addToFavorites = async (recipe) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/favorites/`, recipe);
    return response.data;
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (recipeId) => {
  try {
    await axios.delete(`${BASE_URL}/api/favorites/${recipeId}/`);
  } catch (error) {
    console.error("Error removing recipe from favorites:", error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/favorites/`);
    return response.data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
};

export const addToBookmarks = async (recipe) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/bookmarks/`, recipe);
    return response.data;
  } catch (error) {
    console.error("Error adding recipe to bookmarks:", error);
    throw error;
  }
};

export const removeFromBookmarks = async (recipeId) => {
  try {
    await axios.delete(`${BASE_URL}/api/bookmarks/${recipeId}/`);
  } catch (error) {
    console.error("Error removing recipe from bookmarks:", error);
    throw error;
  }
};

export const getBookmarks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/bookmarks/`);
    return response.data;
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    throw error;
  }
};

export const getRandomFoodJoke = async () => {
  try {
    const response = await api.get("/food/jokes/random");
    return response.data;
  } catch (error) {
    console.error("Error getting random food joke:", error);
    throw error;
  }
};

export const getRandomFoodTrivia = async () => {
  try {
    const response = await api.get("/food/trivia/random");
    return response.data;
  } catch (error) {
    console.error("Error getting random food trivia:", error);
    throw error;
  }
};
