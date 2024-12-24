import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlayCircle, ExternalLink } from "lucide-react";
import PropTypes from 'prop-types';
import SearchBar from "../components/SearchBar";
import { searchFoodVideos } from "../utils/api";

const VideoCard = ({ video }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
  >
    <div className="relative aspect-video">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${video.youTubeId}`}
        title={video.title}
        allowFullScreen
        className="absolute inset-0"
      ></iframe>
    </div>
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h2>
      <div className="flex items-center justify-between mt-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`https://www.youtube.com/watch?v=${video.youTubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Watch on YouTube
        </motion.a>
        <span className="text-sm text-gray-500">
          {video.length} mins
        </span>
      </div>
    </div>
  </motion.div>
);

VideoCard.propTypes = {
  video: PropTypes.shape({
    youTubeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
};

const FoodVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchFoodVideos(query);
      setVideos(data.videos);
    } catch (err) {
      setError("Failed to fetch videos. Please try again.");
      console.error("Error searching food videos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block"
          >
            <PlayCircle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Cooking Videos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch and learn from the best cooking videos from around the world
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search className="w-8 h-8 text-orange-500" />
              </motion.div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch("")}
                className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Try Again
              </motion.button>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {videos.map((video) => (
                  <VideoCard key={video.youTubeId} video={video} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Start searching for cooking videos to see the results here!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FoodVideos;
