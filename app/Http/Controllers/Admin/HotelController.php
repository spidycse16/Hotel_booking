<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HotelController extends Controller
{
    protected $middleware = [
        'auth',
        'verified',
        'can:manage-hotels', // Custom middleware to check admin/superadmin role
    ];

    /**
     * Display a listing of hotels for admin.
     */
    public function index(Request $request)
    {
        $query = Hotel::query();

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ILIKE', "%{$search}%")
                  ->orWhere('city', 'ILIKE', "%{$search}%")
                  ->orWhere('country', 'ILIKE', "%{$search}%");
            });
        }

        $hotels = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Hotels/Index', [
            'hotels' => $hotels,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new hotel.
     */
    public function create()
    {
        return Inertia::render('Admin/Hotels/Create');
    }

    /**
     * Store a newly created hotel.
     */
    public function store(StoreHotelRequest $request)
    {
        $data = $request->validated();

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }
        $data['images'] = $imagePaths;

        Hotel::create($data);

        return redirect()->route('admin.hotels.index')
            ->with('success', 'Hotel created successfully.');
    }

    /**
     * Display the specified hotel.
     */
    public function show(Hotel $hotel)
    {
        $hotel->load('bookings.user');
        
        return Inertia::render('Admin/Hotels/Show', [
            'hotel' => $hotel,
        ]);
    }

    /**
     * Show the form for editing the specified hotel.
     */
    public function edit(Hotel $hotel)
    {
        return Inertia::render('Admin/Hotels/Edit', [
            'hotel' => $hotel,
        ]);
    }

    /**
     * Update the specified hotel.
     */
    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $data = $request->validated();

        $imagePaths = $hotel->images ?? [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }
        $data['images'] = $imagePaths;

        $hotel->update($data);

        return redirect()->route('admin.hotels.index')
            ->with('success', 'Hotel updated successfully.');
    }

    /**
     * Remove the specified hotel.
     */
    public function destroy(Hotel $hotel)
    {
        // Check if hotel has active bookings
        $activeBookings = $hotel->bookings()->active()->count();
        
        if ($activeBookings > 0) {
            return back()->with('error', 'Cannot delete hotel with active bookings.');
        }

        $hotel->delete();

        return redirect()->route('admin.hotels.index')
            ->with('success', 'Hotel deleted successfully.');
    }
}
