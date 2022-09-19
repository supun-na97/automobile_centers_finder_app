<?php

namespace App\Http\Controllers\Api\Admin\Report;

use App\Http\Controllers\Api\ApiController;
use App\Services\Admin\Report\ApplicationReportService;

class ApplicationController extends ApiController
{
    /**
     * @var applicationReportService
     */
    protected $applicationReportService;

    /**
     * application report service.
     * @param ApplicationReportService $applicationReportService
     */
    public function __construct(ApplicationReportService $applicationReportService)
    {
        $this->applicationReportService = $applicationReportService;
    }

    public function userAppUsage()
    {
        $result = $this->applicationReportService->getUserAppUsage();

        return $result->unwrap();
    }

    public function companyAppUsage()
    {
        $result = $this->applicationReportService->getCompanyAppUsage();

        return $result->unwrap();
    }

    public function allUserRequest()
    {
        $result = $this->applicationReportService->getAllRequestDetails();

        return $result->unwrap();
    }
}
