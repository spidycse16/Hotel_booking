import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Hotel Management */}
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4 text-indigo-800">Hotel Management</h2>
                                    <p className="text-gray-600 mb-4">
                                        Manage all hotels in the system. Add new hotels, edit existing ones, or remove inactive properties.
                                    </p>
                                    <div className="space-y-2">
                                        <Link
                                            href={route('admin.hotels.index')}
                                            className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center"
                                        >
                                            View All Hotels
                                        </Link>
                                        <Link
                                            href={route('admin.hotels.create')}
                                            className="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center"
                                        >
                                            Add New Hotel
                                        </Link>
                                    </div>
                                </div>

                                {/* Booking Management */}
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4 text-green-800">Booking Management</h2>
                                    <p className="text-gray-600 mb-4">
                                        Monitor and manage all bookings. View booking details, update statuses, and handle customer requests.
                                    </p>
                                    <div className="space-y-2">
                                        <Link
                                            href={route('admin.bookings.index')}
                                            className="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center"
                                        >
                                            View All Bookings
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-8">
                                <h2 className="text-lg font-semibold mb-4">Quick Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600">-</div>
                                        <div className="text-sm text-blue-800">Total Hotels</div>
                                    </div>
                                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-yellow-600">-</div>
                                        <div className="text-sm text-yellow-800">Pending Bookings</div>
                                    </div>
                                    <div className="bg-green-100 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-600">-</div>
                                        <div className="text-sm text-green-800">Confirmed Bookings</div>
                                    </div>
                                    <div className="bg-purple-100 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600">-</div>
                                        <div className="text-sm text-purple-800">Total Revenue</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}