<?php

namespace App\Services\Admin\City;

use App\Models\City;
use Prewk\Result\Ok;

class CityService
{
    public function getCity()
    {
        $cities = City::whereNull('deleted_at')->orderBy('name', 'ASC')->get();

        return new Ok($cities);
    }
}
