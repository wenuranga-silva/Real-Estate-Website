<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Land;
use App\Models\Offer;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id, string $type)
    {

        if ($type == 'property') {

            $offers = Property::select('id', 'title', 'price')->with(['Offers', 'PropertyImages'])->findOrFail($id);
        } else {

            $offers = Land::select('id', 'title', 'price')->with(['Offers', 'LandImages'])->findOrFail($id);
        }

        return Inertia::render('Admin/Offer/Index', [

            'type' => $type,
            'offers' => $offers
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

            'id' => ['required'],
            'type' => ['required', 'in:property,land'],
            'startDate' => ['required', 'date', 'after_or_equal:today'],
            'endDate' => ['required', 'date', 'after:startDate'],
            'discount' => ['required', 'numeric', 'min:0'],
        ]);

        $offer = new Offer();
        $offer->start_date = $request->startDate;
        $offer->end_date = $request->endDate;
        $offer->discount_value = round($request->discount, 2);
        $offer->property_id = $request->type == 'property' ? $request->id : null;
        $offer->land_id = $request->type == 'land' ? $request->id : null;
        $offer->save();

        to_route('admin.offer.index', [$request->id, $request->type]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        /// $id = offer id
        $offer = Offer::findOrFail($id);

        return response()->json($offer);
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

            'id' => ['required'], /// property | land id
            'type' => ['required', 'in:property,land'],
            'startDate' => ['required', 'date', 'after_or_equal:today'],
            'endDate' => ['required', 'date', 'after:startDate'],
            'discount' => ['required', 'numeric', 'min:0'],
            'visibility' => ['required', 'in:show,hide'],
            'offerId' => ['required'],
        ]);


        $offer = Offer::findOrFail($request->offerId);
        $offer->start_date = $request->startDate;
        $offer->end_date = $request->endDate;
        $offer->discount_value = round($request->discount, 2);
        $offer->property_id = $request->type == 'property' ? $request->id : null;
        $offer->land_id = $request->type == 'land' ? $request->id : null;
        $offer->visibility = $request->visibility;
        $offer->update();

        to_route('admin.offer.index', [$request->id, $request->type]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
