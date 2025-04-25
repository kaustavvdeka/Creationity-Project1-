import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://media.istockphoto.com/id/1056250904/photo/letter-c-logo-design.jpg?s=1024x1024&w=is&k=20&c=zq462f3DRYW3SpWzG3KPH3H5PhfE8gNyqfj1luTGeVE="
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>

                    {/* Mobile Menu Button (Hamburger / Close Icon) */}
                    <button
                        className="lg:hidden text-gray-800 px-4 py-2 rounded-md border border-gray-300"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Login & Get Started Buttons */}
                    <div className="hidden lg:flex items-center lg:order-2">
                        <Link to="#" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                            Log in
                        </Link>
                        <Link to="#" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                            Get started
                        </Link>
                    </div>

                    {/* Main Menu */}
                    <div className={`lg:flex w-full lg:w-auto lg:order-1 ${menuOpen ? "block" : "hidden"}`}>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {["Home", "Jokes", "Poem", "Story", "Contact"].map((item) => (
                                <li key={item}>
                                    <NavLink
                                        to={`/${item}`}
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        {item}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;