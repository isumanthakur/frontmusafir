// File: /Users/sam/Desktop/job/my-project/musafir/djangobnb/app/Kolkata/page.tsx
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const KolkataPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay showing the content to allow the animation to complete
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Match this with the animation duration in LocationCardRow

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start pt-20">
      <div className="relative w-full h-96">
        <Image
          src="/1.jpg"
          alt="Kolkata"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
      </div>
      {showContent && (
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold">Welcome to Kolkata!</h1>
          <p className="mt-4 text-lg">
            Explore the vibrant culture, delicious food, and historic sites of Kolkata.
          </p>
        </div>
      )}
    </div>
  );
};

export default KolkataPage;
