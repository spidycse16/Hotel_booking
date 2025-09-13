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
        $this->call(AssignDefaultRoleToUsersSeeder::class);

        // Create a superadmin user
        $superadminRole = \App\Models\Role::where('name', 'superadmin')->first();
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'role_id' => $superadminRole->id,
        ]);

        // Seed hotels
        $this->call(HotelSeeder::class);
    }
}
