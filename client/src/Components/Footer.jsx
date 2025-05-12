import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">InfluencerHub</h3>
                        <p className="text-gray-400 mb-4">
                            Connecting brands with the perfect influencers to amplify your message and reach your target audience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Browse Influencers</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">For Brands</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">For Influencers</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Fashion</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Beauty</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Lifestyle</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Travel</Link></li>
                            <li><Link to={"/"} className="text-gray-400 hover:text-white transition-colors">Technology</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin size={44} className="mr-2 text-teal-500 mt-1" />
                                <span className="text-gray-400">204, Royal Ratan Tower, 7, Mahatma Gandhi Rd, South Tukoganj, Indore, Madhya Pradesh 452001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2 text-teal-500" />
                                <span className="text-gray-400">+91 9893721920</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2 text-teal-500" />
                                <span className="text-gray-400">eskillsweb@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 InfluencerHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer