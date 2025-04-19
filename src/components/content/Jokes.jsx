import React, { useState } from "react";

const Story = () => {
  const [stories, setStories] = useState({
    "Adventure": [
      "Once upon a time, a young explorer set off on a journey to find the lost city hidden deep within the jungle.",
      "The pirate captain gazed at the treasure map, realizing the final clue was right in front of him all along.",
      "Emma always dreamed of climbing the tallest mountain. Today was the day she finally reached the peak.",
      "A mysterious letter led Alex to an abandoned lighthouse where a secret was waiting to be uncovered."
    ],
    "Fantasy": [
      "Deep in the enchanted forest, a small village thrived under the protection of a powerful wizard.",
      "A curious elf stumbled upon a glowing crystal, unlocking powers that could change the fate of his kingdom.",
      "The dragon guarded a hidden library, where books came to life whenever someone opened them.",
      "A lonely girl discovered a talking cat who guided her on a magical quest to restore harmony to the realm."
    ],
    "Mystery": [
      "Detective Carter stepped into the old mansion, convinced the missing artifact was hidden somewhere within its walls.",
      "The town's only clock stopped at midnight. No one knew why—until the stranger arrived.",
      "Every night, someone left fresh flowers at the abandoned station. But who, and why?",
      "The old bookstore owner vanished, leaving behind cryptic notes scattered among the shelves."
    ]
  });

  const [currentIndex, setCurrentIndex] = useState(
    Object.keys(stories).reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const [newStory, setNewStory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const nextStory = (category) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: prevIndex[category] < stories[category].length - 1
        ? prevIndex[category] + 1
        : 0,
    }));
  };

  const previousStory = (category) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: prevIndex[category] > 0
        ? prevIndex[category] - 1
        : stories[category].length - 1,
    }));
  };

  const addStory = (category) => {
    if (newStory.trim()) {
      setStories((prevStories) => ({
        ...prevStories,
        [category]: [...prevStories[category], newStory],
      }));
      setNewStory("");
      setShowInput(false);
    }
  };

  return (
    <div className="bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Stories App</h1>
      {Object.keys(stories).map((category) => (
        <div key={category} className="bg-blue-500 text-white rounded p-4 mb-6 relative min-h-[260px]">
          <h2 className="text-2xl font-semibold text-center mb-4">{category}</h2>
          <button
            onClick={() => {
              setSelectedCategory(category);
              setShowInput(!showInput);
            }}
            className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Story
          </button>
          <div className="text-center">
            <div
              className="p-4 mb-4 text-white rounded"
              style={{ display: "inline-block", minWidth: "200px", backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {stories[category][currentIndex[category]]}
            </div>
          </div>
          <button onClick={() => previousStory(category)} className="absolute bottom-2 left-2 px-3 py-1 bg-gray-500 text-white rounded">
            Previous
          </button>
          <button onClick={() => nextStory(category)} className="absolute bottom-2 right-2 px-3 py-1 bg-yellow-500 text-white rounded">
            Next
          </button>
          {showInput && selectedCategory === category && (
            <div className="mt-4 text-center">
              <input
                type="text"
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                className="p-2 border rounded mx-2 text-black"
                placeholder={`Add a new story to "${category}"...`}
              />
              <div className="mt-2 bg-white p-2 rounded text-black">{newStory || "Start typing your story here..."}</div>
              <button
                onClick={() => addStory(category)}
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

export default Story;