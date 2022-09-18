<?php

namespace App\Transformers\Admin\City;

use League\Fractal\TransformerAbstract;

class CityTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'id'          => $result['city_id'],
            'name'        => $result['name'],
            'district_id' => $result['district_id']
        ];
    }
}
