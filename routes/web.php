<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\HotelController as AdminHotelController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PaymentController;

// Home page - redirect to hotels listing
Route::get('/', function () {
    return redirect()->route('hotels.index');
});

// Public hotel routes
Route::get('/hotels', [HotelController::class, 'index'])->name('hotels.index');
Route::get('/hotels/{hotel}', [HotelController::class, 'show'])->name('hotels.show');

// Booking routes (accessible to both guests and authenticated users)
Route::get('/bookings/create', [BookingController::class, 'create'])->name('bookings.create');
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{bookingReference}', [BookingController::class, 'show'])->name('bookings.show');

// Stripe payment routes
Route::get('/payment/checkout-session', [PaymentController::class, 'createCheckoutSession'])->name('payment.checkout-session');
Route::post('/stripe/webhook', [\App\Http\Controllers\StripeWebhookController::class, 'handle']);
// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // User booking management
    Route::get('/my-bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::patch('/bookings/{booking}', [BookingController::class, 'update'])->name('bookings.update');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'verified', 'can:manage-hotels'])->prefix('admin')->name('admin.')->group(function () {
    // Admin dashboard
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Admin hotel management
    Route::resource('hotels', AdminHotelController::class);
    
    // Admin booking management
    Route::resource('bookings', AdminBookingController::class)->except(['create', 'store', 'destroy']);
});

require __DIR__.'/auth.php';
