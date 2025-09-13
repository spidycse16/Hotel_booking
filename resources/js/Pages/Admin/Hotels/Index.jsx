import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, hotels }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hotels</h2>}
        >
            <Head title="Hotels" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("admin.hotels.create")}
                                >
                                    Create Hotel
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">City</th>
                                        <th className="px-4 py-2">Country</th>
                                        <th className="px-4 py-2">Price</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hotels.data.map(({ id, name, city, country, price }) => (
                                        <tr key={id}>
                                            <td className="border px-4 py-2">{id}</td>
                                            <td className="border px-4 py-2">{name}</td>
                                            <td className="border px-4 py-2">{city}</td>
                                            <td className="border px-4 py-2">{country}</td>
                                            <td className="border px-4 py-2">{price}</td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("admin.hotels.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    href={route("admin.hotels.destroy", id)}
                                                    method="delete"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}