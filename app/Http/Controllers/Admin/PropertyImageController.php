<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PropertyImageController extends Controller
{

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

            'propertyId' => ['required', 'exists:properties,id'],
            'files' => ['required', 'array'],
            'files.*' => ['file', 'mimes:png,jpg,webp,jpeg', 'max:2048']
        ]);


        $property_id = $request->propertyId;

        \Tinify\setKey(env('TINIFY_API_KEY'));
        // $optimizerChain = OptimizerChainFactory::create();
        // $optimizerChain
        //     ->addOptimizer(new \Spatie\ImageOptimizer\Optimizers\Jpegoptim([
        //         '--max=78', // Quality level
        //         '--strip-all', // Remove metadata
        //         '--all-progressive', // Progressive JPEG
        //     ]))
        //     ->addOptimizer(new \Spatie\ImageOptimizer\Optimizers\Pngquant([
        //         '--quality=65-80', // Quality range
        //     ]))
        //     ->addOptimizer(new \Spatie\ImageOptimizer\Optimizers\Optipng([
        //         '-o2', // Optimization level
        //     ]));

        $paths = [];

        foreach ($request->file('files') as $val) {

            $image = $val;
            $imageId = uniqid();
            $imageName = $imageId . '.' . $image->extension();
            $path = '/upload/property/' . $imageName;

            $paths[] = $path;
            $image->move(public_path('/upload/property/'), $imageName);

            $propertyImage = new PropertyImage();
            $propertyImage->property_id = $property_id;
            $propertyImage->image_url = $path;
            $propertyImage->save();
        }

        foreach ($paths as $val) {


            \Tinify\fromFile(public_path($val))

            ->resize([

                'method' => 'scale',
                'width' => 900,
            ])
            ->toFile(public_path($val));


            // $source = \Tinify\fromFile(public_path($val));
            // $resized = $source->resize([
            //     'method' => 'scale',
            //     'width' => 1200,
            // ]);
            // $resized->toFile(public_path($val));
            //$optimizerChain->optimize(public_path($val));
        }


        to_route('admin.property.show', $property_id);
    }

    /**
     * Display a listing of the resource.
     */
    public function show(string $id)
    {

        $property = Property::select('id', 'title' ,'owner_id')
            ->with(['PropertyImages' => function ($query) {

                $query->select('id', 'property_id' ,'image_url');
            }])
            ->findOrFail($id);

        $user = auth()->user();
        $isAdmin = $user->getRoleNames()->contains('admin');

        if ($user->id == $property->owner_id || $isAdmin) {

            return Inertia::render('Admin/Property/Images/Index', [

                'property' => $property,
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

        $image = PropertyImage::with(['Property:id,owner_id'])->findOrFail($id);

        if ($user->id === $image->property->id || $isAdmin) {

            $image->delete();

            return to_route('admin.propertyImage.show' ,$image->property->id);
        }

        abort(403, 'You are not authorized to delete.');
    }
}
