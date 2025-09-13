import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, booking }) {
    const { patch, processing } = useForm();

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            setShowSuccess(true);
        }
    }, []);

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            patch(route('bookings.update', booking.id), {
                action: 'cancel'
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <Layout user={auth.user}>
            <Head title={`Booking ${booking.booking_reference}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {showSuccess && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-md relative">
                            <div className="flex">
                                <div className="py-1">
                                    <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold">Booking Confirmed!</p>
                                    <p className="text-sm">Your payment was successful and your booking is confirmed.</p>
                                </div>
                            </div>
                            <button onClick={() => setShowSuccess(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.818l-2.651 3.031a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">Booking Confirmation</h1>
                                    <p className="text-gray-600">Reference: {booking.booking_reference}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Hotel Information */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">Hotel Details</h2>
                                    
                                    <div className="flex items-start space-x-4">
                                        {booking.hotel.first_image && (
                                            <img
                                                src={booking.hotel.first_image}
                                                alt={booking.hotel.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-lg">{booking.hotel.name}</h3>
                                            <p className="text-gray-600">{booking.hotel.full_location}</p>
                                            <Link
                                                href={route('hotels.show', booking.hotel.id)}
                                                className="text-indigo-600 hover:text-indigo-800 text-sm"
                                            >
                                                View Hotel Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
                                        
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Check-in:</span>
                                                <span className="font-medium">
                                                    {new Date(booking.check_in_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Check-out:</span>
                                                <span className="font-medium">
                                                    {new Date(booking.check_out_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Nights:</span>
                                                <span className="font-medium">{booking.nights}</span>
                                            </div>
                                            <div className="flex justify-between border-t pt-3">
                                                <span className="text-gray-600">Total Price:</span>
                                                <span className="font-bold text-lg text-indigo-600">
                                                    ${booking.total_price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guest Information */}
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4">Guest Information</h2>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Name:</span>
                                                <span className="font-medium">{booking.customer_name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="font-medium">{booking.customer_email}</span>
                                            </div>
                                            {booking.guest_phone && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Phone:</span>
                                                    <span className="font-medium">{booking.guest_phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <p className="text-sm text-gray-500">
                                    Booking created on {new Date(booking.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}