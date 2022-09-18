<?php

namespace App\Transformers\ActiveStatus;

use League\Fractal\TransformerAbstract;

class ActiveStatusTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'id'   => $result['id'],
            'name' => $result['name']
        ];
    }
}
