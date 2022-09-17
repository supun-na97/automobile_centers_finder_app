<?php

namespace App\Transformers\Notification;

use League\Fractal\TransformerAbstract;

class GetNotificationTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'count'           => $result['count'],
            'notification'    => $result['notification']
        ];
    }
}
