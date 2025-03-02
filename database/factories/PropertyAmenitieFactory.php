<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyAmenitie>
 */
class PropertyAmenitieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_id' => fake()->numberBetween(3000 ,3100),
            'amenitie' => fake()->numberBetween(1 ,7),
        ];
    }
}
