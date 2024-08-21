'use client';

import { format } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListItems from "./PropertyListItems";
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

const PropertyListss: React.FC<PropertyListProps> = ({
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

    return (
        <div className="flex w-full flex-col">
            <div 
                ref={scrollContainerRef} 
                className="flex md:gap-20 gap-2 overflow-x-auto scrollbar-hide">
                {properties.map((property, index) => (
                    <div 
                        key={`${property.id}-${index}`} 
                        className="flex-none w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)]">
                        <PropertyListItems 
                            property={property}
                            markFavorite={(is_favorite: boolean) => markFavorite(property.id, is_favorite)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PropertyListss;
