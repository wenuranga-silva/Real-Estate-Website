<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Amenitie extends Model
{

    use SoftDeletes ,HasFactory;

    public function PropertyAmenitie() {

        return $this->hasMany(PropertyAmenitie::class ,'amenitie' ,'id');
    }
}
