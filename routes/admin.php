<?php

use App\Http\Controllers\Admin\AmenitieController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\LandController;
use App\Http\Controllers\Admin\LandImageController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\PropertyAmenitieController;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\Admin\PropertyImageController;
use App\Http\Controllers\Admin\StateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/cpanel', function () {

    return Inertia::render('Admin/Dashboard');
})->name('cpanel');

//// Property
Route::get('/property/get-states/{id}', [PropertyController::class ,'getStates'])->name('property.states');
Route::get('/property/get-cities/{id}', [PropertyController::class ,'getCities'])->name('property.cities');
Route::resource('/property', PropertyController::class);

//// Property Images
Route::resource('/propertyImage' ,PropertyImageController::class);

/// Amenitie
Route::get('/get/amenitie/{id}' ,[AmenitieController::class ,'getAmenitie'])->name('get.amenitie');
Route::resource('/amenitie' ,AmenitieController::class);

/// Property Amenities
Route::get('/propertyAmenitie/get/amenitie/{id}' ,[PropertyAmenitieController::class ,'getAmenitie'])->name('get.property.amenitie');
Route::resource('/propertyAmenitie' ,PropertyAmenitieController::class);

//// Land
Route::resource('/land' ,LandController::class);
Route::resource('/landImages' ,LandImageController::class);

/// offer
Route::get('/offer/{id}/{type}' ,[OfferController::class ,'index'])->name('offer.index');
Route::resource('/offer' ,OfferController::class)->except(['index']);

//// admin
Route::middleware('role:admin')->group(function () {

    //// Locations
    Route::resource('/state', StateController::class);
    Route::resource('/city', CityController::class);

});
