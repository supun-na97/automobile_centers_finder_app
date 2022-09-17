<?php

namespace App\Http\Controllers\Api\Notification;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Notification\ReadNotificationRequest;
use App\Services\Notification\NotificationService;
use App\Transformers\Notification\GetNotificationTransformer;

class NotificationController extends ApiController
{
    /**
     * @var notificationService
     */
    protected $notificationService;

    /**
     * Notification List .
     * @param NotificationService $notificationService
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function notificationList()
    {
        $result = $this->notificationService->getNotificationList();
        $data   = $result->unwrap();

        return fractal($data, new GetNotificationTransformer)->respond();
    }

    public function readNotification(ReadNotificationRequest $request)
    {
        $validatedData = $request->validated();
        $result = $this->notificationService->readNotificationMessage($validatedData['notification_id']);

        if ($result->isErr()) {
            $err = $result->unwrapErr();
            $response = static::errorResponse($err['code'], $err['message']);
        } else {
            $response = $result->unwrap();
        }

        return $response;
    }
}
