<?php

use App\Http\Controllers\frontend\FrontEndController;
use App\Http\Controllers\frontend\HomeController;
use App\Http\Controllers\ProfileController;
use App\Models\City;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontEndController::class, 'index'])->name('home');

Route::get('/dashboard', function () {

    return redirect()->route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/find/{propertyType}', [FrontEndController::class, 'search'])->name('search');


///
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    /// favourites
    Route::get('/favourite', [FrontEndController::class, 'indexFavourite'])->name('favourite.index');
    Route::post('/favourite/store', [FrontEndController::class, 'storeFavourite'])->name('favourite.store');
    Route::delete('/favourite/{id}/{type}', [FrontEndController::class, 'distroyFavourite'])->name('favourite.destroy');
});

// post
Route::get('/post/{propertyType}/{id}' ,[FrontEndController::class ,'showPost'])->name('post');
Route::post('/post/sendMail' ,[FrontEndController::class ,'sendMail'])->name('sendMail');

/// return search keys
Route::get('get/search/keys/{search}', function (String $search) {

    $keyCities = City::select('id', 'name', 'state_id')
        ->where('name', 'LIKE', '%' . $search . '%')
        ->where('visibility', 'show')
        ->get();

    return response()->json($keyCities);
})->middleware('throttle:60,60')->name('search.keys');

require __DIR__ . '/auth.php';
