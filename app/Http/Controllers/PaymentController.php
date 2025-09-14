<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PaymentService;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function createCheckoutSession(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'booking_id' => 'required|exists:bookings,id',
        ]);

        return $this->paymentService->createCheckoutSession([
            'booking_id' => $request->booking_id,
            'hotel_id' => $request->hotel_id,
        ]);
    }
}
