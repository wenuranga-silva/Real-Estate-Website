<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\City;
use App\Models\Property;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $userID = auth()->user()->id;

        $properties = Property::search($request)->select('id', 'title', 'type', 'status', 'city', 'availability' ,'updated_at')

            ->with(['City:id,name,state_id'
                ,'City.State:id,name'])
            ->where('owner_id', $userID)
            ->orderBy('updated_at' ,'desc')
            ->paginate(15);


        return Inertia::render('Admin/Property/Index', [

            'properties' => $properties,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $states = State::all(['id' ,'name']);

        return Inertia::render('Admin/Property/Create' ,['states' => $states]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {

        $validated = $request->validated();

        $sanitizedContent = Purifier::clean($validated['description']);

        $property = new Property();
        $property->title = $validated['title'];
        $property->description = $sanitizedContent;
        $property->type = $validated['type'];
        $property->status = $validated['status'];
        $property->price = round($validated['price'], 2);
        $property->location = $validated['googleMapLink'];
        $property->address = $validated['address'];
        $property->city = $validated['city'];
        $property->bedrooms = $validated['bedrooms'];
        $property->bathrooms = $validated['bathrooms'];
        $property->area_sqft = $validated['area'];
        $property->land_sqft = $validated['landArea'];
        $property->numberOfFloors = $validated['numberOfFloors'];
        $property->ageOfBuilding = $validated['ageOfBuilding'];
        $property->visibility = $validated['visibility'];
        $property->availability = 'available';
        $property->owner_id = auth()->user()->id;
        $property->save();

        to_route('admin.property.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $userID = auth()->user()->id;

        $property = Property::with(['City' => function ($query) {

                $query->select('id', 'state_id')->with(['State:id,name']);
            }])
            ->where('owner_id', $userID)
            ->findOrFail($id);

        $strucProperty = $property->toArray();

        $state_id = $strucProperty['city']['state_id'];

        $states = State::select('id', 'name')->get();
        $cities = City::select('id', 'name')->where('state_id', $state_id)->get();

        return Inertia::render('Admin/Property/Edit', [

            'property' => $property,
            'states' => $states,
            'cities' => $cities
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, string $id)
    {

        $validated = $request->validated();

        $userID = auth()->user()->id;

        $sanitizedContent = Purifier::clean($validated['description']);

        $property = Property::where('owner_id', $userID)->findOrFail($id);
        $property->title = $validated['title'];
        $property->description = $sanitizedContent;
        $property->type = $validated['type'];
        $property->status = $validated['status'];
        $property->price = round($validated['price'], 2);
        $property->location = $validated['googleMapLink'];
        $property->address = $validated['address'];
        $property->city = $validated['city'];
        $property->bedrooms = $validated['bedrooms'];
        $property->bathrooms = $validated['bathrooms'];
        $property->area_sqft = $validated['area'];
        $property->land_sqft = $validated['landArea'];
        $property->numberOfFloors = $validated['numberOfFloors'];
        $property->ageOfBuilding = $validated['ageOfBuilding'];
        $property->visibility = $validated['visibility'];
        $property->availability = $validated['availability'];
        $property->update();

        to_route('admin.property.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    //// get states
    public function getStates(String $id)
    {

        if (!Country::find($id)) {

            return response()->json(['states' => '', 'error' => 'Invalid']);
        }

        $states = State::select('id', 'name')->where('country_id', $id)->get();

        return response()->json(['states' => $states, 'error' => '']);
    }

    /// get cities
    public function getCities(String $id)
    {

        if (!State::find($id)) {

            return response()->json(['cities' => '', 'error' => 'Invalid']);
        }

        $cities = City::select('id', 'name')->where('state_id', $id)->get();

        return response()->json(['cities' => $cities, 'error' => '']);
    }
}
