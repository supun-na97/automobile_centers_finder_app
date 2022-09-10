<?php

namespace App\Services\Admin\Company;

use App\Models\DeviceDetail;
use App\Models\SystemNotification;
use App\Models\SystemNotificationLog;
use App\Models\SystemNotificationStatus;
use Carbon\Carbon;
use App\Models\Company;
use App\Models\User;
use App\Mail\RegisterMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class CompanyService
{
    public function companyRegistration($request)
    {
        $user = User::create([
            'name'         => $request['name'],
            'email'        => $request['email'],
            'password'     => Hash::make($request['password']),
            'phone_number' => $request['phone_number'],
            'role'         => 2,
        ]);

        Company::create([
            'name'             => $request['name'],
            'telephone_number' => $request['telephone_number'] ?? NULL,
            'mobile_number'    => $request['phone_number'],
            'role'             => $user->role,
            'address_1'        => $request['address_1'] ?? NULL,
            'address_2'        => $request['address_2'] ?? NULL,
            'address_3'        => $request['address_3'] ?? NULL,
            'address_4'        => $request['address_4'] ?? NULL,
            'company_reg_id'   => $user->id,
            'latitude'         => $request['latitude'] ?? NULL,
            'longitude'        => $request['longitude'] ?? NULL,
            'city_id'          => $request['city_id'],
        ]);

        return new Ok("Company registration successfully");
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
