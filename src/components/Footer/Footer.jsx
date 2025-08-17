import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaDiscord, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        resources: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Jokes', path: '/jokes' },
            { name: 'Poems', path: '/poem' },
            { name: 'Stories', path: '/story' }
        ],
        social: [
            { name: 'GitHub', icon: FaGithub, url: 'https://github.com/kaustavvdeka' },
            { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/electrophile_kd?igsh=OWVrbzF5aWU3bzJw' },
            { name: 'Discord', icon: FaDiscord, url: '#' },
            { name: 'Twitter', icon: FaTwitter, url: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '#' },
            { name: 'Terms & Conditions', path: '#' },
            { name: 'Cookie Policy', path: '#' },
            { name: 'DMCA', path: '#' }
        ]
    };

    return (
        <footer className="relative mt-20">
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${Math.random() * 3 + 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="glass-card mx-4 mb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Brand Section */}
                            <div className="lg:col-span-1">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl font-bold font-['Poppins']">C</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold gradient-text font-['Poppins']">
                                            Creationity
                                        </h3>
                                        <p className="text-sm text-gray-600">Share Your Creativity</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Join thousands of creators sharing their jokes, stories, poems, and pickup lines with the world.
                                </p>
                                <div className="flex space-x-4">
                                    {footerLinks.social.map((social, index) => {
                                        const IconComponent = social.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                                            >
                                                <IconComponent size={18} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Resources */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-6">Resources</h4>
                                <ul className="space-y-3">
                                    {footerLinks.resources.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                                            >
                                                <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-6">Follow Us</h4>
                                <ul className="space-y-3">
                                    {footerLinks.social.map((social, index) => {
                                        const IconComponent = social.icon;
                                        return (
                                            <li key={index}>
                                                <a
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                                                >
                                                    <IconComponent className="mr-3" size={16} />
                                                    {social.name}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-6">Legal</h4>
                                <ul className="space-y-3">
                                    {footerLinks.legal.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group"
                                            >
                                                <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="glass-card mx-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <span>© 2025 Creationity. Made with</span>
                                <FaHeart className="text-red-500 animate-pulse" />
                                <span>by Kaustav</span>
                            </div>
                            
                            <button
                                onClick={scrollToTop}
                                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                            >
                                <FaArrowUp size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;