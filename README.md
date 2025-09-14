# Vervtrip Hotel Booking Platform

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
A modern and intuitive hotel booking platform built with Laravel (PHP) for the backend and React (JavaScript) with Inertia.js for the frontend. This platform allows users to search for hotels, view details, and make bookings. It also includes an admin panel for managing hotels and bookings.

## Features

### User Features
- **Hotel Listing & Search:** Browse available hotels with search and filtering options (by name, city, country, price range).
- **Hotel Details:** View comprehensive information about each hotel, including description, location, and images.
- **Multi-Currency System:**
    - Hotels have a base price in USD.
    - Users can switch and see converted prices in EUR and GBP on hotel listing and detail pages.
    - Selected currency preference is persisted in local storage.
- **Booking Management:**
    - Book hotels for specified check-in and check-out dates.
    - View a list of all personal bookings.
    - View detailed information for each booking.
- **User Authentication & Authorization:**
    - User registration and login.
    - Password reset functionality.
    - Profile management (update personal information, change password, delete account).

### Admin Features
- **Admin Dashboard:** Overview of the platform's key metrics.
- **Hotel Management:** Create, view, edit, and delete hotel listings.
- **Booking Management:** View and manage all bookings made on the platform. Change status of the bookings.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- PHP (>= 8.2)
- Composer
- Node.js (>= 18)
- npm or Yarn
- A database (PostgreSQL recommended, but MySQL/SQLite also supported by Laravel)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:spidycse16/Hotel_booking.git
    cd hotel-booking-platform
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Install JavaScript dependencies:**
    ```bash
    npm install # or yarn install
    ```

4.  **Create a `.env` file:**
    Copy the example environment file and generate an application key:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    Provide proper stripe credentials

5.  **Configure your `.env` file:**
    Open the `.env` file and update the database connection details (`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
    Also, set your application name:
    ```
    APP_NAME="Vervtrip"
    ```

### Database Setup

1.  **Run migrations:**
    ```bash
    php artisan migrate:fresh --seed
    ```
    This would migrate all the tables and seed hotels,admin related data.
2.  **Seed the database (optional, but recommended for initial data):**
If you want to to seed manulaly
    ```bash
    php artisan db:seed
    ```
    This will create default roles, a superadmin user (email: `superadmin@example.com`, password: `password`), and some sample hotels. Use this for default admin.

### Running the Application

1.  **Start the Laravel development server:**
    ```bash
    php artisan serve
    ```

2.  **Start the Vite development server (for frontend assets):**
    ```bash
    npm run dev # or yarn dev
    ```

    Your application should now be accessible at `http://127.0.0.1:8000` (or the address shown by `php artisan serve`).

## Usage

-   **Browse Hotels:** Navigate to `/hotels` to see the list of available hotels.
-   **Login/Register:** Use the login/register links to create an account or sign in.
-   **Admin Panel:** Access the admin panel at `/admin` after logging in as a superadmin (`superadmin@example.com`, password: `password`).

## Architecture & Design Patterns

This project aims to follow SOLID principles and incorporates several design patterns to ensure a clean, maintainable, and scalable codebase:

-   **Service Classes:** Business logic is encapsulated within dedicated Service classes (e.g., `BookingService`, `PaymentService`, `HotelService`). Controllers delegate complex operations to these services, adhering to the Single Responsibility Principle (SRP) and improving testability.
-   **Data Transfer Objects (DTOs):** Laravel's Form Requests are utilized as DTOs for incoming request validation and data transfer, ensuring data integrity and clear communication between layers.
-   **Dependency Injection (DI):** Services are injected into controllers and other services via constructor injection, promoting the Dependency Inversion Principle (DIP) and making components loosely coupled and easier to test.

## Future Improvements
As the time was very short and I had to build it alongside my officetime, I could build it in better way.
-   **Full Repository Pattern Implementation:** Complete the Repository Pattern for all major entities (e.g., `BookingRepository`, `UserRepository`).
-   **More Robust Currency Exchange:** Integrate with a real-time currency exchange API instead of hardcoded rates.
-   **Advanced Search & Filtering:** Implement more sophisticated search capabilities (e.g., by amenities, star rating).
-   **Payment Gateway Integration:** Expand payment options beyond Stripe. I have experience with sslcommerz i could do it if i got time.
-   **Notifications:** Implement email or in-app notifications for booking confirmations, cancellations, etc. I also had experience with PUSHER for websocket connections.