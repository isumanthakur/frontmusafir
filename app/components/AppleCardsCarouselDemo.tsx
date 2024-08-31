"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-32">
      <h2 className="max-w-7xl pl-4  mx-auto flex justify-center text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        We are expanding.
      </h2>
      <h3 className="font-sans text-neutral-500 mb-24 text-md  md:text-lg font-semibold flex p-4 justify-center">Keep calm & Trvael on</h3>
      <div className="carousel-container">
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/a2.jpg"
              alt="Travel info of Jet"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Mumbai",
    title: "Fell the sea",
    src: "/a1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Goa",
    title: "Sea and chill",
    src: "/a2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Andaman",
    title: "Sccoba-dive ",
    src: "/a3.jpg",
    content: <DummyContent />,
  },
  {
    category: "Chennai",
    title: "Green water",
    src: "/a4.jpg",
    content: <DummyContent />,
  },
  {
    category: "Chennai",
    title: "Sunsets",
    src: "/a5.jpg",
    content: <DummyContent />,
  },
  {
    category: "Tamil Nadu",
    title: "Culture",
    src: "/a6.jpg",
    content: <DummyContent />,
  },
  
];
