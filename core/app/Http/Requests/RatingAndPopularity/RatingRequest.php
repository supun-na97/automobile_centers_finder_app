<?php

namespace App\Http\Requests\RatingAndPopularity;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RatingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'company_id' => ['required', 'string'],
            'rating'     => ['required', 'integer', Rule::in([1, 2, 3, 4, 5])]
        ];
    }
}
