
import React, { useState, useEffect } from "react";
const Jokes = () => {
  const [jokes, setJokes] = useState({
    "One-liner": [
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "Why don't skeletons fight each other? They don't have the guts.",
      "I'm reading a book on anti-gravity—it's impossible to put down.",
      "Parallel lines have so much in common. It’s a shame they’ll never meet."
    ],
    "Formal Jokes": [
      "Why did the physics professor bring a ladder to class? To reach new heights of understanding.",
      "A programmer’s spouse asks, 'Why is the computer cold?' Answer: It left its Windows open.",
      "Why did the banker switch careers to farming? He wanted to grow his savings.",
      "What’s an astronaut’s favorite board game? Moonopoly!"
    ],
    "Dark": [
      "Why don’t graveyards ever get overcrowded? People are dying to get in.",
      "I have a joke about unemployment, but none of them work.",
      "The man who survived pepper spray and mustard gas is now considered a seasoned veteran.",
      "Some people graduate with honors, I am just honored to graduate at all…said the skeleton."
    ],
    "School Jokes": [
      "Why was the math book sad? It had too many problems.",
      "What do you call a sleeping teacher? Undisturbed.",
      "Why did the student eat his homework? Because his teacher said it was a piece of cake.",
      "How do you get straight A's? Use a ruler!"
    ]
  });

  const [currentIndex, setCurrentIndex] = useState(
    Object.keys(jokes).reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const [newJoke, setNewJoke] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showInput, setShowInput] = useState(false);
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const nextJoke = (category) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: prevIndex[category] < jokes[category].length - 1
        ? prevIndex[category] + 1
        : 0,
    }));
  };

  const previousJoke = (category) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: prevIndex[category] > 0
        ? prevIndex[category] - 1
        : jokes[category].length - 1,
    }));
  };

  const addJoke = (category) => {
    if (newJoke.trim()) {
      setJokes((prevJokes) => ({
        ...prevJokes,
        [category]: [...prevJokes[category], newJoke],
      }));
      setNewJoke("");
      setShowInput(false);
    }
  };

  return (
    <div className="bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Jokes App</h1>
      {Object.keys(jokes).map((category) => (
        <div key={category} className="bg-blue-500 text-white rounded p-4 mb-6 relative min-h-[260px]">
          <h2 className="text-2xl font-semibold text-center mb-4">{category}</h2>
          <button
            onClick={() => {
              setSelectedCategory(category);
              setShowInput(!showInput);
            }}
            className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Joke
          </button>
          <div className="text-center">
            <div
              className="p-4 mb-4 text-white rounded"
              style={{ display: "inline-block", minWidth: "200px", backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {jokes[category][currentIndex[category]]}
            </div>
          </div>
          <button onClick={() => previousJoke(category)} className="absolute bottom-2 left-2 px-3 py-1 bg-gray-500 text-white rounded">
            Previous
          </button>
          <button onClick={() => nextJoke(category)} className="absolute bottom-2 right-2 px-3 py-1 bg-yellow-500 text-white rounded">
            Next
          </button>
          {showInput && selectedCategory === category && (
            <div className="mt-4 text-center">
              <input
                type="text"
                value={newJoke}
                onChange={(e) => setNewJoke(e.target.value)}
                className="p-2 border rounded mx-2 text-black"
                placeholder={`Add a new joke to "${category}"...`}
              />
              <div className="mt-2 bg-white p-2 rounded text-black">{newJoke || "Start typing your joke here..."}</div>
              <button
                onClick={() => addJoke(category)}
                className="bg-green-500 text-white rounded px-3 py-2 mt-2"
              >
                Add
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Jokes;