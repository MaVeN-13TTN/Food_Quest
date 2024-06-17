import { useEffect, useState } from "react";
import { getRandomFoodJoke, getRandomFoodTrivia } from "../utils/api";

const FoodJokeTrivia = () => {
  const [joke, setJoke] = useState("");
  const [trivia, setTrivia] = useState("");

  useEffect(() => {
    const fetchJokeTrivia = async () => {
      try {
        const jokeData = await getRandomFoodJoke();
        const triviaData = await getRandomFoodTrivia();
        setJoke(jokeData.text);
        setTrivia(triviaData.text);
      } catch (error) {
        console.error("Error getting food joke and trivia:", error);
      }
    };

    fetchJokeTrivia();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">Food Joke and Trivia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Food Joke</h3>
            <p>{joke}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Food Trivia</h3>
            <p>{trivia}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodJokeTrivia;
