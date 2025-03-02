<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'property_id' => fake()->numberBetween(650 ,715),
            'land_id' => null,
            'discount_value' => fake()->randomFloat(2 ,100 ,300),
            'start_date' => '2024-12-08',
            'end_date' => '2025-04-04',
            'visibility' => 'show'
        ];
    }
}
