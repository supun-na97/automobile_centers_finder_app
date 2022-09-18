<?php

namespace App\Http\Controllers\Api\Admin\Province;

use App\Http\Controllers\Api\ApiController;
use App\Services\Admin\Province\ProvinceService;
use App\Transformers\Admin\Province\ProvinceTransformer;

class ProvinceController extends ApiController
{
    /**
     * @var provinceService
     */
    protected $provinceService;

    /**
     * Province service.
     * @param ProvinceService $provinceService
     */
    public function __construct(ProvinceService $provinceService)
    {
        $this->provinceService = $provinceService;
    }

    public function province()
    {
        $result = $this->provinceService->getProvince();
        $data   = $result->unwrap();

        return fractal($data, new ProvinceTransformer)->respond();
    }
}
