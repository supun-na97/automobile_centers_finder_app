<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequest extends Model
{
    use HasFactory;

    protected $table = "user_requests";

    protected $fillable = [
            'customer_id',
            'cus_name',
            'cus_cl_address',
            'cus_mobile_no',
            'cus_latitude',
            'cus_longitude',
            'cus_city',
            'message',
            'vehicle_type',
            'vehicle_sub_type',
            'company_main_id',
            'com_name',
            'com_address',
            'com_latitude',
            'com_longitude',
            'com_city',
            'com_mobile_no',
    ];
}
