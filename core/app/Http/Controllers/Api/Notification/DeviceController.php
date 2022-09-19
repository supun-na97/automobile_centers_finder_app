<?php

namespace App\Http\Controllers\Api\Notification;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Notification\DeviceRegistrationRequest;
use App\Services\Notification\DeviceService;
use App\Transformers\Notification\DeviceDetailTransformer;
use App\Transformers\Notification\DeviceRegistrationTransformer;

class DeviceController extends ApiController
{
    /**
     * @var deviceService
     */
    protected $deviceService;

    /**
     * User Device List .
     * @param DeviceService $deviceService
     */
    public function __construct(DeviceService $deviceService)
    {
        $this->deviceService = $deviceService;
    }

    public function registerDevice(DeviceRegistrationRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->deviceService->saveUserDeviceDetails($validatedData);  //call service

        if ($result->isErr()) {
            $err      = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message']);
        } else {
            $data     = $result->unwrap();
            $response = fractal($data, new DeviceRegistrationTransformer)->respond();
        }

        return $response;
    }

    public function getCurrentDeviceDetail()
    {
        $result = $this->deviceService->getCurrentLoggedDeviceDetails();
        $data   = $result->unwrap();

        return fractal($data, new DeviceDetailTransformer)->respond();
    }
}
