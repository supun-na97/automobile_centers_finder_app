<?php

namespace App\Transformers\Admin\District;

use League\Fractal\TransformerAbstract;

class DistrictTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'id'          => $result['district_id'],
            'name'        => $result['name'],
            'province_id' => $result['province_id']
        ];
    }
}
