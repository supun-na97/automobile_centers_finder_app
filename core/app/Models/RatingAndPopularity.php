<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingAndPopularity extends Model
{
    use HasFactory;

    protected $table = "rating_and_popularity_place_details";

    protected $fillable = [
        'user_id',
        'company_id',
        'rating',
        'popularity'
    ];
}
