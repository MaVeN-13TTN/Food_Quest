import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  };

  const handleAddToFavorite = (getCurrentItem) => {
    const updatedFavoritesList = [...favoritesList];
    const index = updatedFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      updatedFavoritesList.push(getCurrentItem);
    } else {
      updatedFavoritesList.splice(index, 1);
    }
    setFavoritesList(updatedFavoritesList);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalState;
