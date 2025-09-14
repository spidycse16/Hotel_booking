<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class PaymentService
{
    protected $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(env('STRIPE_SECRET'));
    }

    public function createCheckoutSession(array $data)
    {
        $booking = Booking::findOrFail($data['booking_id']);
        $hotel = Hotel::findOrFail($data['hotel_id']);

        $checkout_session = $this->stripe->checkout->sessions->create([
            'line_items' => [[ 
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $hotel->name . ' - ' . $booking->nights . ' nights',
                    ],
                    'unit_amount' => $booking->total_price * 100, // Amount in cents
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('bookings.show', $booking->booking_reference) . '?success=true',
            'cancel_url' => route('bookings.show', $booking->booking_reference) . '?canceled=true',
            'metadata' => [
                'booking_id' => $booking->id,
                'hotel_id' => $hotel->id,
            ],
        ]);

        return $checkout_session;
    }
}
