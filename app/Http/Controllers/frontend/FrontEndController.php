<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Mail\SendMail;
use App\Models\City;
use App\Models\Favourite;
use App\Models\Land;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class FrontEndController extends Controller
{

    /// home
    public function index()
    {

        $hotDeals =
            Property::select('id', 'title', 'type', 'status', 'price', 'city', 'bedrooms', 'bathrooms', 'area_sqft', 'visibility', 'availability', 'updated_at', 'deleted_at')
            ->with(['PropertyImages' => function ($query) {

                $query
                    ->limit(1);
            }, 'Offers' => function ($query) {

                $query
                    ->where('visibility', 'show')
                    ->where('end_date', '>=', today());
            }, 'City'])
            ->where('visibility', 'show')
            ->where('availability', 'available')
            ->orderBy('updated_at', 'desc')
            ->take(10)
            ->get();

        $hotDealsLands = Land::select('id', 'title', 'area', 'price', 'land_type', 'city_id', 'availability', 'visibility', 'updated_at', 'deleted_at')
            ->with(['LandImages' => function ($query) {

                $query->limit(1);
            }, 'Offers' => function ($query) {

                $query
                    ->where('visibility', 'show')
                    ->where('end_date', '>=', today());
            }, 'City'])
            ->where('visibility', 'show')
            ->where('availability', 'available')
            ->orderBy('updated_at', 'desc')
            ->take(10)
            ->get();

        $cities = City::limit(10)->get();

        return Inertia::render('Frontend/Home', [

            'hotDeals' => $hotDeals,
            'hotDealsLands' => $hotDealsLands,
            'cities' => $cities
        ]);
    }

    /// search
    public function search(Request $request, String $propertyType)
    {

        $cities = City::limit(10)->get();
        $msg = '';

        $_propertyType = $propertyType === 'property' ? 'property' : 'land';
        if ($_propertyType === 'property') {

            $results = Property::select('id', 'title', 'type', 'status', 'price', 'city', 'bedrooms', 'bathrooms', 'area_sqft', 'visibility', 'availability', 'updated_at', 'deleted_at')
                ->searchByUser($request)
                ->with(['PropertyImages' => function ($query) {

                    $query->limit(1);
                }, 'Offers' => function ($query) {

                    $query
                        ->where('visibility', 'show')
                        ->where('end_date', '>=', today());
                }, 'City'])
                ->where('visibility', 'show')
                ->where('availability', 'available')
                ->orderBy('updated_at', 'desc')
                ->paginate(20);

            /// if results are empty
            if ($results->isEmpty()) {

                $results = Property::select('id', 'title', 'type', 'status', 'price', 'city', 'bedrooms', 'bathrooms', 'area_sqft', 'visibility', 'availability', 'updated_at', 'deleted_at')
                    ->with(['PropertyImages' => function ($query) {

                        $query->limit(1);
                    }, 'Offers' => function ($query) {

                        $query
                            ->where('visibility', 'show')
                            ->where('end_date', '>=', today());
                    }, 'City'])
                    ->where('visibility', 'show')
                    ->where('availability', 'available')
                    ->orderBy('updated_at', 'desc')
                    ->paginate(12);

                $msg = 'empty';
            }
        } else {

            $results = Land::select('id', 'title', 'area', 'price', 'land_type', 'city_id', 'availability', 'visibility', 'updated_at', 'deleted_at')
                ->searchByUser($request)
                ->with(['LandImages' => function ($query) {

                    $query->limit(1);
                }, 'Offers' => function ($query) {

                    $query
                        ->where('visibility', 'show')
                        ->where('end_date', '>=', today());
                }, 'City'])
                ->where('visibility', 'show')
                ->where('availability', 'available')
                ->orderBy('updated_at', 'desc')
                ->paginate(20);

            /// if results are empty
            if ($results->isEmpty()) {

                $results = Land::select('id', 'title', 'area', 'price', 'land_type', 'city_id', 'availability', 'visibility', 'updated_at', 'deleted_at')
                    ->with(['LandImages' => function ($query) {

                        $query->limit(1);
                    }, 'Offers' => function ($query) {

                        $query
                            ->where('visibility', 'show')
                            ->where('end_date', '>=', today());
                    }, 'City'])
                    ->where('visibility', 'show')
                    ->where('availability', 'available')
                    ->orderBy('updated_at', 'desc')
                    ->paginate(12);

                $msg = 'empty';
            }
        }

        return Inertia::render('Frontend/Search', [
            'cities' => $cities,
            'selectedpropertyType' => $_propertyType,
            'results' => $results,
            'msg' => $msg
        ]);
    }

    /// favourites
    public function storeFavourite(Request $request)
    {

        $request->validate([

            'type' => ['required', 'in:property,land'],
        ]);

        if ($request->type == 'property') {

            $request->validate([

                'id' => ['required', 'exists:properties,id']
            ]);

            $keyId = 'property_id';
        } else {

            $request->validate([

                'id' => ['required', 'exists:lands,id']
            ]);

            $keyId = 'land_id';
        }

        $user = auth()->user()->id;
        $isAlreadyFavourite = Favourite::where('user_id', $user)->where($keyId, $request->id)->exists();

        if ($isAlreadyFavourite) {

            return back()->with('error', 'This item is already in your favorites.');
        }

        $favourite = new Favourite();
        $favourite->user_id = $user;
        $favourite->$keyId = $request->id;

        $favourite->save();

        return back()->with('success', 'Item added to favorites successfully.');
    }

    public function distroyFavourite(String $id, String $type)
    {

        $user = auth()->user()->id;

        if ($type == 'property') {

            $isAlreadyFavourite = Favourite::where('user_id', $user)->where('property_id', $id)->exists();
        } else {

            $isAlreadyFavourite = Favourite::where('user_id', $user)->where('land_id', $id)->exists();
        }

        if (!$isAlreadyFavourite) {

            return back()->with('error', 'Not Found.');
        }

        $favourite = Favourite::where('user_id', $user);

        if ($type == 'property') {

            $favourite->where('property_id', $id)->delete();
        } else {

            $favourite->where('land_id', $id)->delete();
        }

        return back()->with('success', 'Succesfully Removed.');
    }

    public function indexFavourite()
    {

        $cities = City::limit(10)->get();

        $user = auth()->user();

        $properties = $user->Favourite()
            ->whereHas('Property', function ($query) {

                $query
                    ->where('visibility', 'show')
                    ->where('availability', 'available');
            })
            ->with(['Property' => function ($query) {

                $query
                    ->select('id', 'title', 'type', 'status', 'price', 'city', 'bedrooms', 'bathrooms', 'area_sqft', 'visibility', 'availability', 'updated_at', 'deleted_at')
                    ->with([

                        'PropertyImages' => function ($query) {

                            $query->limit(1);
                        },
                        'Offers' => function ($query) {

                            $query->where('visibility', 'show')

                                ->where('end_date', '>=', today());
                        },
                        'City'
                    ]);
            }])
            ->paginate(16);

        $lands = $user->Favourite()
            ->whereHas('Land', function ($query) {

                $query
                    ->where('visibility', 'show')
                    ->where('availability', 'available');
            })
            ->with(['Land' => function ($query) {

                $query
                    ->select('id', 'title', 'area', 'price', 'land_type', 'city_id', 'availability', 'visibility', 'updated_at', 'deleted_at')
                    ->with([

                        'LandImages' => function ($query) {

                            $query->limit(1);
                        },
                        'Offers' => function ($query) {

                            $query->where('visibility', 'show')

                                ->where('end_date', '>=', today());
                        },
                        'City'
                    ]);
            }])
            ->paginate(16);


        return Inertia::render('Frontend/Favourite', [

            'cities' => $cities,
            'properties' => $properties,
            'lands' => $lands
        ]);
    }

    public function showPost(String $type, String $id)
    {

        $cities = City::limit(10)->get();

        if ($type == 'property') {

            $isAvailable = Property::where('id', $id)->exists();

            if (!$isAvailable) {

                return back()->with('error', 'Item Not Found.');
            }

            $result = Property::with([
                'PropertyImages',
                'Offers' => function ($query) {

                    $query
                        ->where('visibility', 'show')
                        ->where('end_date', '>=', today());
                }, 'City', 'PropertyAmenities' => function ($query) {

                    $query->with(['Amenitie']);
                }, 'Owners' => function ($query) {

                    $query->select('id', 'email', 'phone_number');
                }
            ])
                ->where('visibility', 'show')
                ->where('availability', 'available')
                ->where('id', $id)
                ->first();

            $latest =
                Property::select('id', 'title', 'type', 'status', 'price', 'city', 'bedrooms', 'bathrooms', 'area_sqft', 'visibility', 'availability', 'updated_at', 'deleted_at')
                ->with(['PropertyImages' => function ($query) {

                    $query
                        ->limit(1);
                }, 'Offers' => function ($query) {

                    $query
                        ->where('visibility', 'show')
                        ->where('end_date', '>=', today());
                }, 'City'])
                ->where('visibility', 'show')
                ->where('availability', 'available')
                ->orderBy('updated_at', 'desc')
                ->take(6)
                ->get();

            return Inertia::render('Frontend/Post', [

                'result' => $result,
                'cities' => $cities,
                'latest' => $latest
            ]);
        } else {

            $isAvailable = Land::where('id', $id)->exists();

            if (!$isAvailable) {

                return back()->with('error', 'Item Not Found.');
            }

            $result = Land::
                with(['LandImages' => function ($query) {

                    $query->limit(1);
                }, 'Offers' => function ($query) {

                    $query
                        ->where('visibility', 'show')
                        ->where('end_date', '>=', today());
                }, 'City', 'Owners' => function ($query) {

                    $query->select('id', 'email', 'phone_number');
                }])
                ->where('visibility', 'show')
                ->where('availability', 'available')
                ->orderBy('updated_at', 'desc')
                ->where('id', $id)
                ->first();

            $latest = Land::select('id', 'title', 'area', 'price', 'land_type', 'city_id', 'availability', 'visibility', 'updated_at', 'deleted_at')
                ->with(['LandImages' => function ($query) {

                    $query->limit(1);
                }, 'Offers' => function ($query) {

                    $query
                        ->where('visibility', 'show')
                        ->where('end_date', '>=', today());
                }, 'City'])
                ->where('visibility', 'show')
                ->where('availability', 'available')
                ->orderBy('updated_at', 'desc')
                ->take(6)
                ->get();

            return Inertia::render('Frontend/PostLand', [

                'result' => $result,
                'cities' => $cities,
                'latest' => $latest
            ]);
        }
    }

    public function sendMail(Request $request) {


        $request->validate([

            'ownerMail' => ['required' ,'email'],
            'clientMail' => ['required' ,'email'],
            'message' => ['required' ,'string'],
            'type' => ['required' ,'in:land,property']
        ]);

        if ($request->type == 'land') {

            $request->validate([

                'propertyId' => ['required' ,'exists:lands,id']
            ]);

            $land = Land::select('id' ,'title')->where('id' ,$request->propertyId)->first();

            $details = [
                'title' => $land->title,
                'message' => $request->message
            ];

            $subject = $land->title;

            Mail::to($request->ownerMail)->send(new SendMail($details ,$subject));

            return back()->with('success' ,'Email Sent');

        } else {

            $request->validate([

                'propertyId' => ['required' ,'exists:properties,id']
            ]);

            $property = Property::select('id' ,'title')->where('id' ,$request->propertyId)->first();

            $details = [
                'title' => $property->title,
                'message' => $request->message
            ];

            $subject = $property->title;

            Mail::to($request->ownerMail)->send(new SendMail($details ,$subject));

            return back()->with('success' ,'Email Sent');
        }


    }
}
