<?php

namespace App\Http\Controllers\Api\System;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\System\SystemServiceRequest;
use App\Services\System\SystemService;

class SystemServiceController extends ApiController
{
    /**
     * @var systemService
     */
    protected $systemService;

    /**
     * User Device List .
     * @param userDeviceManagementService $userDeviceManagementService
     */
    public function __construct(SystemService $systemService)
    {
        $this->systemService = $systemService;
    }

    public function userRequest(SystemServiceRequest $request)
    {
        dd($request);
        $validatedData = $request->validated();
        $result = $this->systemService->createUserRequest($validatedData);

        if ($result->isErr()) {
            $err      = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message'], 204);
        } else {
            $response = $result->unwrap();
        }

        return $response;
    }
}
