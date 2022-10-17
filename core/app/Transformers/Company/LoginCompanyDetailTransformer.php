<?php

namespace App\Transformers\Company;

use League\Fractal\TransformerAbstract;

class LoginCompanyDetailTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'id'               => $result['id'],
            'name'             => $result['name'],
            'telephone_number' => $result['telephone_number'],
            'mobile_number'    => $result['mobile_number'],
            'address_1'        => $result['address_1'],
            'address_2'        => $result['address_2'],
            'address_3'        => $result['address_3'],
            'address_4'        => $result['address_4'],
            'latitude'         => $result['latitude'],
            'longitude'        => $result['longitude'],
            'city_id'          => $result['city_id'],
            'description'      => $result['description'],
            'image'            => $result['image'],
            'current_status'   => $result['current_status']
        ];
    }
}
