<?php

namespace App\Http\Controllers\Api\System;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\System\CompanyRequestDetailRequest;
use App\Http\Requests\System\SystemServiceRequest;
use App\Services\System\SystemService;
use App\Transformers\CommonTransformer;

class SystemServiceController extends ApiController
{
    /**
     * @var systemService
     */
    protected $systemService;

    /**
     * System -- user request .
     * @param SystemService $systemService
     */
    public function __construct(SystemService $systemService)
    {
        $this->systemService = $systemService;
    }

    public function userRequest(SystemServiceRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->systemService->createUserRequest($validatedData);

        if ($result->isErr()) {
            $err      = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message'], 204);
        } else {
            $data     = $result->unwrap();
            $response = fractal($data, new CommonTransformer)->respond();
        }

        return $response;
    }

    public function companyResponse(CompanyRequestDetailRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->systemService->createCompanyResponse($validatedData['request_id'], $validatedData['company_status'], $validatedData['message']);

        if ($result->isErr()) {
            $err      = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message'], 204);
        } else {
            $data     = $result->unwrap();
            $response = fractal($data, new CommonTransformer)->respond();
        }

        return $response;
    }
}
