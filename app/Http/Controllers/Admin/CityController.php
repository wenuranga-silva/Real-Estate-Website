<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $cities = City::search($request)->select('id' ,'state_id' ,'name' ,'visibility')->with(['State'])->paginate(15);

        $states = State::select('id' ,'name')
            ->get();

        return Inertia::render('Admin/Location/City' ,[

            'cities' => $cities,
            'states' => $states,
        ]);
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

            'city' => ['required' ,'string' ,'max:120'],
            'state_id' => ['required' ,'exists:states,id'],
            'visibility' => ['required' ,'in:show,hide']
        ]);

        $city = new City();
        $city->name = $request->city;
        $city->visibility = $request->visibility;
        $city->state_id = $request->state_id;
        $city->save();

        to_route('admin.city.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $city = City::select('id' ,'name' ,'visibility' ,'state_id')->with(['State:id,name'])->findOrFail($id);

        return response()->json($city);
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
    {

        $request->validate([

            'city' => ['required' ,'string' ,'max:120'],
            'state_id' => ['required' ,'exists:states,id'],
            'visibility' => ['required' ,'in:show,hide']
        ]);

        $city = City::findOrFail($id);
        $city->name = $request->city;
        $city->visibility = $request->visibility;
        $city->state_id = $request->state_id;
        $city->update();

        to_route('admin.city.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
