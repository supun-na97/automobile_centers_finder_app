<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'name'             => ['nullable', 'string'],
            'address_1'        => ['nullable', 'string'],
            'address_2'        => ['nullable', 'string'],
            'address_3'        => ['nullable', 'string'],
            'address_4'        => ['nullable', 'string'],
            'telephone_number' => ['nullable', 'string'],
            'mobile_number'    => ['nullable', 'string'],
            'latitude'         => ['nullable', 'string'],
            'longitude'        => ['nullable', 'string'],
            'city_id'          => ['nullable', 'string'],
            'description'      => ['nullable'],
            'image'            => ['nullable', 'image']
        ];
    }
}
