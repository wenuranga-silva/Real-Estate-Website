<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Land>
 */
class LandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'location' => null,
            'area' => fake()->randomFloat(2 ,3000 ,8000),
            'price' => fake()->randomFloat(2 ,1000 ,10000),
            'land_type' => fake()->randomElement(['residential', 'commercial', 'agricultural', 'industrial']),
            'city_id' => fake()->numberBetween(250 ,332),
            'owner_id' => 3,
        ];
    }
}
