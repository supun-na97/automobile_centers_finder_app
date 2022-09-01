<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

class ErrorTransformer extends TransformerAbstract
{
    public function transform(object $error)
    {
        $ret = [
            'error' => $error->code,
            'message' => $error->message,
        ];

        if (property_exists($error, 'failures')) {
            $ret['failures'] = is_null($error->failures) ? [] : $error->failures;
        }

        return $ret;
    }
}
