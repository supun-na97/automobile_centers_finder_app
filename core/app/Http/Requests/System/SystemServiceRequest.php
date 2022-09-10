<?php

namespace App\Http\Requests\System;

use Illuminate\Foundation\Http\FormRequest;

class SystemServiceRequest extends FormRequest
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
            'customer_id'      => ['required', 'string'],
            'cus_cl_address'   => ['nullable', 'string'],
            'cus_latitude'     => ['required', 'string'],
            'cus_longitude'    => ['required', 'string'],
            'cus_city'         => ['nullable', 'string'],
            'message'          => ['nullable'],
            'vehicle_type'     => ['nullable', 'string'],
            'vehicle_sub_type' => ['nullable', 'string'],
            'company_id'       => ['required', 'string']
        ];
    }
}
