<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLandRequest extends FormRequest
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
            'type' => ['required', 'in:industrial,commercial,agricultural,residential'],
            'visibility' => ['required', 'in:show,hide'],
            'area' => ['nullable', 'numeric', 'min:0'],
            'city' => ['required', 'exists:cities,id'],
            'googleMapLink' => ['nullable', 'url'],
        ];
    }
}
