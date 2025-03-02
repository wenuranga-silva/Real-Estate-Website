<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LandImages>
 */
class LandImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'land_id' => fake()->numberBetween(7 ,220),
            'image_url' => fake()->randomElement([
                '/upload/land/6744c647aebed.jpg',
                '/upload/land/6744c647b07d4.jpg',
                '/upload/land/6744c647b1c34.jpg',
                '/upload/land/6744c647b2d50.jpg',
                '/upload/land/6744c647b3d60.jpg',
                '/upload/land/6744c647b54c5.jpg',
                '/upload/land/6744c647b6578.jpg',
                '/upload/land/6744c647b76c9.jpg',
                '/upload/land/6744c647b8b17.jpg',
                '/upload/land/6744c647b9e35.jpg'
            ])
        ];
    }
}
