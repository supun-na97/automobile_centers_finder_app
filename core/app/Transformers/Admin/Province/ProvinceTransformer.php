<?php

namespace App\Transformers\Admin\Province;

use League\Fractal\TransformerAbstract;

class ProvinceTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'id'   => $result['province_id'],
            'name' => $result['name']
        ];
    }
}
