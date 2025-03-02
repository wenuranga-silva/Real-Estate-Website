<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyImage extends Model
{

    use SoftDeletes ,HasFactory;

    public function Property () {

        return $this->belongsTo(Property::class ,'property_id' ,'id');
    }

}
