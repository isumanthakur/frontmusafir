'use client';

import { format } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
import apiService from '@/app/services/apiService';
import useSearchModal from '@/app/hooks/useSearchModal';

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const { state, city, guests, bathrooms, bedrooms, checkIn, checkOut, category } = searchModal.query;
    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = (id: string, is_favorite: boolean) => {
        setProperties(prevProperties =>
            prevProperties.map((property) =>
                property.id === id ? { ...property, is_favorite } : property
            )
        );
    }

    const getProperties = async () => {
        let url = '/api/properties/';

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`;
        } else if (favorites) {
            url += '?is_favorites=true';
        } else {
            const queryParams = new URLSearchParams();

            if (state) queryParams.append('state', state);
            if (city) queryParams.append('city', city);
            if (guests) queryParams.append('guests', guests.toString());
            if (bedrooms) queryParams.append('bedrooms', bedrooms.toString());
            if (bathrooms) queryParams.append('bathrooms', bathrooms.toString());
            if (category) queryParams.append('category', category);
            if (checkIn) queryParams.append('checkin', format(checkIn, 'yyyy-MM-dd'));
            if (checkOut) queryParams.append('checkout', format(checkOut, 'yyyy-MM-dd'));

            const queryString = queryParams.toString();
            if (queryString) url += `?${queryString}`;
        }

        try {
            const response = await apiService.get(url);
            const tmpProperties = response.data;
            console.log('Properties:', tmpProperties);

            setProperties(tmpProperties.map((property: PropertyType) => ({
                ...property,
                is_favorite: response.favorites.includes(property.id)
            })));
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const firstRowProperties = properties.slice(0, Math.ceil(properties.length / 2));
    const secondRowProperties = properties.slice(Math.ceil(properties.length / 2));

    return (
        <div className="flex flex-col md:gap-4  md:px-36 justify-center  w-full">
            <div 
                ref={scrollContainerRef} 
                className="flex flex-col gap-8 md:gap-16 overflow-x-auto scrollbar-hide">
                
                <div className="flex md:gap-16 w-max">
                    {firstRowProperties.map((property, index) => (
                        <div 
                            key={`${property.id}-${index}`} 
                            className="flex-none w-[calc(80vw-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)]">
                            <PropertyListItem 
                                property={property}
                                markFavorite={(is_favorite: boolean) => markFavorite(property.id, is_favorite)}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-0 md:gap-16 w-max">
                    {secondRowProperties.map((property, index) => (
                        <div 
                            key={`${property.id}-${index}`} 
                            className="flex-none w-[calc(80vw-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)]">
                            <PropertyListItem 
                                property={property}
                                markFavorite={(is_favorite: boolean) => markFavorite(property.id, is_favorite)}
                            />
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default PropertyList;
