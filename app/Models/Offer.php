<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offer extends Model
{
    use SoftDeletes ,HasFactory;

    public function Property () {

        return $this->belongsTo(Property::class ,'property_id' ,'id');
    }

    public function Land () {

        return $this->belongsTo(Land::class ,'land_id' ,'id');
    }
}
