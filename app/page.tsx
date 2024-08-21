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

export default function Home() {
  return (
    <main className="">
    <div className="relative flex flex-col items-center justify-center px-4 md:px-14 ">
    <div className="relative rounded-3xl w-full h-[600px] md:h-[670px] md:max-h-[670px] overflow-hidden">
  <video
    className="w-full h-full object-cover"
    src="/1.mp4"
    autoPlay
    loop
    muted
  ></video>
  <div className="absolute inset-0"></div>
</div>

<div className="absolute bottom-[70%] md:bottom-[50%] flex flex-col gap-3 text-center md:left-36">
    <h1 className="font-bold font-sans text-3xl md:text-6xl">Har Safar Mein</h1>
    <h3 className="font-semibold text-center font-sans md:text-start text-lg md:text-2xl">Khud Se Mulakaat</h3>
    <Link href="/community">
        <button className="hover:bg-transparent hover:text-white self-center md:self-start bg-white text-black w-28 md:w-36 p-1 pl-2 pr-2 border border-white rounded-3xl font-sans font-bold text-xs md:text-sm">
            Become a musafir
        </button>
    </Link>
</div>
  <div className="absolute bottom-[-27%] md:bottom-[-9%] flex justify-center left-0 w-full">
    <SearchFilters />
  </div>
</div>

      <div className="mt-36 md:mt-24 py-14 mb-24">
        <div className="flex flex-row justify-center">
          <PropertyList />
        </div>
      </div>
      
      <div>
        <HeroSection/>
      </div>
      <div className="flex flex-col items-center">
        <div>
        <h1 className="text-center text-4xl p-2 mt-24 font-semibold font-sans mb-4">We Are Expanding</h1>
        <h1 className="text-center text-xl text-neutral-400 font-sans font-light mb-4">Keep calm & travel on</h1>

        </div>
  <LocationCardRow />
  <button className="p-2 pl-4 pr-4 mt-20 flex flex-row border text-xs font-semibold font-sans rounded-2xl">             <IconLoader3 className="text-neutral-400 h-3 w-3 mx-2 flex-shrink-0" />
  Know more</button>
</div>
<div>
  <HeroSections/>
</div>
<div>
  <Footer/>
</div>

      
    </main>
  );
}
