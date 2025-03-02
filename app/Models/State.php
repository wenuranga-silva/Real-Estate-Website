<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class State extends Model
{


    public function scopeSearch(Builder $query ,Request $request) {

        return $query
            ->when($request->search ,function ($query) use ($request) {

                $query->where('name' ,'LIKE' ,'%' .$request->search .'%');
            });

    }
}
