'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import {
    IconHomeDown,
    IconMoodHeart
} from "@tabler/icons-react";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();

    const airbnbYourHome = () => {
        if (userId) {
            addPropertyModal.open()
        } else {
            loginModal.open();
        }
    }

    return (
        <button 
        onClick={airbnbYourHome}
        className="p-2 pl-3 pr-3 text-xs border-0 md:border cursor-pointer font-semibold rounded-full hover:bg-emerald-500"
    >
        <span className="block md:hidden">                            <IconHomeDown className="text-teal-700 h-5 w-5 flex-shrink-0" />
        </span>  {/* This will only show on small screens */}
        <span className="hidden md:block">List your property</span>  {/* This will only show on medium screens and up */}
    </button>
    
    )
}

export default AddPropertyButton;