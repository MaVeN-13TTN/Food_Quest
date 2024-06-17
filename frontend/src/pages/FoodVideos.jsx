import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchFoodVideos } from "../utils/api";

const FoodVideos = () => {
  const [videos, setVideos] = useState([]);

  const handleSearch = async (query) => {
    try {
      const data = await searchFoodVideos(query);
      setVideos(data.videos);
    } catch (error) {
      console.error("Error searching food videos:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Food Videos</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-8">
        {videos.map((video) => (
          <div key={video.youTubeId} className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${video.youTubeId}`}
              title={video.title}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodVideos;
