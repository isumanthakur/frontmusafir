"use client"; // This directive tells Next.js that this is a Client Component

import React from "react";

const BackButton: React.FC = () => {
    const handleBackClick = () => {
        history.back();
    };

    return (
        <button 
            onClick={handleBackClick} 
            className="font-sans border p-1 px-3 rounded-2xl text-xs font-semibold"
        >
            Go back
        </button>
    );
};

export default BackButton;
