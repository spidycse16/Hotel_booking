import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, hotel, checkIn, checkOut }) {
    const [nights, setNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        hotel_id: hotel.id,
        check_in_date: checkIn || '',
        check_out_date: checkOut || '',
        guest_name: '',
        guest_email: '',
        guest_phone: '',
    });

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    const calculateNights = (checkInDate, checkOutDate) => {
        if (checkInDate && checkOutDate) {
            const checkInTime = new Date(checkInDate).getTime();
            const checkOutTime = new Date(checkOutDate).getTime();
            const nightsCount = Math.ceil((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24));
            
            if (nightsCount > 0) {
                setNights(nightsCount);
                setTotalPrice(nightsCount * hotel.price);
            } else {
                setNights(0);
                setTotalPrice(0);
            }
        }
    };

    const handleCheckInChange = (e) => {
        const value = e.target.value;
        setData('check_in_date', value);
        calculateNights(value, data.check_out_date);
    };

    const handleCheckOutChange = (e) => {
        const value = e.target.value;
        setData('check_out_date', value);
        calculateNights(data.check_in_date, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    return (
        <Layout user={auth.user}>
            <Head title={`Book ${hotel.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Hotel Summary */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-4">Hotel Details</h2>
                                    
                                    <div className="flex items-start space-x-4">
                                        {hotel.first_image && (
                                            <img
                                                src={hotel.first_image}
                                                alt={hotel.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-semibold">{hotel.name}</h3>
                                            <p className="text-gray-600">{hotel.full_location}</p>
                                            <p className="text-lg font-bold text-indigo-600 mt-2">
                                                ${hotel.price}/night
                                            </p>
                                        </div>
                                    </div>

                                    {nights > 0 && (
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span>Nights:</span>
                                                <span>{nights}</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span>Price per night:</span>
                                                <span>${hotel.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                                                <span>Total:</span>
                                                <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Booking Form */}
                                <div>
                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="check_in_date" value="Check-in Date" />
                                                <TextInput
                                                    id="check_in_date"
                                                    type="date"
                                                    name="check_in_date"
                                                    value={data.check_in_date}
                                                    className="mt-1 block w-full"
                                                    onChange={handleCheckInChange}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    required
                                                />
                                                <InputError message={errors.check_in_date} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="check_out_date" value="Check-out Date" />
                                                <TextInput
                                                    id="check_out_date"
                                                    type="date"
                                                    name="check_out_date"
                                                    value={data.check_out_date}
                                                    className="mt-1 block w-full"
                                                    onChange={handleCheckOutChange}
                                                    min={data.check_in_date || new Date().toISOString().split('T')[0]}
                                                    required
                                                />
                                                <InputError message={errors.check_out_date} className="mt-2" />
                                            </div>
                                        </div>

                                        {!auth.user && (
                                            <>
                                                <div className="border-t pt-6">
                                                    <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
                                                    
                                                    <div className="space-y-4">
                                                        <div>
                                                            <InputLabel htmlFor="guest_name" value="Full Name" />
                                                            <TextInput
                                                                id="guest_name"
                                                                name="guest_name"
                                                                value={data.guest_name}
                                                                className="mt-1 block w-full"
                                                                onChange={(e) => setData('guest_name', e.target.value)}
                                                                required
                                                            />
                                                            <InputError message={errors.guest_name} className="mt-2" />
                                                        </div>

                                                        <div>
                                                            <InputLabel htmlFor="guest_email" value="Email" />
                                                            <TextInput
                                                                id="guest_email"
                                                                type="email"
                                                                name="guest_email"
                                                                value={data.guest_email}
                                                                className="mt-1 block w-full"
                                                                onChange={(e) => setData('guest_email', e.target.value)}
                                                                required
                                                            />
                                                            <InputError message={errors.guest_email} className="mt-2" />
                                                        </div>

                                                        <div>
                                                            <InputLabel htmlFor="guest_phone" value="Phone Number" />
                                                            <TextInput
                                                                id="guest_phone"
                                                                name="guest_phone"
                                                                value={data.guest_phone}
                                                                className="mt-1 block w-full"
                                                                onChange={(e) => setData('guest_phone', e.target.value)}
                                                                required
                                                            />
                                                            <InputError message={errors.guest_phone} className="mt-2" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="flex items-center justify-end">
                                            <PrimaryButton 
                                                className="ms-4" 
                                                disabled={processing || nights <= 0}
                                            >
                                                {processing ? 'Processing...' : `Book Now - $${totalPrice.toFixed(2)}`}
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}