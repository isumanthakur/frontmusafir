import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyProps {
    property: PropertyType;
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItems: React.FC<PropertyProps> = ({
    property,
    markFavorite,
}) => {
    const router = useRouter();

    return (
        <div
            className="cursor-pointer"
            onClick={() => router.push(`/properties/${property.id}`)}
        >
            <div className="relative overflow-hidden rounded-xl md:w-72 w-60 h-60 md:h-72">
                <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-105 opacity-90 object-cover transition h-full w-full"
                    alt="Property image"
                />

                {markFavorite && (
                    <FavoriteButton
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={(is_favorite) => markFavorite(is_favorite)}
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-sans text-neutral-600 font-semibold">{property.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-neutral-400"><strong>₹{property.price_per_night}</strong> per night</p>
            </div>
        </div>
    );
};

export default PropertyListItems;
