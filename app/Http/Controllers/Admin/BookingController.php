<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    protected $middleware = [
        'auth',
        'verified',
        'can:manage-hotels', // Custom middleware to check admin/superadmin role
    ];

    /**
     * Display a listing of all bookings for admin.
     */
    public function index(Request $request)
    {
        $query = Booking::with(['hotel', 'user']);

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('booking_reference', 'ILIKE', "%{$search}%")
                  ->orWhere('guest_name', 'ILIKE', "%{$search}%")
                  ->orWhere('guest_email', 'ILIKE', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'ILIKE', "%{$search}%")
                               ->orWhere('email', 'ILIKE', "%{$search}%");
                  })
                  ->orWhereHas('hotel', function ($hotelQuery) use ($search) {
                      $hotelQuery->where('name', 'ILIKE', "%{$search}%");
                  });
            });
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Display the specified booking.
     */
    public function show(Booking $booking)
    {
        $booking->load(['hotel', 'user']);
        
        return Inertia::render('Admin/Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Update the specified booking status.
     */
    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $booking->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Booking status updated successfully.');
    }
}
