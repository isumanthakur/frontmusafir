import React from 'react';
import Link from 'next/link';

const HeroSections: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-48">
            <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 md:gap-48">

                {/* Left Side - Video */}
                <div className="order-2 md:order-1 md:w-1/2">
                    <video 
                        className="w-[400px] h-[600px] rounded-3xl shadow-2xl object-cover"
                        autoPlay
                        loop
                        src="/social-2.mp4" 
                        poster="vid"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Right Side - Text Elements */}
                <div className="order-1 md:order-2 flex flex-col w-full md:w-1/2 gap-8">
                    <h1 className="text-4xl font-bold text-gray-900">Share your journey</h1>
                    <p className="text-xl md:text-left text-center text-gray-600">With other musafirs</p>
                    <div className="flex md:text-left text-center flex-col gap-5">
                        <div className="flex items-start space-x-4">
                            <div>
                                <h2 className="text-xl font-semibold text-neutral-600">Post Your Pictures</h2>
                                <p className="text-neutral-400 pt-2 text-xs">Discover exciting destinations tailored to your adventurous spirit and flexible lifestyle.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div>
                                <h2 className="text-xl font-semibold text-neutral-600">Share Your Thoughts</h2>
                                <p className="text-neutral-400 pt-2 text-xs">Navigate your trips with our reliable guides, ensuring a worry-free experience.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div>
                                <h2 className="text-xl font-semibold text-neutral-600">Let The World Know About Hidden Gems</h2>
                                <p className="text-neutral-400 pt-2 text-xs">Get detailed insights into your destinations, so you’re always prepared for what’s ahead.</p>
                            </div>
                        </div>
                        <Link href="/community">
                            <button className="md:self-start self-center bg-emerald-500 text-white px-6 py-2 rounded-full mt-8">
                                Start your search
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroSections;
