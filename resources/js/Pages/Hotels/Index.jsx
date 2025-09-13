import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Index({ auth, hotels, filters }) {
    const [searchForm, setSearchForm] = useState({
        search: filters.search || '',
        city: filters.city || '',
        country: filters.country || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('hotels.index'), searchForm, {
            preserveState: true,
            replace: true,
        });
    };

    const handleInputChange = (e) => {
        setSearchForm({
            ...searchForm,
            [e.target.name]: e.target.value,
        });
    };

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout user={auth.user}>
            <Head title="Hotels" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-6">Find Your Perfect Hotel</h1>
                            
                            {/* Search Form */}
                            <form onSubmit={handleSearch} className="mb-8 bg-gray-50 p-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Search
                                        </label>
                                        <input
                                            type="text"
                                            name="search"
                                            value={searchForm.search}
                                            onChange={handleInputChange}
                                            placeholder="Hotel name, city, country..."
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={searchForm.city}
                                            onChange={handleInputChange}
                                            placeholder="City"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={searchForm.country}
                                            onChange={handleInputChange}
                                            placeholder="Country"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Min Price
                                        </label>
                                        <input
                                            type="number"
                                            name="min_price"
                                            value={searchForm.min_price}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Max Price
                                        </label>
                                        <input
                                            type="number"
                                            name="max_price"
                                            value={searchForm.max_price}
                                            onChange={handleInputChange}
                                            placeholder="1000"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Search Hotels
                                    </button>
                                </div>
                            </form>

                            {/* Hotels Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {hotels.data.map((hotel) => {
                                    return (
                                    <div key={hotel.id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="h-48 bg-gray-200">
                                            {typeof hotel.first_image === 'string' && hotel.first_image ? (
                                                <img
                                                    src={hotel.first_image}
                                                    alt={hotel.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{hotel.full_location ?? 'N/A'}</p>
                                            <p className="text-gray-700 text-sm mb-3 line-clamp-2">{hotel.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold text-indigo-600">
                                                    ${hotel.price}
                                                    <span className="text-sm text-gray-500">/night</span>
                                                </span>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route('hotels.show', hotel.id)}
                                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                                    >
                                                        View Details
                                                    </Link>
                                                    <Link
                                                        href={route('bookings.create', { hotel_id: hotel.id })}
                                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                                    >
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                                })}
                            </div>

                            {/* Pagination */}
                            {hotels.links && hotels.links.length > 3 && (
                                <div className="flex justify-center mt-8">
                                    {hotels.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 mx-1 rounded-md ${link.active ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}

                            {hotels.data.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}