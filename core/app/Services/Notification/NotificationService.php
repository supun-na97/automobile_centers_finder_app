<?php

namespace App\Services\Notification;

use App\Models\DeviceDetail;
use App\Models\SystemNotification;
use App\Models\SystemNotificationLog;
use App\Models\SystemNotificationStatus;
use App\Services\Firebase\FirebaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
             $this->createNotificationLog($userId, $content, $notificationId, SystemNotificationStatus::ONGOING, $requestId, NULL);

             //send pushback notification to device -- push to firebase
             $pushNotification = new FirebaseService;
             $title            = "Auto-mobile center App";
             $responseData     = $pushNotification->sendWebNotification($userId, $title, $content);

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
                'code'    => 'create_notification_failed',
                'message' => 'notification create failed'
            ]);
        }

        return $response;
    }

    public function createNotificationLog($userId, $content, $notificationId, $status, $requestId, $isRead)
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
        $notification->is_read         = $isRead ?? SystemNotification::UNREAD;
        $notification->device_token    = $deviceToken;
        $notification->request_id      = $requestId;
        $notification->save();
    }

    public function getNotificationList()
    {
        $user   = Auth::user();
        $userId = $user->id;

        $notification = SystemNotification::where([
            'user_id' => $userId,
            'is_read' => 0
        ])->whereIn('status', [
            SystemNotificationStatus::ONGOING,
            SystemNotificationStatus::SENT,
            SystemNotificationStatus::SENDINGFAILED
        ])->get();

        $notification['notification'] = $notification->map(function ($item) {
            return
                [
                    'notification_id'  => $item->id,
                    'message_id'       => $item->msg_id,
                    'request_id'       => $item->request_id,
                    'content'          => $item->content
                ];
        });

        $notification['count'] = $notification['notification']->count();
        $details['details']    = $notification;

        return new Ok($details);
    }

    public function readNotificationMessage($notificationId)
    {
        $user     = Auth::user();
        $userCode = $user->id;

        $readNotification = SystemNotification::where('id', $notificationId)
        ->where('user_id', $userCode)
        ->update([
            'is_read'    => SystemNotification::READ,
            'updated_at' => Carbon::now()
        ]);

        $notificationDetails = SystemNotification::where('id', $notificationId)->first();

        // $userId, $content, $notificationId, $status, $requestId
        $userId    = $notificationDetails['user_id'];
        $content   = $notificationDetails['content'];
        $isRead    = SystemNotification::READ;
        $status    = $notificationDetails['status'];
        $requestId = $notificationDetails['request_id'];

        //create notification log
        $this->createNotificationLog($userId, $content, $notificationId, $status, $requestId, $isRead);

        if ($readNotification == 1) {
            $response = new Ok("notification read successfully");
        } else {
            $response = new Err([
                'code'    => 'read_notification_failed',
                'message' => 'notification read failed'
            ]);
        }

        return $response;
    }
}
