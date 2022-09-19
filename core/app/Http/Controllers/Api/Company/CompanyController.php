<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Company\CompanyDetailRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Services\Company\CompanyService;
use App\Transformers\CommonTransformer;
use App\Transformers\Company\CompanyDetailTransformer;
use App\Transformers\Company\LoginCompanyDetailTransformer;

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
        $result        = $this->companyService->getCompanyDetails($validatedData['city_id'], $validatedData['company_id'], $validatedData['company_name']);
        $data          = $result->unwrap();

        return fractal($data, new CompanyDetailTransformer)->respond();
    }

    public function updateCompany(UpdateCompanyRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->companyService->updateCompanyProfile($validatedData);

        if ($result->isErr()) {
            $err      = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message']);
        } else {
            $data     = $result->unwrap();
            $response = fractal($data, new CommonTransformer)->respond();
        }

        return $response;
    }

    public function loginCompany()
    {
        $result = $this->companyService->getLoginCompanyDetail();
        $data   = $result->unwrap();

        return fractal($data, new LoginCompanyDetailTransformer)->respond();
    }
}
