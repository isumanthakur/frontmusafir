'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import apiService from '@/app/services/apiService';
import { getUserId, getAccessToken } from '@/app/lib/actions';
import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import {
    IconHotelService,
    IconUserCheck,
    IconBath,
    IconCarambola,
} from "@tabler/icons-react";

type Review = {
    id: string;
    user: { id: string; name: string; avatar_url: string };
    star_rating: number;
    comment: string;
};

type ReviewSectionProps = {
    reviews: Review[];
    starRating: number;
    setStarRating: (rating: number) => void;
    comment: string;
    setComment: (comment: string) => void;
    handleSubmitReview: () => void;
    submitError: string | null;
};

const ReviewSection: React.FC<ReviewSectionProps> = ({
    reviews,
    starRating,
    setStarRating,
    comment,
    setComment,
    handleSubmitReview,
    submitError,
}) => {
    const [hoverRating, setHoverRating] = useState<number>(0);

    const handleRating = (rating: number) => {
        setStarRating(rating);
    };

    return (
        <div className="mt-8">
            <h2 className="mb-6 text-2xl md:text-3xl font-bold">Reviews</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="p-6 border border-gray-200 font-sans font-medium text-sm rounded-3xl shadow-sm flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-4">Add Your Review</h3>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Star Rating:</label>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <IconCarambola
                                    key={star}
                                    className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
                                        star <= (hoverRating || starRating)
                                            ? 'text-emerald-500'
                                            : 'text-gray-400'
                                    }`}
                                    onClick={() => handleRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border rounded-3xl p-2 focus:ring-2 focus:ring-emerald-600"
                            rows={4}
                            placeholder="Write your review here..."
                        />
                    </div>
                    {submitError && (
                        <p className="text-emerald-500">{submitError}</p>
                    )}
                    <button
                        onClick={handleSubmitReview}
                        className="w-full bg-emerald-500 text-white py-2 rounded-3xl shadow-md hover:bg-red-700 transition duration-300"
                    >
                        Submit Review
                    </button>
                </div>
                <div className="mt-8 md:mt-0 flex-1 w-full">
                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-4 border border-gray-200 rounded-3xl shadow-sm"
                                >
                                    <div className="flex items-center mb-3">
                                        {review.user.avatar_url && (
                                            <Image
                                                src={review.user.avatar_url}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                                alt={review.user.name}
                                            />
                                        )}
                                        <div className="ml-4">
                                            <p className="font-semibold text-lg">{review.user.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Rating: <span className="text-emerald-500">{review.star_rating} / 5</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No reviews yet. Be the first to review this property!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

type Params = { id: string };

type Property = {
    id: string;
    title: string;
    description: string;
    image_url: string;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    price_per_night: number;
    landlord: { id: string; name: string; avatar_url: string };
};

const PropertyDetailPage = ({ params }: { params: Params }) => {
    const [property, setProperty] = useState<Property | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [starRating, setStarRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const fetchProperty = async () => {
        try {
            const accessToken = await getAccessToken();
            const propertyData: Property = await apiService.get(
                `/api/properties/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setProperty(propertyData);
        } catch (error) {
            console.error('Failed to fetch property:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const accessToken = await getAccessToken();
            const fetchedReviews: Review[] = await apiService.get(
                `/api/properties/${params.id}/${params.id}/reviews/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setReviews(fetchedReviews);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    useEffect(() => {
        fetchProperty();
        fetchReviews();
        (async () => {
            const userIdData = await getUserId();
            setUserId(userIdData);
        })();
    }, []);

    const handleSubmitReview = async () => {
        if (starRating === 0 || comment.trim() === "") {
            setSubmitError("Please provide a star rating and a comment.");
            return;
        }

        if (!userId) {
            setSubmitError("User ID not found. Please log in again.");
            return;
        }

        try {
            const accessToken = await getAccessToken();

            await apiService.post(
                `/api/properties/${params.id}/${params.id}/reviews/add/`,
                {
                    star_rating: starRating,
                    comment: comment,
                    user: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            fetchReviews();
            setStarRating(0);
            setComment("");
        } catch (error) {
            console.error('Failed to submit review:', error);
            setSubmitError("Failed to submit review. Please try again later.");
        }
    };

    if (!property) {
        return <p>Loading...</p>;
    }

    return (
        <main className=" mx-auto px-4 md:px-28 py-10">
            <div className="w-full h-[40vh] md:h-[64vh] mb-4 overflow-hidden rounded-3xl relative">
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="Property image"
                />
            </div>
            <div className="md:flex md:flex-row">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="py-6 pr-0 md:pr-6 col-span-3">
                        <h1 className="mb-4 font-sans font-semibold text-2xl md:text-3xl">{property.title}</h1>

                        <span className="mb-6 flex gap-3 flex-row font-sans text-sm font-semibold text-gray-600">
                            {property.guests}<IconUserCheck className=" h-6 w-6 flex-shrink-0" />   
                            {property.bedrooms} <IconHotelService className=" h-6 w-6 flex-shrink-0" />   
                            {property.bathrooms} <IconBath className=" h-6 w-6 flex-shrink-0" />  
                        </span>

                        <hr />

                        <Link 
                            href={`/landlords/${property.landlord.id}`}
                            className="py-6 flex items-center space-x-4"
                        >
                            {property.landlord.avatar_url && (
                                <Image
                                    src={property.landlord.avatar_url}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    alt={property.landlord.name}
                                />
                            )}

                            <p className='border p-1 px-3 rounded-2xl text-emerald-500 border-emerald-500 text-sm md:text-base'><strong>{property.landlord.name}</strong> chat with owner</p>
                        </Link>

                        <p className="mt-6 font-sans text-sm md:w-[700px] md:h-[500px] font-light mb-10 text-gray-500">
                            {property.description}
                        </p>

                        <hr />
                    </div>
                </div>
                <div className="mt-8 md:mt-0">
                    <ReservationSidebar 
                        property={property}
                        userId={userId}
                    />
                </div>
            </div>
            <ReviewSection
                reviews={reviews}
                starRating={starRating}
                setStarRating={setStarRating}
                comment={comment}
                setComment={setComment}
                handleSubmitReview={handleSubmitReview}
                submitError={submitError}
            />
        </main>
    );
}

export default PropertyDetailPage;
