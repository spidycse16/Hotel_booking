import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Show({ auth, hotel }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    const handleBookNow = () => {
        const params = new URLSearchParams({
            hotel_id: hotel.id,
            check_in: checkIn,
            check_out: checkOut,
        });
        
        window.location.href = `/bookings/create?${params.toString()}`;
    };

    return (
        <Layout user={auth.user}>
            <Head title={hotel.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Back Button */}
                            <Link
                                href={route('hotels.index')}
                                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
                            >
                                ← Back to Hotels
                            </Link>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Hotel Images */}
                                <div>
                                    {hotel.images && hotel.images.length > 0 ? (
                                        <div className="space-y-4">
                                            <img
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                            {hotel.images.length > 1 && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {hotel.images.slice(1, 3).map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={`${hotel.name} ${index + 2}`}
                                                            className="w-full h-32 object-cover rounded-lg"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">No Images Available</span>
                                        </div>
                                    )}
                                </div>

                                {/* Hotel Details */}
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                                    <p className="text-lg text-gray-600 mb-4">{hotel.full_location}</p>
                                    
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-indigo-600">
                                            ${hotel.price}
                                        </span>
                                        <span className="text-lg text-gray-500 ml-2">per night</span>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                                        <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
                                    </div>

                                    {/* Booking Form */}
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">Book Your Stay</h3>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Check-in Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Check-out Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleBookNow}
                                            disabled={!checkIn || !checkOut}
                                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}