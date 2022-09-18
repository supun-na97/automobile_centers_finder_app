<?php

namespace App\Services\Admin\Province;

use App\Models\Province;
use Prewk\Result\Ok;

class ProvinceService
{
    public function getProvince()
    {
        $provinces = Province::whereNull('deleted_at')->orderBy('name', 'ASC')->get();

        return new Ok($provinces);
    }
}
