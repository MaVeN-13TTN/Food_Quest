import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

// Spoonacular API instance
const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Backend API instance
const backendApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

backendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return backendApi(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return Promise.reject(error);
    }

    try {
      const response = await backendApi.post('/api/auth/refresh/', {
        refresh: refreshToken
      });

      const { access } = response.data;
      localStorage.setItem('access_token', access);
      backendApi.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      originalRequest.headers.Authorization = `Bearer ${access}`;

      processQueue(null, access);
      return backendApi(originalRequest);
    } catch (err) {
      processQueue(err, null);
      // Clear tokens and reject if refresh fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

// Add error handling for Spoonacular API
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 402) {
      console.error('Spoonacular API quota exceeded');
      // You could implement a fallback here, like using cached data
      return Promise.reject(new Error('API quota exceeded. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

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
    const response = await backendApi.post(
      "/api/auth/register/",
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
    const response = await backendApi.post("/api/auth/login/", credentials);
    // Store tokens in localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    // Update Authorization header for future requests
    backendApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const checkAuthentication = async () => {
  try {
    const response = await backendApi.get('/api/auth/check-auth/');
    return response.data;
  } catch (error) {
    console.error('Error checking authentication:', error);
    throw error;
  }
};

export const addToFavorites = async (recipe) => {
  try {
    const response = await backendApi.post("/api/favorites/", {
      recipe_id: recipe.id,
      title: recipe.title,
      image_url: recipe.image,
      source_url: recipe.sourceUrl || "",
      ready_in_minutes: recipe.readyInMinutes || null,
      servings: recipe.servings || null,
      diets: recipe.diets || []
    });
    return response.data;
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (recipeId) => {
  try {
    await backendApi.delete(`/api/favorites/${recipeId}/`);
  } catch (error) {
    console.error("Error removing recipe from favorites:", error);
    if (error.response?.status === 404) {
      throw new Error("Recipe not found in favorites");
    } else if (error.response?.status === 401) {
      throw new Error("Please login to remove favorites");
    }
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await backendApi.get("/api/favorites/");
    return response.data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
};

export const addToBookmarks = async (recipe) => {
  try {
    const response = await backendApi.post("/api/bookmarks/", {
      recipe_id: recipe.id,
      title: recipe.title,
      image_url: recipe.image,
      source_url: recipe.sourceUrl || "",
      ready_in_minutes: recipe.readyInMinutes || null,
      servings: recipe.servings || null,
      diets: recipe.diets || []
    });
    return response.data;
  } catch (error) {
    console.error("Error adding recipe to bookmarks:", error);
    throw error;
  }
};

export const removeFromBookmarks = async (recipeId) => {
  try {
    await backendApi.delete(`/api/bookmarks/${recipeId}/`);
  } catch (error) {
    console.error("Error removing recipe from bookmarks:", error);
    if (error.response?.status === 404) {
      throw new Error("Recipe not found in bookmarks");
    } else if (error.response?.status === 401) {
      throw new Error("Please login to remove bookmarks");
    }
    throw error;
  }
};

export const getBookmarks = async () => {
  try {
    const response = await backendApi.get("/api/bookmarks/");
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
