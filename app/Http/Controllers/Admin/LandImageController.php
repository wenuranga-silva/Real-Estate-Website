<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Land;
use App\Models\LandImages;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandImageController extends Controller
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

            'landID' => ['required', 'exists:lands,id'],
            'files' => ['required', 'array'],
            'files.*' => ['file', 'mimes:png,jpg,webp,jpeg', 'max:2048']
        ]);

        $land_id = $request->landID;

        \Tinify\setKey(env('TINIFY_API_KEY'));

        $paths = [];

        foreach ($request->file('files') as $val) {

            $image = $val;
            $imageId = uniqid();
            $imageName = $imageId . '.' . $image->extension();
            $path = '/upload/land/' . $imageName;

            $paths[] = $path;
            $image->move(public_path('/upload/land/'), $imageName);

            $landImage = new LandImages();
            $landImage->land_id = $land_id;
            $landImage->image_url = $path;
            $landImage->save();
        }

        foreach ($paths as $val) {


            \Tinify\fromFile(public_path($val))

            ->resize([

                'method' => 'scale',
                'width' => 900,
            ])
            ->toFile(public_path($val));
        }


        to_route('admin.landImages.show', $land_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $land = Land::select('id', 'title' ,'owner_id')
            ->with(['LandImages' => function ($query) {

                $query->select('id', 'land_id' ,'image_url');
            }])
            ->findOrFail($id);

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if ($user->id == $land->owner_id || $isAdmin) {

            return Inertia::render('Admin/Land/Images/Index', [

                'land' => $land,
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
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        $image = LandImages::with(['Land:id,owner_id'])->findOrFail($id);

        if ($user->id === $image->land->id || $isAdmin) {

            $image->delete();

            return to_route('admin.landImages.show' ,$image->land->id);
        }

        abort(403, 'You are not authorized to delete.');
    }
}
