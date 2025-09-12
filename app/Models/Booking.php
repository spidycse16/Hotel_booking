<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Booking extends Model
{
    protected $fillable = [
        'booking_reference',
        'hotel_id',
        'user_id',
        'guest_name',
        'guest_email',
        'guest_phone',
        'check_in_date',
        'check_out_date',
        'nights',
        'total_price',
        'status',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'total_price' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            if (empty($booking->booking_reference)) {
                $booking->booking_reference = Str::uuid();
            }
        });
    }

    /**
     * Get the hotel that owns the booking.
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Get the user that owns the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the booking is for a guest (non-registered user).
     */
    public function isGuestBooking(): bool
    {
        return is_null($this->user_id);
    }

    /**
     * Get the customer name (user or guest).
     */
    public function getCustomerNameAttribute(): string
    {
        return $this->isGuestBooking() ? $this->guest_name : $this->user->name;
    }

    /**
     * Get the customer email (user or guest).
     */
    public function getCustomerEmailAttribute(): string
    {
        return $this->isGuestBooking() ? $this->guest_email : $this->user->email;
    }

    /**
     * Scope a query to only include bookings for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include active bookings.
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['pending', 'confirmed']);
    }
}
