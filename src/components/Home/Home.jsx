import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaugh, FaBookOpen, FaHeart, FaArrowRight, FaStar, FaUsers, FaLightbulb } from 'react-icons/fa';

function Home() {
    const features = [
        {
            title: "Jokes",
            description: "Why don't skeletons fight each other? They don't have the guts!",
            icon: FaLaugh,
            color: "from-yellow-400 to-orange-500",
            bgColor: "bg-yellow-100",
            link: "/jokes"
        },
        {
            title: "Stories",
            description: "Once upon a time, a young explorer set off to find the hidden city deep within the jungle...",
            icon: FaBookOpen,
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-100",
            link: "/story"
        },
        {
            title: "Poems",
            description: "The leaves whisper secrets to the wind, dancing beneath the golden sun...",
            icon: FaHeart,
            color: "from-purple-400 to-pink-500",
            bgColor: "bg-purple-100",
            link: "/poem"
        },
        {
            title: "Pickup Lines",
            description: "Are you a parking ticket? Because you've got FINE written all over you!",
            icon: FaHeart,
            color: "from-red-400 to-pink-500",
            bgColor: "bg-red-100",
            link: "/pickup-line"
        }
    ];

    const stats = [
        { number: "10K+", label: "Active Users", icon: FaUsers },
        { number: "50K+", label: "Content Pieces", icon: FaBookOpen },
        { number: "100+", label: "Daily Posts", icon: FaLightbulb }
    ];

    return (
        <div className="relative min-h-screen">
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 4 + 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="py-20 lg:py-32 relative">
                    {/* 3D Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 background-3d"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80')`,
                                transform: 'perspective(1000px) rotateX(5deg) scale(1.1)',
                                filter: 'blur(1px)'
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent"></div>
                    </div>

                    <div className="text-center space-y-8 relative z-10">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-7xl font-bold gradient-text font-['Poppins'] leading-tight text-3d">
                                Welcome to
                                <span className="block gradient-text-secondary">Creationity</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
                                Your gateway to creativity! Dive into a world full of humor, stories, poetry, and inspiration.
                            </p>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Explore curated content designed to entertain, inspire, and connect with your creative soul.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/jokes"
                                className="btn-3d px-8 py-4 text-lg font-semibold"
                            >
                                Explore Content
                                <FaArrowRight className="ml-2" />
                            </Link>
                            <Link
                                to="/about"
                                className="px-8 py-4 text-lg font-semibold text-purple-700 bg-white/20 backdrop-blur-sm border-2 border-purple-200 rounded-xl hover:bg-white/30 transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="glass-card p-8 text-center card-hover">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <IconComponent className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-3xl font-bold gradient-text mb-2">{stat.number}</h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold gradient-text font-['Poppins'] mb-4">
                            Explore Our Content
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover amazing content across different categories
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="glass-card p-6 card-hover group">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                                    <Link
                                        to={feature.link}
                                        className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:translate-x-2`}
                                    >
                                        Explore
                                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="glass-card p-12 text-center">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl font-bold gradient-text font-['Poppins']">
                                Ready to Share Your Creativity?
                            </h2>
                            <p className="text-xl text-gray-600">
                                Join thousands of creators and start sharing your jokes, stories, poems, and pickup lines with the world.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/signin"
                                    className="btn-3d px-8 py-4 text-lg font-semibold"
                                >
                                    Join Now
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-4 text-lg font-semibold text-purple-700 bg-white/20 backdrop-blur-sm border-2 border-purple-200 rounded-xl hover:bg-white/30 transition-all duration-300"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;