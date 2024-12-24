import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Coffee, Brain } from "lucide-react";
import { getRandomFoodTrivia, getRandomFoodJoke } from "../utils/api";

const FoodJokeTrivia = () => {
  const [content, setContent] = useState({ text: "", type: "trivia" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContent = async (type = "trivia") => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (type === "trivia") {
        data = await getRandomFoodTrivia();
      } else {
        data = await getRandomFoodJoke();
      }
      setContent({ text: data.text, type });
    } catch (err) {
      setError(`Failed to fetch food ${type}. Please try again later.`);
      console.error(`Error fetching food ${type}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-600" />
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Food Fun Facts</h2>
          <p className="text-sm text-gray-600 mt-1">Discover jokes and trivia about food!</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-xl relative flex">
            <motion.div
              className="absolute rounded-lg bg-white shadow-sm"
              initial={false}
              animate={{
                translateX: content.type === "joke" ? "0%" : "100%"
              }}
              style={{
                width: "calc(50% - 4px)",
                top: "4px",
                bottom: "4px",
                left: "4px"
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchContent("joke")}
              className={`z-10 px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
                content.type === "joke"
                  ? "text-orange-600"
                  : "text-gray-600"
              }`}
              style={{ width: "120px" }}
            >
              <Coffee className="w-4 h-4" />
              <span>Joke</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchContent("trivia")}
              className={`z-10 px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
                content.type === "trivia"
                  ? "text-orange-600"
                  : "text-gray-600"
              }`}
              style={{ width: "120px" }}
            >
              <Brain className="w-4 h-4" />
              <span>Trivia</span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-8 h-8 text-orange-500" />
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <p className="text-red-500">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchContent(content.type)}
                className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={content.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <blockquote className="text-lg text-gray-700 text-center italic px-8 py-6">
                &ldquo;{content.text}&rdquo;
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchContent(content.type)}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Get Another {content.type === "joke" ? "Joke" : "Trivia"}</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodJokeTrivia;
