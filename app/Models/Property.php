<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Property extends Model
{

    use SoftDeletes, HasFactory;
    protected $appends = ['IsFavourited'];

    public function City()
    {

        return $this->belongsTo(City::class, 'city', 'id');
    }

    public function PropertyImages()
    {

        return $this->hasMany(PropertyImage::class, 'property_id', 'id');
    }

    public function PropertyAmenities()
    {

        return $this->hasMany(PropertyAmenitie::class, 'property_id', 'id');
    }

    public function Offers()
    {

        return $this->hasMany(Offer::class, 'property_id', 'id');
    }

    public function Owners() {

        return $this->belongsTo(User::class ,'owner_id' ,'id');
    }

    public function Favourites() {

        return $this->hasMany(Favourite::class ,'property_id' ,'id');
    }

    public function getIsFavouritedAttribute() {

        if (auth()->user()) {

            return $this->Favourites()->where('user_id' ,auth()->user()->id)->exists();
        }
    }

    public function scopeSearch(Builder $query, Request $request)
    {

        return $query
            ->when($request->search, function ($query) use ($request) {

                $query->where('title', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('type', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('status', 'LIKE', '%' . $request->search . '%')
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
                        ->orWhereHas('State' ,function ($query) use ($request) {

                            $query->where('name' ,'LIKE' ,'%'.$request->_search.'%');
                        });
                });
            })
            ->when($request->type, function ($query) use ($request) {

                $query->where('type', 'LIKE', '%' . $request->type . '%');
            })
            ->when($request->area, function ($query) use ($request) {

                if ($request->area === 'small') {

                    $query->whereBetween('area_sqft', [800, 1200]);
                } else if ($request->area === 'medium') {

                    $query->whereBetween('area_sqft', [1200, 2000]);
                } else {

                    $query->where('area_sqft', '>=' ,2000);
                }
            })
            ->when($request->bedrooms ,function ($query) use ($request) {

                if ($request->bedrooms === 2) {

                    $query->where('bedrooms', '>=' ,2);
                } else if ($request->bedrooms === 3) {

                    $query->where('bedrooms', '>=' ,3);
                } else {

                    $query->where('bedrooms', '>=' ,4);
                }
            })
            ->when($request->status ,function ($query) use ($request) {

                $query->where('status' ,$request->status);
            })
            ->when($request->min ,function ($query) use ($request) {

                $query->where('price' ,'>=' ,$request->min);
            })
            ->when($request->max ,function ($query) use ($request) {

                $query->where('price' ,'<=' ,$request->max);
            });
    }
}
