<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Illuminate\Support\Facades\Auth;
use App\Models\Booking;
use App\Models\Hotel;

class PaymentController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'booking_id' => 'required|exists:bookings,id',
        ]);

        $hotel = Hotel::findOrFail($request->hotel_id);
        $booking = Booking::findOrFail($request->booking_id);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = StripeSession::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $hotel->name,
                    ],
                    'unit_amount' => (int)($booking->total_price * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('bookings.show', ['bookingReference' => $booking->booking_reference, 'success' => true]),
            'cancel_url' => route('bookings.show', $booking->booking_reference),
            'metadata' => [
                'booking_id' => $booking->id,
            ],
        ]);

        return $session;
    }
}
