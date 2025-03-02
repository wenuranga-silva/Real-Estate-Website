<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\State;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $states = State::search($request)->paginate(15);

        return Inertia::render('Admin/Location/State' ,[
            'states' => $states,
            'search' => $request->search ? $request->search : ''
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
            'state' => ['required' ,'string' ,'max:200'],
            'visibility' => ['required' ,'in:show,hide'],
        ]);

        $state = new State();
        $state->name = $request->state;
        $state->visibility = $request->visibility;
        $state->save();

        to_route('admin.state.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $_d = State::findOrFail($id);

        return response()->json($_d);
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
            'state_id' => ['required' ,'exists:states,id'],
            'state' => ['required'  ,'string' ,'max:200'],
            'visibility' => ['required' ,'in:show,hide'],
        ]);

        $state = State::findOrFail($request->state_id);
        $state->name = $request->state;
        $state->visibility = $request->visibility;
        $state->update();

        to_route('admin.state.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
