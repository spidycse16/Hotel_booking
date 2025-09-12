import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, booking }) {
    const { patch, processing } = useForm();

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

                                    {/* Actions */}
                                    {booking.status !== 'cancelled' && (
                                        <div className="pt-4 border-t">
                                            <PrimaryButton
                                                onClick={handleCancel}
                                                disabled={processing}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                {processing ? 'Cancelling...' : 'Cancel Booking'}
                                            </PrimaryButton>
                                        </div>
                                    )}
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