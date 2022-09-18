<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

class CommonTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'response' => $result
        ];
    }
}
