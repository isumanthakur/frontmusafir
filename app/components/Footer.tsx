import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 text-gray-400 rounded-t-3xl font-sans font-bold text-sm py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Tagline */}
                    <div className="md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-teal-500">Musafir</h2>
                        <p className="mt-2 text-teal-500">Explore the ocean with us.</p>
                    </div>

                    {/* Navigation Sections */}
                    <div className="flex flex-wrap justify-center md:justify-between w-full md:w-2/3 text-center md:text-left gap-8">
                        <div className="w-1/2 md:w-auto">
                            <h3 className="text-lg font-semibold text-black">Explore</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:text-white">Overview</a></li>
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Book</a></li>
                            </ul>
                        </div>
                        <div className="w-1/2 md:w-auto">
                            <h3 className="text-lg font-semibold text-black">Company</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:text-white">values</a></li>
                                <li><a href="#" className="hover:text-white">Press</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Brand use</a></li>
                            </ul>
                        </div>
                        <div className="w-1/2 md:w-auto">
                            <h3 className="text-lg font-semibold text-black">Support</h3>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Talk to the team</a></li>
                                <li><a href="#" className="hover:text-white">Education</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                    <p>&copy; 2024 Musafir. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
