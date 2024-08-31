import React, { useEffect, useState } from "react";

const CommunitySidebar = () => {
  const [currentVideos, setCurrentVideos] = useState([0, 0, 0, 0]);

  const videoSources = [
    ["/side1.mp4", "/6.mp4", "/main.mp4", "/5.mp4"],
    ["/6.mp4", "/main.mp4", "/5.mp4", "/side1.mp4"],
    ["/main.mp4", "/5.mp4", "/side1.mp4", "/6.mp4"],
    ["/5.mp4", "/side1.mp4", "/6.mp4", "/main.mp4"],
  ];

  const topLocations = [
    { name: "Chennai, Rameshwaram", img: "/a1.jpg" },
    { name: "Goa, India", img: "/a2.jpg" },
    { name: "Kolkata, Bengal", img: "/a4.jpg" },
    { name: "Andaman, Island", img: "/a5.jpg" },
    { name: "Bali, Indonesia", img: "/a3.jpg" },
   
  ];

  useEffect(() => {
    const intervals = videoSources.map((_, index) =>
      setInterval(() => {
        setCurrentVideos((prev) => {
          const newVideos = [...prev];
          newVideos[index] = (newVideos[index] + 1) % videoSources[index].length;
          return newVideos;
        });
      }, 5000)
    );

    return () => intervals.forEach(clearInterval);
  }, [videoSources]);

  return (
    <div className="bg-white px-6 py-4 rounded  h-screen overflow-y-auto">
      {/* Trending Feeds */}
      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">Trending Feeds</h4>
        <div className="grid grid-cols-2 gap-2">
          {currentVideos.map((videoIndex, i) => (
            <div key={i} className="w-full h-32">
              <video
                src={videoSources[i][videoIndex]}
                autoPlay
                muted
                className="w-full h-full rounded object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Locations */}
      <div className="mb-8">
        <h4 className="text-lg font-bold mb-2">Top Locations</h4>
        <ul>
          {topLocations.map((location, index) => (
            <li key={index} className="mb-2 flex items-center">
              <img
                src={location.img}
                alt={location.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-gray-800">{location.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile Activity */}
      
    </div>
  );
};

export default CommunitySidebar;
