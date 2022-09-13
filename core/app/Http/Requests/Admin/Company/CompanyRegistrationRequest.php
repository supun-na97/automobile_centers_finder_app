<?php

namespace App\Http\Requests\Admin\Company;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRegistrationRequest extends FormRequest
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
            //user register
            'name'              => ['required', 'string'],
            'email'             => ['required', 'string', 'email', 'max:255'],
            'password'          => ['required', 'string', 'min:8'],
            'phone_number'      => ['required', 'string', 'min:10'],
            //company register validation
            'address_1'         => ['required', 'string', 'max:255'],
            'address_2'         => ['required', 'string', 'max:255'],
            'address_3'         => ['nullable', 'string', 'max:255'],
            'address_4'         => ['nullable', 'string', 'max:255'],
            'telephone_number'  => ['nullable', 'string', 'min:10', 'max:10'],
            'latitude'          => ['nullable', 'string', 'max:255'],
            'longitude'         => ['nullable', 'string', 'max:255'],
            'city_id'           => ['nullable', 'integer'],
            'description'       => ['nullable'],
            'image'             => ['nullable', 'image'],
        ];
    }
}
