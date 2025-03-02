<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Land extends Model
{

    use SoftDeletes, HasFactory;
    protected $appends = ['IsFavourited'];

    public function City()
    {

        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function LandImages()
    {

        return $this->hasMany(LandImages::class, 'land_id', 'id');
    }

    public function Offers()
    {

        return $this->hasMany(Offer::class, 'land_id', 'id');
    }

    public function Favourites()
    {

        return $this->hasMany(Favourite::class, 'land_id', 'id');
    }

    public function Owners() {

        return $this->belongsTo(User::class ,'owner_id' ,'id');
    }

    public function getIsFavouritedAttribute()
    {

        if (auth()->user()) {

            return $this->Favourites()->where('user_id', auth()->user()->id)->exists();
        }
    }

    public function scopeSearch(Builder $query, Request $request)
    {

        return $query
            ->when($request->search, function ($query) use ($request) {

                $query->where('title', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('land_type', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('availability', 'LIKE', '%' . $request->search . '%')
                    ->orWhereHas('City', function ($query) use ($request) {

                        $query->where('name', 'LIKE', '%' . $request->search . '%')
                            ->orWhereHas('State', function ($query) use ($request) {

                                $query->where('name', 'LIKE', '%' . $request->search . '%');
                            });
                    });
            });
    }

    public function scopeSearchByUser(Builder $query, Request $request)
    {

        return $query
            ->when($request->_search, function ($query) use ($request) {

                $query->whereHas('City', function ($query) use ($request) {

                    $query->where('name', 'LIKE', '%' . $request->_search . '%')
                        ->orWhereHas('State', function ($query) use ($request) {

                            $query->where('name', 'LIKE', '%' . $request->_search . '%');
                        });
                });
            })
            ->when($request->type, function ($query) use ($request) {

                $query->where('land_type', 'LIKE', '%' . $request->type . '%');
            })
            ->when($request->area, function ($query) use ($request) {

                if ($request->area === 'small') {

                    // 10 to 20 perches 10 * 272 - 20 * 272
                    $query->whereBetween('area', [2720, 5440]);
                } else if ($request->area === 'medium') {

                    $query->whereBetween('area', [5440, 8160]);
                } else {

                    $query->where('area', '>=', 8160);
                }
            })
            ->when($request->min, function ($query) use ($request) {

                $query->where('price', '>=', $request->min);
            })
            ->when($request->max, function ($query) use ($request) {

                $query->where('price', '<=', $request->max);
            });
    }
}
