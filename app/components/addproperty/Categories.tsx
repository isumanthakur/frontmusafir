import Image from 'next/image';
import {
    IconLocation,
    IconCalendarDown,
    IconCalendarUp,
    IconUser
  } from "@tabler/icons-react";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                <div 
                    onClick={() => setCategory('beach')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Beach' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                              <IconUser className="text-black h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />


                    <span className='text-xs'>1 seat</span>
                </div>

                <div 
                    onClick={() => setCategory('villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Villas' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                              <IconUser className="text-black h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />


                    <span className='text-xs'>2 seats</span>
                </div>

                <div 
                    onClick={() => setCategory('cabins')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Cabins' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                             <IconUser className="text-black h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />


                    <span className='text-xs'>3 seats</span>
                </div>

                <div 
                    onClick={() => setCategory('tiny_homes')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Tiny homes' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                              <IconUser className="text-black h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />


                    <span className='text-xs'>Quad seats</span>
                </div>
            </div>
        </>
    )
}

export default Categories;