'use client';

import React, { useState, useEffect } from 'react';
import { Range } from 'react-date-range';
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import DatePicker from '../forms/Calendar';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import { getAccessToken } from '@/app/lib/actions';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

export type Property = {
    id: string;
    guests: number;
    price_per_night: number;
};

interface ReservationSidebarProps {
    userId: string | null;
    property: Property;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId,
}) => {
    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [guests, setGuests] = useState<string>('1');
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const performBooking = async () => {
        console.log('performBooking', userId);
    
        if (userId) {
            try {
                // Load Razorpay SDK
                const isRazorpayLoaded = await loadRazorpayScript();
                if (!isRazorpayLoaded) {
                    console.error('Razorpay SDK failed to load.');
                    return;
                }
    
                // Retrieve the access token
                const accessToken = await getAccessToken();
    
                if (!accessToken) {
                    console.error('Failed to retrieve access token');
                    loginModal.open(); // Prompt user to log in if token is missing or expired
                    return;
                }
    
                // Step 1: Create payment order on the backend
                const paymentResponse = await apiService.post(
                    `/api/payments/create/${property.id}/`,
                    { userId,
                    total_amount: totalPrice,  // Pass the correct total price here

                     },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // Pass the token in the headers
                        },
                    }
                );
    
                const options = {
                    key: paymentResponse.razorpay_key,
                    amount: paymentResponse.amount,
                    currency: paymentResponse.currency,
                    order_id: paymentResponse.razorpay_order_id,
                    handler: async function (response: any) {
                        // Step 2: Handle payment success
                        const paymentSuccessResponse = await apiService.post(
                            '/api/payments/success/',
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`, // Pass the token in the headers
                                },
                            }
                        );
    
                        if (paymentSuccessResponse.status === 'success') {
                            // Step 3: Finalize the booking
                            await finalizeBooking();
                        } else {
                            console.error('Payment failed');
                        }
                    },
                    prefill: {
                        name: 'testuser', // Use logged-in user's name
                        email: 'testuser@gmail.com', // Use logged-in user's email
                        contact: '8240609670', // Use logged-in user's contact
                    },
                    notes: {
                        address: 'Note value',
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };
    
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } catch (error) {
                console.error('Error during payment initialization', error);
            }
        } else {
            loginModal.open(); // Prompt user to log in if not authenticated
        }
    };
    
    const finalizeBooking = async () => {
        if (dateRange.startDate && dateRange.endDate) {
            const formData = new FormData();
            formData.append('guests', guests);
            formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
            formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
            formData.append('number_of_nights', nights.toString());
            formData.append('total_price', totalPrice.toString());

            const accessToken = await getAccessToken();

            const response = await apiService.post(
                `/api/properties/${property.id}/book/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Pass the token in the headers
                    },
                }
            );

            if (response.success) {
                console.log('Booking successful');
            } else {
                console.log('Something went wrong...');
            }
        }
    };

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate,
        });
    };

    const getReservations = async () => {
        const accessToken = await getAccessToken();
        const reservations = await apiService.get(
            `/api/properties/${property.id}/reservations/`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Pass the token in the headers
                },
            }
        );

        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date),
            });

            dates = [...dates, ...range];
        });

        setBookedDates(dates);
    };

    useEffect(() => {
        getReservations();

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

            if (dayCount && property.price_per_night) {
                const _fee = (dayCount * property.price_per_night * 0.05);

                setFee(_fee);
                setTotalPrice(dayCount * property.price_per_night + _fee);
                setNights(dayCount);
            } else {
                const _fee = property.price_per_night * 0.05;

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNights(1);
            }
        }
    }, [dateRange]);

    return (
        <aside className="mt-6 p-6 col-span-2 rounded-3xl border-2 shadow-sm font-sans border-gray-100 ">
            <h2 className="mb-5 text-2xl font-sans">₹{property.price_per_night} per night</h2>

            <DatePicker
            
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mb-6 p-3 border bg-gray-100 rounded-xl">
                <label className="mb-2 block font-bold text-xs">Guests</label>

                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full -ml-1 bg-transparent text-xm">
                    {guestsRange.map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>

            <div onClick={performBooking} className="w-full mb-6 py-2 text-center text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl">
                Book
            </div>

            <div className="mb-4 font-medium text-sm flex justify-between align-center">
                <p>₹{property.price_per_night} * {nights} nights</p>
                <p>₹{property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>Djangobnb fee</p>
                <p>₹{fee}</p>
            </div>

            <hr />

            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total</p>
                <p>₹{totalPrice}</p>
            </div>
        </aside>
    );
};

export default ReservationSidebar;
