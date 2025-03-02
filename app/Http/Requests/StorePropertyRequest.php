<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'title' => ['required', 'string', 'max:200'],
            'description' => ['required'],
            'price' => ['required', 'numeric', 'min:0'],
            'type' => ['required', 'in:home,apartment,commercial,bungalows,villas'],
            'status' => ['required', 'in:sale,rent'],
            'visibility' => ['required', 'in:show,hide'],
            'bedrooms' => ['required', 'integer', 'min:0'],
            'bathrooms' => ['required', 'integer', 'min:0'],
            'area' => ['nullable', 'numeric', 'min:0'],
            'landArea' => ['nullable', 'numeric', 'min:0'],
            'numberOfFloors' => ['required', 'numeric', 'min:0'],
            'ageOfBuilding' => ['required', 'string'],
            'city' => ['required', 'exists:cities,id'],
            'address' => ['nullable', 'string'],
            'googleMapLink' => ['nullable', 'url'],
        ];
    }
}
