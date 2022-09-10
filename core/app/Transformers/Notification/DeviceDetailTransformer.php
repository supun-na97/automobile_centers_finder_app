<?php

namespace App\Transformers\Notification;

use League\Fractal\TransformerAbstract;

class DeviceDetailTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'user_id'        => $result->user_id,
            'device_token'   => $result->device_token,
            'device_ip'      => $result->device_ip,
            'device_details' => $result->device_detail
        ];
    }
}
