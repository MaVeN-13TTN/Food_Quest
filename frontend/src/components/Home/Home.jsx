import PropTypes from "prop-types";

const FeaturedRecipe = ({ title, image, description }) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-40 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-medium hover:underline">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

FeaturedRecipe.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const PopularCategory = ({ title, icon }) => {
  return (
    <button className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
      <span className="mr-2 material-icons">{icon}</span>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
};

PopularCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const Home = () => {
  const featuredRecipes = [
    {
      title: "Spiced Chickpea Curry",
      image: "https://via.placeholder.com/300x200", // Replace with actual image URL
      description:
        "Aromatic and flavorful Indian dish perfect for a satisfying meal.",
    },
    // Add more featured recipes here
  ];

  const popularCategories = [
    { title: "Italian", icon: "flag_it" },
    { title: "Mexican", icon: "flag_mx" },
    { title: "Vegetarian", icon: "lunch_dining" },
    // Add more popular categories here
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to FoodQuest</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredRecipes.map((recipe) => (
          <FeaturedRecipe key={recipe.title} {...recipe} />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          {popularCategories.map((category) => (
            <PopularCategory key={category.title} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
