<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['sale', 'rent'];

        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'type' => fake()->randomElement(['home', 'apartment' ,'commercial' ,'bungalows' ,'villas']),
            'status' => $status[0],
            'price' => fake()->randomFloat(2 ,10000 ,250000),
            'location' => null,
            'address' => fake()->address(),
            'city' => fake()->numberBetween(247 ,332),
            'bedrooms' => fake()->numberBetween(3 ,6),
            'bathrooms' => fake()->numberBetween(1 ,4),
            'area_sqft' => fake()->randomFloat(2 ,2200 ,4000),
            'land_sqft' => fake()->randomFloat(2 ,2200 ,4000),
            'numberOfFloors' => fake()->numberBetween(1 ,3),
            'ageOfBuilding' => fake()->randomElement([0 ,1 ,2 ,5 ,10]),
            'visibility' => 'show',
            'availability' => 'available',
            'owner_id' => fake()->numberBetween(1 ,3),
        ];
    }
}
