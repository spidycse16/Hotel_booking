<?php

namespace App\Services;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Hotel;
use Carbon\Carbon;

class BookingService
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function createBooking(StoreBookingRequest $request): Booking
    {
        $hotel = Hotel::findOrFail($request->hotel_id);
        
        if (!$hotel->is_active) {
            abort(404);
        }

        $checkIn = Carbon::parse($request->check_in_date);
        $checkOut = Carbon::parse($request->check_out_date);
        $nights = $checkIn->diffInDays($checkOut);
        $totalPrice = $nights * $hotel->price;

        $bookingData = [
            'hotel_id' => $hotel->id,
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'nights' => $nights,
            'total_price' => $totalPrice,
            'status' => 'pending', // Default status
        ];

        if (auth()->check()) {
            $bookingData['user_id'] = auth()->id();
        } else {
            $bookingData['guest_name'] = $request->guest_name;
            $bookingData['guest_email'] = $request->guest_email;
            $bookingData['guest_phone'] = $request->guest_phone;
        }

        $booking = Booking::create($bookingData);

        // Assign the checkout_session to the booking object
        $booking->checkout_session = $this->paymentService->createCheckoutSession([
            'booking_id' => $booking->id,
            'hotel_id' => $hotel->id,
        ]);

        return $booking;
    }
}
