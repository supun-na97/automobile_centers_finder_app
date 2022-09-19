<?php

namespace App\Services\Firebase;

use App\Models\DeviceDetail;

class FirebaseService
{
    public function sendWebNotification($id, $title, $body)
    {
        $fcmToken = DeviceDetail::whereNotNull('device_token')
        ->where('user_id', $id)
        ->where('is_active', '=', '1')
        ->select('id', 'user_id', 'device_token')
        ->pluck('device_token')
        ->all();

        if (!is_null($fcmToken)) {
            $data = [
                "registration_ids" => $fcmToken,
                "notification" => [
                    "title" => $title,
                    "body"  => $body,
                    "icon"  => env('NOTIFICATION_ICON'),
                ]
            ];

            $encodedData = json_encode($data);

            $headers = [
                'Authorization:key=' . config('services.firebase.key'),
                'Content-Type: application/json',
            ];

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, config('services.firebase.url'));
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
            // Disabling SSL Certificate support temporarly
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedData);
            // Execute post
            $result = curl_exec($ch);
            if ($result === FALSE) {
                die('Curl failed: ' . curl_error($ch));
            }
            // Close connection
            curl_close($ch);
            // FCM response
            $final = json_decode($result);

            if ($final->success == '1') { //success status of send notification
                $response = [
                    'message_status' => 1,
                    'msg_id'         => $final->results[0]->message_id,
                ];
            } else {
                $response = [
                    'message_status' => 0,
                    'msg_id'         => 0,
                ];
            }
        } else {
            $response = [
                'message_status' => 0,
                'msg_id'         => 0,
            ];
        }

        return $response;
    }
}
