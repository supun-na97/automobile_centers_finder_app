<?php

namespace App\Services\Notification;

use App\Models\DeviceDetail;
use App\Models\SystemNotification;
use App\Models\SystemNotificationLog;
use App\Models\SystemNotificationStatus;
use App\Services\Firebase\FirebaseService;
use Carbon\Carbon;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class NotificationService
{
    public function createNotification($userId, $content, $requestId)
    {
        if (!is_null($userId) && !is_null($content) && !is_null($requestId)) {
            $notification = SystemNotification::create([
                'user_id'       => $userId,
                'content'       => $content,
                'status'        => SystemNotificationStatus::ONGOING,
                'shedule_time'  => Carbon::now(),
                'attempt'       => +1,
                'role_id'       => 2,
                'request_id'    => $requestId
             ]);

             $notificationId = $notification['id'];

             //create notification log
             $this->createNotificationLog($userId, $content, $notificationId, SystemNotificationStatus::ONGOING, $requestId);

             //send pushback notification to device -- push to firebase
             $pushNotification = new FirebaseService;
             $responseData     = $pushNotification->sendWebNotification($userId, "From client to center", $content);

             if ($responseData['message_status'] == 1) {
                SystemNotification::where('id', $notificationId)
                ->update([
                    'status' => SystemNotificationStatus::SENT,
                    'msg_id' => $responseData['msg_id']
                ]);

                SystemNotificationLog::where('notification_id', $notificationId)
                ->update([
                    'status' => SystemNotificationStatus::SENT,
                    'msg_id' => $responseData['msg_id']
                ]);
             } else {
                SystemNotification::where('id', $notificationId)
                ->update([
                    'status' => SystemNotificationStatus::SENDINGFAILED,
                    'msg_id' => $responseData['msg_id']
                ]);
                SystemNotificationLog::where('notification_id', $notificationId)
                ->update([
                    'status' => SystemNotificationStatus::SENDINGFAILED,
                    'msg_id' => $responseData['msg_id']
                ]);
             }

            $response = new Ok('success');
        } else {
            $response = new Err([
                'code' => 'create_notification_failed',
                'message' => 'notification create failed'
            ]);
        }

        return $response;
    }

    public function createNotificationLog($userId, $content, $notificationId, $status, $requestId)
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
        $notification->request_id      = $requestId;
        $notification->save();
    }
}
