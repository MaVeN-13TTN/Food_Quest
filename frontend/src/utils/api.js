import axios from "axios";

const BASE_URL = "https://api.spoonacular.com";
const API_KEY = "b0362a642ab9408bbedbf88a0b01da0b";

export const searchRecipes = async (query, filters) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        cuisine: filters.cuisine,
        diet: filters.diet,
        intolerances: filters.intolerances,
        instructionsRequired: true,
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
    const response = await axios.get(
      `${BASE_URL}/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: API_KEY,
          includeNutrition: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        apiKey: API_KEY,
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
    const response = await axios.get(`${BASE_URL}/food/videos/search`, {
      params: {
        apiKey: API_KEY,
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching food videos:", error);
    throw error;
  }
};

export const getRandomFoodJoke = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/food/jokes/random`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting random food joke:", error);
    throw error;
  }
};

export const getRandomFoodTrivia = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/food/trivia/random`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting random food trivia:", error);
    throw error;
  }
};
