<?php

namespace App\Http\Controllers\Api\Admin\District;

use App\Http\Controllers\Api\ApiController;
use App\Services\Admin\District\DistrictService;
use App\Transformers\Admin\District\DistrictTransformer;

class DistrictController extends ApiController
{
    /**
     * @var districtService
     */
    protected $districtService;

    /**
     * District service.
     * @param DistrictService $districtService
     */
    public function __construct(DistrictService $districtService)
    {
        $this->districtService = $districtService;
    }

    public function district()
    {
        $result        = $this->districtService->getDistrict();
        $data          = $result->unwrap();

        return fractal($data, new DistrictTransformer)->respond();
    }
}
