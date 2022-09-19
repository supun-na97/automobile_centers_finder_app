<?php

namespace App\Http\Controllers\Api\System;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\System\CompanyRequestDetailRequest;
use App\Http\Requests\System\DeleteUserRequest;
use App\Http\Requests\System\SystemServiceRequest;
use App\Services\System\SystemService;
use App\Transformers\CommonTransformer;
use App\Transformers\System\CompanyRelatedRequestTransformer;
use App\Transformers\System\SystemServiceRequestTransformer;

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

    public function userRelatedRequest()
    {
        $result = $this->systemService->getUserRelatedRequest();
        $data   = $result->unwrap();

        return fractal($data, new SystemServiceRequestTransformer)->respond();
    }

    public function dropUserRequest(DeleteUserRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->systemService->deleteRequest($validatedData['request_id']);

        if ($result->isErr()) {
            $err      = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message'], 204);
        } else {
            $data     = $result->unwrap();
            $response = fractal($data, new CommonTransformer)->respond();
        }

        return $response;
    }

    public function companyRelatedRequest()
    {
        $result = $this->systemService->getCompanyRelatedRequest();
        $data   = $result->unwrap();

        return fractal($data, new CompanyRelatedRequestTransformer)->respond();
    }
}
