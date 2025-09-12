<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotels = [
            [
                'name' => 'Grand Plaza Hotel',
                'description' => 'Luxury hotel in the heart of the city with stunning views and world-class amenities.',
                'city' => 'New York',
                'country' => 'USA',
                'price' => 299.99,
                'images' => [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Ocean View Resort',
                'description' => 'Beautiful beachfront resort with private beach access and spa facilities.',
                'city' => 'Miami',
                'country' => 'USA',
                'price' => 199.99,
                'images' => [
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Mountain Lodge',
                'description' => 'Cozy mountain retreat perfect for nature lovers and adventure seekers.',
                'city' => 'Aspen',
                'country' => 'USA',
                'price' => 149.99,
                'images' => [
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'City Center Hotel',
                'description' => 'Modern business hotel with excellent conference facilities and city access.',
                'city' => 'London',
                'country' => 'UK',
                'price' => 179.99,
                'images' => [
                    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Boutique Inn',
                'description' => 'Charming boutique hotel with personalized service and unique character.',
                'city' => 'Paris',
                'country' => 'France',
                'price' => 229.99,
                'images' => [
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
                ],
                'is_active' => true,
            ],
        ];

        foreach ($hotels as $hotel) {
            \App\Models\Hotel::create($hotel);
        }
    }
}
