'use client';

import Modal from "./Modal";
import { useState } from "react";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar"; 
import CustomButton from "../forms/CustomButton";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import SelectStateCity, { SelectStateCityValue } from "../forms/SelectStateCity"; // Updated import for state and city selection

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [numGuests, setNumGuests] = useState<string>('1');
    const [numBedrooms, setNumBedrooms] = useState<string>('0');
    const [stateCity, setStateCity] = useState<SelectStateCityValue>(); // Updated state for state and city
    const [numBathrooms, setNumBathrooms] = useState<string>('0');
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    //
    //

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            state: stateCity?.state,  // Updated to use state
            city: stateCity?.city,    // Updated to use city
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            category: ''
        }
        console.log('Search Query:', newSearchQuery); // Debugging

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
        
    }

    //
    // Set date range

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    //
    // Contents

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl font-sans font-semibold">Where are we going ?</h2>

            <SelectStateCity
                value={stateCity}  // Updated to use state and city selector
                onChange={(value) => setStateCity(value as SelectStateCityValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check in date"
                    onClick={() => searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl  font-sans font-semibold">When do you want to check in?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label=" Location"
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    label="Check out date"
                    onClick={() => searchModal.open('checkout')}
                />
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl  font-sans font-semibold">When do you want to check out?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check in date"
                    onClick={() => searchModal.open('checkin')}
                />

                <CustomButton
                    label="Details"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl  font-sans font-semibold">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4  font-sans font-semibold">
                    <label>Number of guests:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numGuests} 
                        placeholder="Number of guests..."
                        onChange={(e) => setNumGuests(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4  font-sans font-semibold">
                    <label className=" font-sans font-semibold">Number of bedrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numBedrooms} 
                        placeholder="Number of bedrooms..."
                        onChange={(e) => setNumBedrooms(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4  font-sans font-semibold">
                    <label>Number of bathrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numBathrooms} 
                        placeholder="Number of bathrooms..."
                        onChange={(e) => setNumBathrooms(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check out date"
                    onClick={() => searchModal.open('checkout')}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step == 'details') {
        content = contentDetails;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;
