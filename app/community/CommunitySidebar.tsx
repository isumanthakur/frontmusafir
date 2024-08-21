import React, { useEffect, useState } from "react";

const CommunitySidebar = () => {
  const [currentVideos, setCurrentVideos] = useState([0, 0, 0, 0]); // Initial video index for each section

  const videoSources = [
    ["/5.mp4", "/2.mp4", "/6.mp4", "/7.mp4"],  // First video in each section
    ["/1.mp4", "/50.mp4", "/49.mp4", "/51.mp4"],  // Second video in each section
    ["/2.mp4", "/5.mp4", "/7.mp4", "/6.mp4"], // Third video in each section
    ["/49.mp4", "/7.mp4", "/51.mp4", "/1.mp4"] // Fourth video in each section
  ];

  const topLocations = [
    { name: "Agra, Delhi", img: "/10.jpg" },
    { name: "Mumbai, India", img: "/6.jpg" },
    { name: "Kolkata, Bengal", img: "/13.jpg" },
    { name: "Kochi, Kerala", img: "/14.jpg" },
  ];

  useEffect(() => {
    const intervals = videoSources.map((_, index) =>
      setInterval(() => {
        setCurrentVideos((prev) => {
          const newVideos = [...prev];
          newVideos[index] = (newVideos[index] + 1) % videoSources[index].length;
          return newVideos;
        });
      }, 5000) // Change video every 5 seconds
    );

    return () => intervals.forEach(clearInterval);
  }, [videoSources]);

  return (
    <div className="w-1/4 bg-white px-9 rounded hidden md:block shadow-md">
      {/* Dynamic Video Grid */}
      <div className="mb-8">
        <h4 className="text-lg font-bold font-sans mb-2">Trending Feeds</h4>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {currentVideos.map((videoIndex, i) => (
            <div key={i} className="w-full h-32">
              <video
                src={videoSources[i][videoIndex]}
                autoPlay
                muted
                loop={false} // Don't loop, we handle video change manually
                className="w-full h-full rounded object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="mb-8">
        <h4 className="text-lg font-bold font-sans mb-2">Top Locations</h4>
        <ul>
          {topLocations.map((location, index) => (
            <li key={index} className="mb-2 flex items-center font-sans font-semibold">
              <img src={location.img} alt={location.name} className="w-10 h-10 rounded-full mr-3" />
              <span className="text-gray-800">{location.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section - Profile Activity */}
      <div className="profile-activity rounded-3xl bg-gray-100 p-2">
        <h4 className="text-lg font-bold mb-2 font-sans">Profile Activity</h4>
        <div className="flex items-center mb-4">
          <img src="/1.jpg" alt="Profile 1" className="w-8 h-8 rounded-full mr-2" />
          <img src="/6.jpg" alt="Profile 2" className="w-8 h-8 rounded-full mr-2" />
          <img src="/3.jpg" alt="Profile 3" className="w-8 h-8 rounded-full mr-2" />
          <img src="/4.jpg" alt="Profile 4" className="w-8 h-8 rounded-full mr-2" />
        </div>
        <p className="text-gray-700 font-semibold text-lg">24.3k Followers</p>
        <p className="text-gray-500 font-sans font-semibold text-xs ">Active now on your profile</p>
        <a href="#" className="text-emerald-500 hover:underline font-sans font-semibold text-xs">Join today</a>
      </div>
    </div>
  );
};

export default CommunitySidebar;
