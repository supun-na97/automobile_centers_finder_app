<?php

namespace App\Services\Notification;

use App\Models\DeviceDetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Agent\Agent;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class DeviceService
{
    public function saveUserDeviceDetails($request)
    {
        $agent = new Agent();

        $device     = $agent->device();
        $browser    = $agent->browser();
        $platform   = $agent->platform();
        $deviceType = false;

        $deviceDetails = new DeviceDetail();

        $deviceDetails->user_id      = $request['user_id'];
        $deviceDetails->device_ip    = \Request::ip();
        $deviceDetails->device_token = $request['device_token'];

        $mobileResult   = $agent->isMobile();
        if ($mobileResult) {
            $deviceType = "Mobile";
        }

        $desktopResult  = $agent->isDesktop();
        if ($desktopResult) {
            $deviceType = "Desktop";
        }

        $tabletResult   = $agent->isTablet();
        if ($tabletResult) {
            $deviceType = "Tablet";
        }

        $deviceDetails->device_detail = [
            'device'           => $device,
            'device_type'      => $deviceType,
            'browser'          => $browser,
            'browser_version'  => $agent->version($browser),
            'platform'         => $platform,
            'platform_version' => $agent->version($platform)
        ];

        $deviceDetails->save();

        $userCode = $deviceDetails->user_id;

        $currentUser = DeviceDetail::where('user_id', $userCode)->first();

        // if already saved the another device, disable it.
        if (!is_null($currentUser)) {
            $this->setAlterDevice($userCode);
        }

        if (!is_null($deviceDetails)) {
            $response = new Ok($deviceDetails);
        } else {
            $response = new Err([
                'code'    => 'save_user_device_details_failed',
                'message' => 'Save device details failed'
            ]);
        }

        return $response;
    }

    public function getCurrentLoggedDeviceDetails()
    {
        $user   = Auth::user();
        $userId = $user->id;

        $isUserDeviceRegistered = DeviceDetail::where(
            [
                'user_id'   => $userId,
                'is_active' => 'true'
            ]
        )->get();

        return new Ok($isUserDeviceRegistered);
    }

    //disable existing devices
    public function setAlterDevice($userCode)
    {
        $newDevice = DeviceDetail::where('user_id', "=", $userCode)
            ->orderBy('id', 'DESC')
            ->first();

        $newDeviceDate = $newDevice->created_at;

        DeviceDetail::where([
            'user_id'   => $userCode,
            'is_active' => 'true'
        ])->where(
            'created_at', '!=', $newDeviceDate
        )->update([
            'is_active'  => false,
            'deleted_at' => Carbon::now()
        ]);
    }
}
