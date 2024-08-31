"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The service was exceptional, and the team went above and beyond to ensure our satisfaction. Highly recommended!",
    name: "Rohit Sharma",
    title: "Happy Customer",
  },
  {
    quote:
      "A fantastic experience from start to finish. The attention to detail and professionalism is unmatched.",
    name: "Priya Kapoor",
    title: "Satisfied Client",
  },
  {
    quote:
      "Their expertise and commitment are truly commendable. We achieved great results together!",
    name: "Arjun Mehta",
    title: "Business Partner",
  },
  {
    quote:
      "I was thoroughly impressed by the quality of service and the friendly approach. Will definitely return!",
    name: "Anita Desai",
    title: "Returning Client",
  },
  {
    quote:
      "Excellent work! The team understood our needs perfectly and delivered outstanding results.",
    name: "Sanjay Gupta",
    title: "Long-term Client",
  },
];
