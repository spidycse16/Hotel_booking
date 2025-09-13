import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900">Admin Options</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href={route('admin.hotels.index')} className="text-blue-600 hover:text-blue-900">Manage Hotels</a>
                                </li>
                                <li>
                                    <a href={route('admin.bookings.index')} className="text-blue-600 hover:text-blue-900">Manage Bookings</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
