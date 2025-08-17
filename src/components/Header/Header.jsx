import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt, FaHome, FaLaugh, FaBookOpen, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "", icon: FaHome },
    { name: "Jokes", path: "jokes", icon: FaLaugh },
    { name: "Poem", path: "poem", icon: FaBookOpen },
    { name: "Story", path: "story", icon: FaBookOpen },
    { name: "PickUpLine", path: "pickup-line", icon: FaHeart }
  ];

  return (
    <>
      {/* Particle background effect */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
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

      <header className="relative z-50">
        <nav className="glass-card mx-4 mt-4 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg glow">
                    <span className="text-white text-xl font-bold font-['Poppins']">C</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-25"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text font-['Poppins']">
                    Creationity
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">Share Your Creativity</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={`/${item.path}`}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 shadow-lg' 
                            : 'text-gray-700 hover:bg-white/10 hover:text-purple-600'
                        }`
                      }
                    >
                      <IconComponent size={16} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Auth Buttons / User Profile */}
              <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center space-x-3 glass px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{user?.username}</span>
                    </button>

                    {/* Profile Dropdown */}
                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-3 w-56 glass-card py-2 z-50">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/10 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <FaUser className="mr-3 text-purple-500" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/my-content"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/10 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <FaCog className="mr-3 text-purple-500" />
                          <span>My Content</span>
                        </Link>
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt className="mr-3" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link 
                      to="/signin" 
                      className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors text-sm"
                    >
                      Sign up
                    </Link>
                    <Link 
                      to="/login" 
                      className="btn-3d px-4 py-2 text-sm"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex-shrink-0">
                <button
                  onClick={toggleMenu}
                  className="glass p-2 rounded-xl hover:bg-white/20 transition-colors"
                >
                  {menuOpen ? <FaTimes size={24} className="text-gray-700" /> : <FaBars size={24} className="text-gray-700" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
              <div className="lg:hidden glass-card mt-4 p-4">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <NavLink
                        key={item.name}
                        to={`/${item.path}`}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700' 
                              : 'text-gray-700 hover:bg-white/10'
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <IconComponent size={18} />
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>

                {/* Mobile Auth Menu */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-4 py-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user?.username}</p>
                          <p className="text-sm text-gray-600">Logged in</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/10 rounded-xl transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUser className="mr-3 text-purple-500" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/my-content"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/10 rounded-xl transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaCog className="mr-3 text-purple-500" />
                        <span>My Content</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/signin"
                        className="block w-full text-center px-4 py-3 text-gray-700 hover:bg-white/10 rounded-xl transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="block w-full text-center btn-3d"
                        onClick={() => setMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
