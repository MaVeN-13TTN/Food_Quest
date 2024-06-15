import { useContext } from "react";
import { GlobalContext } from "../context/Context";

const SearchBar = () => {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search recipes..."
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
