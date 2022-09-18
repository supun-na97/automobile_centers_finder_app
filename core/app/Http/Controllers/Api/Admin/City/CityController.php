<?php

namespace App\Http\Controllers\Api\Admin\City;

use App\Http\Controllers\Api\ApiController;
use App\Services\Admin\City\CityService;
use App\Transformers\Admin\City\CityTransformer;

class CityController extends ApiController
{
    /**
     * @var cityService
     */
    protected $cityService;

    /**
     * City service.
     * @param CityService $cityService
     */
    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function city()
    {
        $result        = $this->cityService->getCity();
        $data          = $result->unwrap();

        return fractal($data, new CityTransformer)->respond();
    }
}
