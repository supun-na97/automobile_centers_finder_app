<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Api\ApiController;
use App\Services\Company\CompanyService;

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
}
