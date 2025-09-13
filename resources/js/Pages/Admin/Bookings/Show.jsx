import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ auth, booking }) {
    const { data, setData, put, processing, errors } = useForm({
        status: booking.status || "",
    });

    function submit(e) {
        e.preventDefault();
        put(route("admin.bookings.update", booking.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Booking Details</h2>}
        >
            <Head title="Booking Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <strong>Hotel:</strong> {booking.hotel.name}
                            </div>
                            <div className="mb-4">
                                <strong>User:</strong> {booking.user.name}
                            </div>
                            <div className="mb-4">
                                <strong>Status:</strong> {booking.status}
                            </div>
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="status">Update Status</label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData("status", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <div className="text-red-500">{errors.status}</div>}
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                        disabled={processing}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}