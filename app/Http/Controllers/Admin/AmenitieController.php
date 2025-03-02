<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Amenitie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class AmenitieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $amenities = Amenitie::all();

        return Inertia::render('Admin/Amenitie/Index', [
            'amenities' => $amenities
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
            'feature' => ['string', 'max:100', 'required'],
            'icon' => ['nullable', 'image', 'mimes:svg', 'max:1024']
        ]);

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if ($isAdmin) {

            $amenitie = new Amenitie();
            $amenitie->name = $request->feature;

            $icon = $request->icon;
            $icon_id = uniqid();
            $icon_name = $icon_id . '.' . $icon->extension();

            $icon->move(public_path('/upload/features/'), $icon_name);

            $amenitie->icon = '/upload/features/' . $icon_name;
            $amenitie->save();

            to_route('admin.amenitie.index');
        } else {

            abort(403, 'You are not authorized.');
        }
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'id' => ['required', 'exists:amenities,id'],
            'feature' => ['string', 'max:100', 'required'],
            'icon' => ['image', 'mimes:svg', 'nullable', 'max:1024']
        ]);

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if ($isAdmin) {

            $amenitie = Amenitie::findOrFail($request->id);
            $amenitie->name = $request->feature;

            if ($request->icon) {

                if (File::exists(public_path($amenitie->icon))) {

                    File::delete(public_path($amenitie->icon));
                }

                $icon = $request->icon;
                $icon_id = uniqid();
                $icon_name = $icon_id . '.' . $icon->extension();

                $icon->move(public_path('/upload/features/'), $icon_name);

                $amenitie->icon = '/upload/features/' . $icon_name;
            }

            $amenitie->save();

            to_route('admin.amenitie.index');
        } else {

            abort(403, 'You are not authorized.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if ($isAdmin) {

            $amenitie = Amenitie::findOrFail($id);
            $amenitie->delete();

            return to_route('admin.amenitie.index');
        }

        abort(403, 'You are not authorized to delete.');
    }

    public function getAmenitie(String $id)
    {

        $amenitie = Amenitie::findOrFail($id);

        return response()->json($amenitie);
    }
}
