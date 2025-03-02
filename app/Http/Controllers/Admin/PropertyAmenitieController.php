<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Amenitie;
use App\Models\Property;
use App\Models\PropertyAmenitie;
use Inertia\Inertia;


class PropertyAmenitieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([

            'feature' => ['required' ,'exists:amenities,id'],
            'propertyId' => ['required']
        ]);

        $property = Property::select('id', 'owner_id')->findOrFail($request->propertyId);

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if (!($user->id === $property->owner_id || $isAdmin)) {

            return abort(403, 'You are not authorized .');
        }

        $amenitie = new PropertyAmenitie();
        $amenitie->property_id = $request->propertyId;
        $amenitie->amenitie = $request->feature;
        $amenitie->save();

        to_route('admin.propertyAmenitie.show', $request->propertyId);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $property = Property::select('id', 'title', 'owner_id')
            ->with(['PropertyAmenities:id,property_id,amenitie' ,'PropertyAmenities.Amenitie' => function ($query) {

                $query->select('id', 'name' ,'icon');
            }])
            ->findOrFail($id);

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if ($user->id == $property->owner_id || $isAdmin) {

            $amenities = Amenitie::select('id' ,'name')->get();

            return Inertia::render('Admin/Property/Amenities/Index', [

                'property' => $property,
                'amenities' => $amenities
            ]);
        }

        abort(403, 'You are not authorized.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        $amenitie = PropertyAmenitie::with(['Property:id,owner_id'])->findOrFail($id);

        if ($user->id === $amenitie->property->id || $isAdmin) {

            $amenitie->delete();

            return to_route('admin.propertyAmenitie.show', $amenitie->property->id);
        }

        abort(403, 'You are not authorized to delete.');
    }

    public function getAmenitie(String $id)
    {

        $amenitie = Amenitie::select('id', 'feature')->findOrFail($id);

        return response()->json($amenitie);
    }
}
