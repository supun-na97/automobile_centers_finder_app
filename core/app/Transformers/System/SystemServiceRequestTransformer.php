<?php

namespace App\Transformers\System;

use League\Fractal\TransformerAbstract;

class SystemServiceRequestTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'id'                  => $result['id'],
            'customer_id'         => $result['customer_id'],
            'cus_name'            => $result['cus_name'],
            'cus_cl_address'      => $result['cus_cl_address'],
            'cus_mobile_no'       => $result['cus_mobile_no'],
            'cus_latitude'        => $result['cus_latitude'],
            'cus_longitude'       => $result['cus_longitude'],
            'cus_city'            => $result['cus_city'],
            'message'             => $result['message'],
            'vehicle_type'        => $result['vehicle_type'],
            'vehicle_sub_type'    => $result['vehicle_sub_type'],
            'com_name'            => $result['com_name'],
            'com_address'         => $result['com_address'],
            'com_latitude'        => $result['com_latitude'],
            'com_longitude'       => $result['com_longitude'],
            'com_city'            => $result['com_city'],
            'com_mobile_no'       => $result['com_mobile_no'],
            'com_response_status' => $result['com_response_status'],
            'request_status'      => $result['request_status'],
            'created_at'          => $result['created_at'],
            'approved_date'       => $result['updated_at']
        ];
    }
}
