<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'telephone_number',
        'mobile_number',
        'address_1',
        'address_2',
        'address_3',
        'address_4',
        'company_reg_id',
        'latitude',
        'longitude',
        'city_id'
    ];

    protected $table = "company_profiles";

}
