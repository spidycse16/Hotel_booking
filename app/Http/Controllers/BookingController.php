<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Hotel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\BookingService;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    /**
     * Display user's bookings.
     */
    public function index()
    {
        $bookings = auth()->user()->bookings()
            ->with('hotel')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create(Request $request)
    {
        $hotel = Hotel::findOrFail($request->get('hotel_id'));
        
        if (!$hotel->is_active) {
            abort(404);
        }

        return Inertia::render('Bookings/Create', [
            'hotel' => $hotel,
            'checkIn' => $request->get('check_in'),
            'checkOut' => $request->get('check_out'),
            'totalPrice' => $request->get('total_price'),
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(StoreBookingRequest $request)
    {
        $booking = $this->bookingService->createBooking($request);

        return Inertia::location($booking->checkout_session->url);
    }

    /**
     * Display the specified booking.
     */
    public function show($bookingReference)
    {
        $booking = Booking::where('booking_reference', $bookingReference)
            ->with('hotel')
            ->firstOrFail();

        // Check authorization
        if (auth()->check() && $booking->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Update the specified booking (cancel only).
     */
    public function update(Request $request, Booking $booking)
    {
        // Check authorization
        if (auth()->check() && $booking->user_id !== auth()->id()) {
            abort(403);
        }

        if ($request->action === 'cancel') {
            $booking->update(['status' => 'cancelled']);
            
            return back()->with('success', 'Booking cancelled successfully.');
        }

        abort(400);
    }
}
