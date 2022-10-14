<?php

namespace App\Transformers\RatingAndPopularity;

use League\Fractal\TransformerAbstract;

class GetPopularityTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'compay_id'        => $result['id'],
            'name'             => $result['name'],
            'telephone_number' => $result['telephone_number'],
            'mobile_number'    => $result['mobile_number'],
            'address'          => $result['address_1'] . ',' . $result['address_2'] . ',' . $result['address_3'],
            'latitude'         => $result['latitude'],
            'longitude'        => $result['longitude'],
            'city_id'          => $result['city_id'],
            'description'      => $result['description'],
            'image'            => $result['image'],
            'current_status'   => $result['current_status']
        ];
    }
}
