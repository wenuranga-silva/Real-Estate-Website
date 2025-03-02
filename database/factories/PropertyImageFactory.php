<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyImage>
 */
class PropertyImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'property_id' => fake()->numberBetween(2500, 3000),
            'image_url' => fake()->randomElement([
                '/upload/property/6742e1203f945.jpg',
                '/upload/property/6742e12040d74.jpg',
                '/upload/property/6744be7c3fdcf.jpg',
                '/upload/property/6744be7c4132b.jpg',
                '/upload/property/6744be7c42ce1.jpg',
                '/upload/property/6744be7c44a41.jpg',
                '/upload/property/6744be7c4647d.jpg',
                '/upload/property/6744be7c47f84.jpg',
                '/upload/property/6744be7c49795.jpg',
                '/upload/property/6744be7c4aa7b.jpg',
                '/upload/property/6744be7c4befc.jpg',
                '/upload/property/6744be7c4d5e8.jpg',
                '/upload/property/6744be7c4e736.jpg',
                '/upload/property/6744be7c4fa19.jpg',
                '/upload/property/6744be7c51477.jpg',
                '/upload/property/6744be7c523ef.jpg',
                '/upload/property/6744be7c5380f.jpg',
                '/upload/property/6744be7c551b3.jpg',
                '/upload/property/6744be7c565a4.jpg',
            ])
        ];
    }
}
