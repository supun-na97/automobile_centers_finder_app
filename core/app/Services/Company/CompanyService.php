<?php

namespace App\Services\Company;

use App\Models\DeviceDetail;
use App\Models\SystemNotification;
use App\Models\SystemNotificationLog;
use App\Models\SystemNotificationStatus;
use Carbon\Carbon;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class CompanyService
{
    public function createNotification($userId, $content, $requestId)
    {
        $notification = SystemNotification::create([
           'user_id'       => $userId,
           'content'       => $content,
           'status'        => SystemNotificationStatus::ONGOING,
           'shedule_time'  => Carbon::now(),
           'attempt'       => +1,
           'request_id'    => $requestId
        ]);

        $notificationId = $notification['id'];

        //create notification log
        $this->createNotificationLog($userId, $content, $notificationId, SystemNotificationStatus::ONGOING);
    }

    public function createNotificationLog($userId, $content, $notificationId, $status)
    {
        $deviceDetail = DeviceDetail::where('user_id', $userId)->select('device_token')->orderBy('id', 'DESC')->first();
        $deviceToken  = $deviceDetail->device_token ?? NULL;

        $notification                  = new SystemNotificationLog();
        $notification->user_id         = $userId;
        $notification->notification_id = $notificationId;
        $notification->content         = $content;
        $notification->status          = $status;
        $notification->shedule_time    = Carbon::now();
        $notification->attempt         = +1;
        $notification->device_token    = $deviceToken;
        $notification->save();
    }
}
