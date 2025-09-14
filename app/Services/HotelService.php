<?php

namespace App\Services;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelService
{
    public function getHotels(array $filters)
    {
        $query = Hotel::where('is_active', true);

        // Handle search
        if (isset($filters['search']) && !empty($filters['search'])) {
            $searchTerm = $filters['search'];
            
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
        if (isset($filters['city']) && !empty($filters['city'])) {
            $query->where('city', 'ILIKE', "%{$filters['city']}% ");
        }

        if (isset($filters['country']) && !empty($filters['country'])) {
            $query->where('country', 'ILIKE', "%{$filters['country']}% ");
        }

        if (isset($filters['min_price']) && !empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price']) && !empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        $hotels = isset($hotels) ? $hotels->paginate(12) : $query->paginate(12);

        return $hotels;
    }

    public function getHotelById(int $id): Hotel
    {
        $hotel = Hotel::findOrFail($id);

        if (!$hotel->is_active) {
            abort(404);
        }

        return $hotel;
    }
}
