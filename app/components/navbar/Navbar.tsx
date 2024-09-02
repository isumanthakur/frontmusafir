import Image from 'next/image';
import Link from 'next/link';
import {
    IconBrandBadoo,
    IconMoodHeart
} from "@tabler/icons-react";

import SearchFilters from './SearchFilters';
import UserNav from './UserNav';
import { getUserId } from '@/app/lib/actions';
import AddPropertyButton from './AddPropertyButton';

const Navbar = async () => {
    const userId = await getUserId();

   

    return (
        <nav className="w-full h-16 pl-0 md:pl-24 pt-2 md:pr-24 pr:0 top-0 left-0 bg-transparent z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div className='flex flex-row gap-7 items-center'>
                        <Link href="/">
                            <h3 className='font-sans left-0 font-bold text-xl '>musafir</h3>
                        </Link>

                       
                    </div>

                    <div className="flex items-center gap-7">
                        
                        <AddPropertyButton 
                            userId={userId}
                        />
                        <Link href="/community" className="text-gray-700 hover:text-gray-900">
                            <IconBrandBadoo className="text-teal-700 h-5 w-5 flex-shrink-0" />
                        </Link>

                        <UserNav 
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
