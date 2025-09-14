<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    /**
     * Display a listing of hotels with search functionality.
     */
    public function index(Request $request)
    {
        $query = Hotel::where('is_active', true);

        // Handle search
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            
            // Use Scout for Elasticsearch search if available
            if (config('scout.driver') === 'elasticsearch') {
                $hotels = Hotel::search($searchTerm)->where('is_active', true);
            } else {
                // Fallback to database search
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'ILIKE', "%{$searchTerm}%")
                      ->orWhere('description', 'ILIKE', "%{$searchTerm}%")
                      ->orWhere('city', 'ILIKE', "%{$searchTerm}%")
                      ->orWhere('country', 'ILIKE', "%{$searchTerm}%");
                });
            }
        }

        // Handle filters
        if ($request->filled('city')) {
            $query->where('city', 'ILIKE', "%{$request->get('city')}%");
        }

        if ($request->filled('country')) {
            $query->where('country', 'ILIKE', "%{$request->get('country')}%");
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        $hotels = isset($hotels) ? $hotels->paginate(12) : $query->paginate(12);

        return Inertia::render('Hotels/Index', [
            'hotels' => $hotels,
            'filters' => $request->only(['search', 'city', 'country', 'min_price', 'max_price']),
            'exchangeRates' => config('currency.exchange_rates'),
        ]);
    }

    /**
     * Display the specified hotel.
     */
    public function show(Hotel $hotel)
    {
        if (!$hotel->is_active) {
            abort(404);
        }

        return Inertia::render('Hotels/Show', [
            'hotel' => $hotel,
            'exchangeRates' => config('currency.exchange_rates'),
        ]);
    }
}