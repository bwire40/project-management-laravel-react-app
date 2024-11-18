<?php

namespace Database\Seeders;

use App\Models\Project;
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
        // User::factory(10)->create();


        // create user
        User::factory()->create([
            'name' => 'Bwire Emmanuel',
            'email' => 'bwiremanuel@gmail.com',
            'password' => bcrypt("123.321"), //encrypt password as you save to database
            'email_verified_at' => time()
        ]);


        // use project factory to create fake data
        Project::factory()
            ->count(30)
            ->hasTasks(30)
            ->create();
    }
}
