<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Truncate tables
        \DB::statement('TRUNCATE TABLE users, roles RESTART IDENTITY CASCADE');

        $this->call(RoleSeeder::class);

        // Create a superadmin user
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'role' => 'superadmin',
        ]);

        // Seed hotels
        $this->call(HotelSeeder::class);
    }
}
