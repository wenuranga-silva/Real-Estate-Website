<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLandRequest;
use App\Http\Requests\UpdateLandRequest;
use App\Models\City;
use App\Models\Land;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier;

class LandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $userID = auth()->user()->id;

        $lands = Land::search($request)->select('id', 'title', 'land_type', 'city_id', 'availability' ,'updated_at')

            ->with(['City:id,name,state_id'
                ,'City.State:id,name'])
            ->where('owner_id', $userID)
            ->orderBy('updated_at' ,'desc')
            ->paginate(15);

        return Inertia::render('Admin/Land/Index', [

            'lands' => $lands,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $states = State::all(['id' ,'name']);

        return Inertia::render('Admin/Land/Create' ,[
            'states' => $states
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLandRequest $request)
    {

        $validated = $request->validated();

        $sanitizedContent = Purifier::clean($validated['description']);

        $land = new Land();
        $land->title = $validated['title'];
        $land->description = $sanitizedContent;
        $land->land_type = $validated['type'];
        $land->price = round($validated['price'], 2);
        $land->location = $validated['googleMapLink'];
        $land->city_id = $validated['city'];
        $land->area = $validated['area'];
        $land->visibility = $validated['visibility'];
        $land->availability = 'available';
        $land->owner_id = auth()->user()->id;
        $land->save();

        to_route('admin.land.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $userID = auth()->user()->id;

        $land = Land::with(['City' => function ($query) {

                $query->select('id', 'state_id')->with(['State']);
            }])
            ->where('owner_id', $userID)
            ->findOrFail($id);

        $strucLand = $land->toArray();

        $state_id = $strucLand['city']['state_id'];

        $states = State::select('id', 'name')->get();
        $cities = City::select('id', 'name')->where('state_id', $state_id)->get();

        return Inertia::render('Admin/Land/Edit', [

            'land' => $land,
            'states' => $states,
            'cities' => $cities
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLandRequest $request, string $id)
    {

        $validated = $request->validated();

        $userID = auth()->user()->id;

        $sanitizedContent = Purifier::clean($validated['description']);

        $land = Land::where('owner_id', $userID)->findOrFail($id);
        $land->title = $validated['title'];
        $land->description = $sanitizedContent;
        $land->land_type = $validated['type'];
        $land->price = round($validated['price'], 2);
        $land->location = $validated['googleMapLink'];
        $land->city_id = $validated['city'];
        $land->area = $validated['area'];
        $land->visibility = $validated['visibility'];
        $land->availability = $validated['availability'];
        $land->update();

        to_route('admin.property.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
