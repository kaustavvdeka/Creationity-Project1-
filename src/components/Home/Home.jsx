import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Header Section */}
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Welcome to Our Website
                            <span className="hidden sm:block text-4xl">Your Gateway to Creativity!</span>
                        </h2>
                        <p className="text-lg">
                            Dive into a world full of humor, stories, poetry, and inspiration. Explore curated content designed to entertain, inspire, and connect with your creative soul.
                        </p>
                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-blue-700 rounded-lg hover:opacity-75"
                            to="/contact"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full">
                    <img className="w-full object-cover h-64 sm:h-96" src="https://images.pexels.com/photos/17041194/pexels-photo-17041194/free-photo-of-creative-painting-background.jpeg" alt="Creative Background" />
                </div>
            </aside>

            {/* Recommended Sections */}
            <div className="py-10 mx-6 sm:mx-20">
                {/* Jokes Section */}
                <div className="mb-8 bg-yellow-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Jokes</h3>
                    <p className="text-lg">Why don’t skeletons fight each other? They don’t have the guts!</p>
                    <Link className="inline-block mt-4 px-6 py-2 bg-yellow-500 text-white rounded hover:opacity-75" to="/jokes">
                        Visit Jokes
                    </Link>
                </div>

                {/* Story Section */}
                <div className="mb-8 bg-green-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Stories</h3>
                    <p className="text-lg">Once upon a time, a young explorer set off to find the hidden city deep within the jungle...</p>
                    <Link className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded hover:opacity-75" to="/story">
                        Visit Stories
                    </Link>
                </div>

                {/* Poem Section */}
                <div className="mb-8 bg-purple-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Poems</h3>
                    <p className="text-lg">The leaves whisper secrets to the wind, dancing beneath the golden sun...</p>
                    <Link className="inline-block mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:opacity-75" to="/poem">
                        Visit Poems
                    </Link>
                </div>

                {/* Mixed Content Section */}
                <div className="mb-8 bg-orange-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Mixed Content</h3>
                    <p className="text-lg">Why don’t skeletons fight each other? They don’t have the guts! <br /> The explorer gazed at the map... <br /> The ocean sings its endless song...</p>
                    <Link className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:opacity-75" to="/mix">
                        Visit Mixed Content
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;