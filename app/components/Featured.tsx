import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-10 pb-10 px-6 md:px-16 lg:px-56">
            <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12 md:gap-24 lg:gap-48">
{/* Right Side - Video */}
<div className=" flex justify-center">
<video 
  className="w-[600px] h-[600px] rounded-3xl object-cover"
  autoPlay
  loop
  muted
  controls={false} // Disable controls
  playsInline // Ensures the video plays inline without fullscreen on mobile
  src="/5.mp4" 
  poster="vid"
>
  Your browser does not support the video tag.
</video>

                </div>

                {/* Left Side - Text Elements */}
                <div className="flex flex-col w-full md:w-1/2 gap-6 md:gap-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-left">Become a Musafir</h1>
                    <p className="text-lg md:text-xl text-gray-600 text-center md:text-left">Find your perfect journey with us</p>
                    <div className="flex flex-col text-center md:text-left gap-4 md:gap-5">
                        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                            <button className="text-white bg-blue-400 px-2 rounded-2xl text-xs font-bold">01</button>
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-neutral-600">Explore New Destinations</h2>
                                <p className="text-neutral-400 pt-2 text-xs md:text-sm">Discover exciting destinations tailored to your adventurous spirit and flexible lifestyle.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                            <span className="text-white bg-purple-400 px-2 rounded-2xl text-xs font-bold">02</span>
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-neutral-600">Travel with Confidence</h2>
                                <p className="text-neutral-400 pt-2 text-xs md:text-sm">Navigate your trips with our reliable guides, ensuring a worry-free experience.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                            <span className="text-white bg-teal-400 px-2 rounded-2xl text-xs font-bold">03</span>
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-neutral-600">Know What to Expect</h2>
                                <p className="text-neutral-400 pt-2 text-xs md:text-sm">Get detailed insights into your destinations, so you’re always prepared for what’s ahead.</p>
                            </div>
                        </div>
                        <Link href="/community">
                            <button className="md:self-start self-center bg-teal-400 text-white px-6 py-2 rounded-full mt-6 md:ml-8">
                                Start your search
                            </button>
                        </Link>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default HeroSection;
