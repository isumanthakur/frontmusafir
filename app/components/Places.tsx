"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const LocationCardRow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      const scrollStep = 1; // How many pixels to move per step
      const interval = 20; // How often to move (in ms)

      const scroll = () => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollStep;
        }
      };

      const scrollInterval = setInterval(scroll, interval);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  const locations = [
    {
      name: 'Kolkata',
      imageUrl: '/94.jpg',
    },
    {
      name: 'Mumbai',
      imageUrl: '/97.jpg',
    },
    {
      name: 'Delhi',
      imageUrl: '/98.jpg',
    },
    {
      name: 'Goa',
      imageUrl: '/100.jpg',
    },
    {
      name: 'Kerala',
      imageUrl: '/93.jpg',
    },
    // Add more locations as needed
  ];

  return (
    <div className="overflow-hidden w-full mt-10 py-4">
      <div
        ref={scrollRef}
        className="flex gap-6 w-max animate-scroll"
        style={{ whiteSpace: 'nowrap' }}
      >
        {/* Original Items */}
        {locations.map((location, index) => (
          <div
            key={index}
            className="block rounded-xl overflow-hidden cursor-default"
            style={{ flexShrink: 0 }}
          >
            <div className="w-60 h-80 relative">
              <Image
                src={location.imageUrl}
                alt={location.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div className="text-center mt-2 font-semibold">
              {location.name}
            </div>
          </div>
        ))}

        {/* Cloned Items for Seamless Loop */}
        {locations.map((location, index) => (
          <div
            key={`cloned-${index}`}
            className="block rounded-xl overflow-hidden cursor-default"
            style={{ flexShrink: 0 }}
          >
            <div className="w-60 h-80 relative">
              <Image
                src={location.imageUrl}
                alt={location.name}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
            <div className="text-center mt-2 font-semibold">
              {location.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationCardRow;
