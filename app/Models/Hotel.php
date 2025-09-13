<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Hotel extends Model
{
    use Searchable;

    protected $fillable = [
        'name',
        'description',
        'city',
        'country',
        'price',
        'images',
        'is_active',
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    protected $appends = ['full_location', 'first_image'];

    /**
     * Get the bookings for the hotel.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the indexable data array for the model.
     */
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'city' => $this->city,
            'country' => $this->country,
            'location' => [
                'city' => $this->city,
                'country' => $this->country,
            ],
            'price' => $this->price,
            'is_active' => $this->is_active,
        ];
    }

    /**
     * Determine if the model should be searchable.
     */
    public function shouldBeSearchable(): bool
    {
        return (bool) $this->is_active;
    }

    /**
     * Get the full location string.
     */
    public function getFullLocationAttribute(): string
    {
        return "{$this->city}, {$this->country}";
    }

    /**
     * Get the first image URL.
     */
    public function getFirstImageAttribute(): ?string
    {
        return $this->images[0] ?? null;
    }
}
