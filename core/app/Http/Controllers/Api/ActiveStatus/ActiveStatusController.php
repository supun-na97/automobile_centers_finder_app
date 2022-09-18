<?php

namespace App\Http\Controllers\Api\ActiveStatus;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\ActiveStatus\ChangeStatusRequest;
use App\Services\ActiveStatus\ActiveStatusService;
use App\Transformers\ActiveStatus\ActiveStatusTransformer;
use App\Transformers\CommonTransformer;

class ActiveStatusController extends ApiController
{
    /**
     * @var activeStatusService
     */
    protected $activeStatusService;

    /**
     * Active status service.
     * @param ActiveStatusService $activeStatusService
     */
    public function __construct(ActiveStatusService $activeStatusService)
    {
        $this->activeStatusService = $activeStatusService;
    }

    public function activeStatus()
    {
        $result = $this->activeStatusService->getStatus();
        $data   = $result->unwrap();

        return fractal($data, new ActiveStatusTransformer)->respond();
    }

    public function changeStatus(ChangeStatusRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->activeStatusService->changeActiveStatus($validatedData['status_id']);
        $data          = $result->unwrap();

        return fractal($data, new CommonTransformer)->respond();
    }
}
