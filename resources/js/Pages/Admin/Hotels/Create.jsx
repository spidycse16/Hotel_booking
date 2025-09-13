import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        city: "",
        country: "",
        price: "",
        images: [],
    });

    function submit(e) {
        e.preventDefault();
        post(route("admin.hotels.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Hotel</h2>}
        >
            <Head title="Create Hotel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    {errors.description && <div className="text-red-500">{errors.description}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city">City</label>
                                    <input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    {errors.city && <div className="text-red-500">{errors.city}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        id="country"
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData("country", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    {errors.country && <div className="text-red-500">{errors.country}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        id="price"
                                        type="text"
                                        value={data.price}
                                        onChange={(e) => setData("price", e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    {errors.price && <div className="text-red-500">{errors.price}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="images">Images</label>
                                    <input
                                        id="images"
                                        type="file"
                                        multiple
                                        onChange={(e) => setData("images", e.target.files)}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    {errors.images && <div className="text-red-500">{errors.images}</div>}
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                        disabled={processing}
                                    >
                                        Create
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