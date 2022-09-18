<?php

namespace App\Services\Admin\District;

use App\Models\District;
use Prewk\Result\Ok;

class DistrictService
{
    public function getDistrict()
    {
        $districts = District::whereNull('deleted_at')->orderBy('name', 'ASC')->get();

        return new Ok($districts);
    }
}
