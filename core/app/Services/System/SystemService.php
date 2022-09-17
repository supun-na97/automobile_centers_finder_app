<?php

namespace App\Services\System;

use App\Models\City;
use App\Models\Company;
use App\Models\SystemNotificationStatus;
use App\Models\User;
use App\Models\UserRequest;
use App\Services\Notification\NotificationService;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class SystemService
{
    /**
     * @var notificationService
     */
    protected $notificationService;

    /**
     * Notification access .
     * @param NotificationService $notificationService
     */
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function createUserRequest($request)
    {
        $customerId     = $request['customer_id'];
        $cusCLAddress   = $request['cus_cl_address'] ?? NULL;
        $cusLatitude    = $request['cus_latitude'];
        $cusLongitude   = $request['cus_longitude'];
        $cusCity        = $request['cus_city'] ?? NULL;
        $message        = $request['message'] ?? "I need your help to repair my vehicle";
        $vehicleType    = $request['vehicle_type'] ?? NULL;
        $vehicleSubType = $request['vehicle_sub_type'] ?? NULL;
        $companyId      = $request['company_id'];

        $customerDetails = User::select('name', 'phone_number')->where('id', $customerId)->first();
        $companyDetails  = Company::where('id', $companyId)->first();

        if (!is_null($customerDetails) && !is_null($companyDetails)) {
            $cityDetails    = City::where('city_id', $companyDetails->city_id)->first();

            $customerName   = $customerDetails->name;
            $customerTeleNo = $customerDetails->phone_number;
            $companyName    = $companyDetails->name;
            $companyAddress = $companyDetails->address_1 . ',' . $companyDetails->address_2 . ',' . $companyDetails->address_3 ?? "";
            $companyTeleNo  = $companyDetails->mobile_number;
            $comLatitude    = $companyDetails->latitude;
            $comLongitude   = $companyDetails->longitude;
            $comCity        = $cityDetails->name;

            $requestData = UserRequest::create([
                'customer_id'      => $customerId,
                'cus_name'         => $customerName,
                'cus_cl_address'   => $cusCLAddress,
                'cus_mobile_no'    => $customerTeleNo,
                'cus_latitude'     => $cusLatitude,
                'cus_longitude'    => $cusLongitude,
                'cus_city'         => $cusCity,
                'message'          => $message,
                'vehicle_type'     => $vehicleType,
                'vehicle_sub_type' => $vehicleSubType,
                'company_main_id'  => $companyId,
                'com_name'         => $companyName,
                'com_address'      => $companyAddress,
                'com_latitude'     => $comLatitude,
                'com_longitude'    => $comLongitude,
                'com_city'         => $comCity,
                'com_mobile_no'    => $companyTeleNo
            ]);

            $requestId = $requestData['id'];

            $companyData = Company::where('id', $companyId)->select('company_reg_id')->first();
            $companyId   = $companyData->company_reg_id;

            //create Notification for user request
            $responseData = $this->notificationService->createNotification($companyId, $message, $requestId);

            if ($responseData->isOk()) {
                UserRequest::where('id', $requestId)->update(['request_status' => SystemNotificationStatus::SENT]);

                $response = new Ok("Request successfully created!");
            } else {
                $response = new Err([
                    'code'    => 'request_failed',
                    'message' => 'Request failed'
                ]);
            }
        } else {
            $response = new Err([
                'code'    => 'request_failed',
                'message' => 'Request failed'
            ]);
        }

        return $response;
    }
}
