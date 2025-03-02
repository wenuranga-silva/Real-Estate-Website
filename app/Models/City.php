<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class City extends Model
{

    public function State() {

        return $this->belongsTo(State::class ,'state_id' ,'id');
    }

    public function scopeSearch(Builder $query ,Request $request) {

        return $query

            ->when($request->search ,function ($query) use ($request) {

                $query
                    ->where('name' ,'LIKE' ,'%' . $request->search . '%')
                    ->orWhere('visibility' ,'LIKE' ,'%' . $request->search . '%')
                    ->orWhereHas('State' ,function ($query) use ($request) {

                        /// search on states
                        $query
                            ->where('name' ,'LIKE' ,'%' . $request->search . '%');
                    });
            });

    }
}
