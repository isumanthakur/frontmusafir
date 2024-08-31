import React, { useState } from 'react';

export type SelectStateCityValue = {
    state: string;
    city: string;
};

interface SelectStateCityProps {
    value?: SelectStateCityValue;
    onChange: (value: SelectStateCityValue) => void;
}

const statesAndCities: Record<string, string[]> = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Ratnagiri', 'Alibaug'],
    Karnataka: ['Mangaluru', 'Karwar', 'Udupi'],
    TamilNadu: ['Chennai', 'Kanyakumari', 'Rameswaram'],
    Goa: ['Panaji', 'Vasco da Gama', 'Margao'],
    Kerala: ['Kochi', 'Kozhikode', 'Alappuzha'],
    AndhraPradesh: ['Visakhapatnam', 'Vijayawada', 'Kakinada'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Dwarka', 'Porbandar'],
    Odisha: ['Puri', 'Paradip', 'Gopalpur'],
    WestBengal: ['Kolkata', 'Digha', 'Haldia'],
};

const SelectStateCity: React.FC<SelectStateCityProps> = ({ value, onChange }) => {
    const [selectedState, setSelectedState] = useState<string>(value?.state || '');
    const [selectedCity, setSelectedCity] = useState<string>(value?.city || '');

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity(''); // Reset city when state changes
        onChange({ state, city: '' });
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        setSelectedCity(city);
        onChange({ state: selectedState, city });
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label htmlFor="state" className="block font-sans text-neutral-800 font-semibold mb-2">State:</label>
                <select 
                    id="state" 
                    value={selectedState} 
                    onChange={handleStateChange} 
                    className="w-full p-3 bg-white border-opacity-20 text-black rounded-md shadow-sm backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                    <option value="" disabled>Select a state</option>
                    {Object.keys(statesAndCities).map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            {selectedState && (
                <div>
                    <label htmlFor="city" className="block font-sans text-neutral-800  font-semibold mb-2">City:</label>
                    <select 
                        id="city" 
                        value={selectedCity} 
                        onChange={handleCityChange} 
                        className="w-full p-3 bg-white border-opacity-20 text-black rounded-md shadow-sm backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        disabled={!selectedState}
                    >
                        <option value="" disabled>Select a city</option>
                        {statesAndCities[selectedState].map((city: string) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default SelectStateCity;
