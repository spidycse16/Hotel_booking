import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, bookings }) {
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Bookings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                            {bookings.data.length > 0 ? (
                                <div className="space-y-4">
                                    {bookings.data.map((booking) => (
                                        <div key={booking.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{booking.hotel.name}</h3>
                                                    <p className="text-gray-600">{booking.hotel.full_location}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Reference: {booking.booking_reference}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <span className="text-sm text-gray-500">Check-in</span>
                                                    <p className="font-medium">
                                                        {new Date(booking.check_in_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Check-out</span>
                                                    <p className="font-medium">
                                                        {new Date(booking.check_out_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Total Price</span>
                                                    <p className="font-bold text-indigo-600">${booking.total_price}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500">
                                                    Booked on {new Date(booking.created_at).toLocaleDateString()}
                                                </p>
                                                <Link
                                                    href={route('bookings.show', booking.booking_reference)}
                                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg mb-4">You haven't made any bookings yet.</p>
                                    <Link
                                        href={route('hotels.index')}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Browse Hotels
                                    </Link>
                                </div>
                            )}

                            {/* Pagination */}
                            {bookings.links && (
                                <div className="mt-8">
                                    {/* Add pagination component here */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}