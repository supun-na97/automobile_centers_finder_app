<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

class GenericSuccessTransformer extends TransformerAbstract
{
    /**
     * Turn GenericSuccess object into custom array.
     *
     * @param GenericSuccess $genericsuccess
     * @return array
     */
    public function transform(String $message)
    {
        return [
            'message' => $message
        ];
    }
}
