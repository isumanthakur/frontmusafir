import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyProps {
    property: PropertyType;
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    markFavorite,
}) => {
    const router = useRouter();

    // Log the original image_url from the property object
    console.log('Original image_url:', property.image_url);

    // Ensure the image URL is correctly formatted
    const imageUrl = property.image_url && typeof property.image_url === 'string'
        ? property.image_url.startsWith('http')
            ? property.image_url
            : `${process.env.NEXT_PUBLIC_API_HOST}${property.image_url}`
        : '/path/to/placeholder-image.jpg'; // Fallback to a placeholder image if `image_url` is invalid

    // Log the final imageUrl being passed to the Image component
    console.log('Final imageUrl:', imageUrl);

    return (
        <div
            className="cursor-pointer"
            onClick={() => router.push(`/properties/${property.id}`)}
        >
            <div className="relative overflow-hidden rounded-xl w-52 h-52">
                <Image
                    fill
                    src={imageUrl}
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

            <div className="mt-2 text-center w-52 "> 
                <p className="text-lg font-sans text-neutral-600 font-semibold">{property.title}</p>
            </div>

            <div className="mt-2 text-center w-52"> 
                <p className="text-sm text-neutral-400"><strong>₹{property.price_per_night}</strong> per person</p>
            </div>
        </div>
    );
};

export default PropertyListItem;
