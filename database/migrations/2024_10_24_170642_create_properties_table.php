<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description');
            $table->enum('type', ['home', 'apartment' ,'commercial' ,'bungalows' ,'villas']);
            $table->enum('status', ['sale', 'rent']);
            $table->decimal('price', 10, 2)->nullable();
            $table->string('location', 255)->nullable();
            $table->text('address')->nullable();
            $table->foreignId('city')->constrained('cities')->onDelete('cascade');
            $table->integer('bedrooms')->default(0);
            $table->integer('bathrooms')->default(0);
            $table->integer('numberOfFloors')->default(0);
            $table->string('ageOfBuilding')->default('new');
            $table->decimal('area_sqft', 8, 2)->nullable();
            $table->decimal('land_sqft', 8, 2)->nullable();
            $table->enum('visibility' ,['show' ,'hide'])->default('show');
            $table->enum('availability', ['available', 'sold'])->default('available');
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('properties');
    }
};
