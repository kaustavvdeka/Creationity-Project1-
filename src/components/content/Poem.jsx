import React, { useState } from "react";

const Poem = () => {
  const [poems, setPoems] = useState({
    "Nature": [
      "The leaves whisper secrets to the wind, dancing beneath the golden sun.",
      "Raindrops play a gentle tune upon the rooftop, a melody only nature knows.",
      "The mountains stand like silent sages, watching over the valleys below.",
      "Beneath the moon’s silver glow, the ocean sings its endless song."
    ],
    "Love": [
      "Your laughter is the sweetest tune, filling my heart with joy anew.",
      "A single glance, and the world melts away, leaving only you and I.",
      "Through seasons change, my love remains, a flame that never dies.",
      "The stars write our story in the sky, a tale of hearts intertwined."
    ],
    "Dreams": [
      "Close your eyes and let the stars guide you to lands unseen.",
      "A dream is a whisper from tomorrow, waiting for you to listen.",
      "The journey begins where thoughts take flight and wishes dare to grow.",
      "What if dreams are not illusions, but destinations in disguise?"
    ]
  });

  const [currentIndex, setCurrentIndex] = useState(
    Object.keys(poems).reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const [newPoem, setNewPoem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const nextPoem = (category) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: prevIndex[category] < poems[category].length - 1
        ? prevIndex[category] + 1
        : 0,
    }));
  };

  const previousPoem = (category) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [category]: prevIndex[category] > 0
        ? prevIndex[category] - 1
        : poems[category].length - 1,
    }));
  };

  const addPoem = (category) => {
    if (newPoem.trim()) {
      setPoems((prevPoems) => ({
        ...prevPoems,
        [category]: [...prevPoems[category], newPoem],
      }));
      setNewPoem("");
      setSelectedCategory(null); // Hide the input field after adding the poem
    }
  };

  return (
    <div className="bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Poems App</h1>
      {Object.keys(poems).map((category) => (
        <div key={category} className="bg-purple-500 text-white rounded p-4 mb-6 relative min-h-[260px]">
          <h2 className="text-2xl font-semibold text-center mb-4">{category}</h2>
          <button
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Poem
          </button>
          <div className="text-center">
            <div
              className="p-4 mb-4 text-white rounded"
              style={{ display: "inline-block", minWidth: "200px", backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {poems[category][currentIndex[category]]}
            </div>
          </div>
          <button onClick={() => previousPoem(category)} className="absolute bottom-2 left-2 px-3 py-1 bg-gray-500 text-white rounded">
            Previous
          </button>
          <button onClick={() => nextPoem(category)} className="absolute bottom-2 right-2 px-3 py-1 bg-yellow-500 text-white rounded">
            Next
          </button>
          {selectedCategory === category && (
            <div className="mt-4 text-center">
              <input
                type="text"
                value={newPoem}
                onChange={(e) => setNewPoem(e.target.value)}
                className="p-2 border rounded mx-2 text-black"
                placeholder={`Add a new poem to "${category}"...`}
              />
              <div className="mt-2 bg-white p-2 rounded text-black">{newPoem || "Start typing your poem here..."}</div>
              <button
                onClick={() => addPoem(category)}
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

export default Poem;