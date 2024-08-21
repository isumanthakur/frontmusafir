'use client';

import {
  IconLocation,
  IconCalendarDown,
  IconCalendarUp,
  IconUser
} from "@tabler/icons-react";
import useSearchModal from "@/app/hooks/useSearchModal";

const SearchFilters = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={() => searchModal.open('location')}
      className="h-auto md:p-2 p-5 md:h-40  flex flex-row flex-wrap gap-2 md:gap-24 w-10/12  justify-center items-center bg-gradient-to-tr from-white via-white/100 to-transparent shadow-lg rounded-3xl "
    >
      <div className="flex flex-row flex-wrap gap-1 text-xs font-sans md:text-base md:gap-10">
        <div className="flex flex-row hover:shadow-2xl rounded-3xl gap-2 md:gap-4 p-2 md:p-5">
          <IconLocation className="text-neutral-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          <div>
            <p className="text-sm md:text-lg font-bold text-neutral-700 font-sans">Location</p>
            <p className="text-xs md:text-sm font-normal text-neutral-400">Where are you going?</p>
          </div>
        </div>

        <div className="flex flex-row hover:shadow-2xl rounded-3xl gap-2 md:gap-4 p-2 md:p-5">
          <IconCalendarDown className="text-neutral-400 h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
          <div>
            <p className="text-sm md:text-lg font-sans text-neutral-700 font-bold">Check in</p>
            <p className="text-xs md:text-sm font-normal text-neutral-400">Add date</p>
          </div>
        </div>

        <div className="flex flex-row hover:shadow-2xl rounded-3xl gap-2 md:gap-4 p-2 md:p-5">
          <IconCalendarUp className="text-neutral-400 h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
          <div>
            <p className="text-sm md:text-lg font-sans text-neutral-700 font-bold">Check out</p>
            <p className="text-xs md:text-sm font-normal text-neutral-400">Add date</p>
          </div>
        </div>

        <div className="flex hover:shadow-2xl rounded-3xl ml-10 md:ml-0 flex-row p-2 md:p-5 gap-2 md:gap-4">
          <IconUser className="text-neutral-400 h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
          <div>
            <p className="text-sm md:text-lg text-neutral-700 font-sans font-bold">Travellers</p>
            <p className="text-xs md:text-sm font-normal text-neutral-400">Add guests</p>
          </div>
        </div>
      </div>

      <div className="p-2 mt-4 md:mt-0">
        <div className="cursor-pointer p-3 px-8 md:px-10 md:p-4 bg-emerald-500 hover:bg-teal-700 transition rounded-full text-white">
          <svg
            viewBox="0 0 32 32"
            style={{ display: 'block', fill: 'none', height: '14px', width: '14px', stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3l9 9"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
