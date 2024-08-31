import Categories from "./components/Categories";
import Link from 'next/link';

import HeroSections from "./components/Featured2";
import HeroSection from "./components/Featured";
import SearchFilters from "./components/navbar/SearchFilters";
import LocationCardRow from "./components/Places";
import PropertyList from "./components/properties/PropertyList";
import {
  IconLocation,
  IconCalendarDown,
  IconCalendarUp,
  IconUser,
  IconLoader3
} from "@tabler/icons-react";
import Footer from "./components/Footer";
import { InfiniteMovingCardsDemo } from "./components/InfiniteMovingCardsDemo";
import { AppleCardsCarouselDemo } from "./components/AppleCardsCarouselDemo";
import { TabsDemo } from "./components/TabsDemo";
import { TimelineDemo } from "./components/TimelineDemo";

export default function Home() {
  return (
    <main className="">
      <div className="relative flex flex-col items-center justify-center px-4 md:px-14 ">
        <div className="relative rounded-3xl w-full h-[600px] md:h-[670px] md:max-h-[670px] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="/6.mp4"
            autoPlay
            loop
            muted
          ></video>
          <div className="absolute inset-0"></div>
        </div>

        <div className="absolute hidden md:block bottom-[70%] md:bottom-[50%] flex-col gap-3 text-center md:left-36">
          <h1 className="font-bold font-sans text-3xl text-white md:text-6xl">Har Safar Mein</h1>
          <h3 className="font-semibold text-center font-sans text-white md:text-start text-lg md:text-2xl">Khud Se Mulakaat</h3>
          <Link href="/community">
            <div className="flex justify-start"> {/* Ensures left alignment */}
              <button className="hover:bg-white hover:text-black w-28 md:w-36 p-1 pl-2 pr-2 border border-white rounded-3xl font-sans font-bold text-xs md:text-sm bg-transparent text-white">
                Become a musafir
              </button>
            </div>
          </Link>
        </div>

        <div className="absolute bottom-[-27%] md:bottom-[-9%] flex justify-center left-0 w-full">
          <SearchFilters />
        </div>
      </div>

      <div className="mt-36 md:mt-28 py-20 mb-24 w-full">
        <div className="flex p-10 md:p-0 flex-row justify-center w-full">
          <PropertyList />
        </div>
      </div>

      <div>
        <HeroSection/>
      </div>
      <div className="flex flex-col items-center">
        <AppleCardsCarouselDemo/>
        
      </div>
      <div>
        <TimelineDemo/>
      </div>
      <div>
        <HeroSections/>
      </div>
      <div>
        <h1 className="text-3xl font-sans font-semibold flex justify-center p-24">What aur clients had to say</h1>
        <InfiniteMovingCardsDemo/>
      </div>
     

      <div>
        <Footer/>
      </div>
    </main>
  );
}
