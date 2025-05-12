import React, { useState, useEffect } from 'react';
import { Menu, X, CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../Features/auth/authSlice';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutUser());
        setIsMenuOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    const navItems = ['Home', 'Discover', 'Categories', 'About'];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-teal-700 font-bold text-2xl mr-6">
                        InfluencerHub
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map(item => (
                            <Link key={item} to="/" className="text-gray-700 hover:text-teal-600 transition-colors">
                                {item}
                            </Link>
                        ))}

                        {!user ? (
                            <Link
                                to="/login"
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to={user.isAdmin ? "/auth/admin" : "/auth/profile"}
                                    className="bg-teal-600 text-white px-3 py-1.5 rounded-md hover:bg-teal-700 transition flex items-center gap-2 text-sm"
                                >
                                    <CircleUser size={16} />
                                    <span>Welcome</span>
                                    <span className="font-semibold">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition text-sm"
                                >
                                    LogOut
                                </button>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-teal-600">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 space-y-3">
                        {navItems.map(item => (
                            <Link
                                key={item}
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-gray-700 hover:text-teal-600 py-2 transition"
                            >
                                {item}
                            </Link>
                        ))}

                        {!user ? (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-center"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    to={user.isAdmin ? "/auth/admin" : "/auth/profile"}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 text-sm"
                                >
                                    <CircleUser size={16} />
                                    <span>Welcome</span>
                                    <span className="font-semibold">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
                                >
                                    LogOut
                                </button>
                            </div>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;
