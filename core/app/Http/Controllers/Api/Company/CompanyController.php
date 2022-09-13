<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Company\CompanyDetailRequest;
use App\Services\Company\CompanyService;
use App\Transformers\Company\CompanyDetailTransformer;

class CompanyController extends ApiController
{
    /**
     * @var companyService
     */
    protected $companyService;

    /**
     * Company service.
     * @param CompanyService $companyService
     */
    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }

    public function getCompanies(CompanyDetailRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->companyService->getCompanyDetails($validatedData['city_id']);

        $data = $result->unwrap();

        return fractal($data, new CompanyDetailTransformer)->respond();
    }
}
