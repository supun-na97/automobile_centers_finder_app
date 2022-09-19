<?php

namespace App\Services\System;

use App\Models\City;
use App\Models\Company;
use App\Models\SystemNotificationStatus;
use App\Models\User;
use App\Models\UserRequest;
use App\Services\Notification\NotificationService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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

    public function createCompanyResponse($requestId, $companyStatus, $message)
    {
        $requestResponse = UserRequest::where('id', $requestId)->update(['com_response_status' => $companyStatus]);

        if ($requestResponse == 1) {
            $request      = UserRequest::where('id', $requestId)->select('customer_id', 'cus_name', 'com_name')->first();
            $customerId   = $request['customer_id'];
            $customerName = $request['cus_name'];
            $companyName  = $request['com_name'];

            //push notification message details
            switch ($companyStatus) {
                case "1":
                    $content = 'Hi ' . $customerName . '! ' . $companyName . ' is approved your Service request. They will contact you soon.';
                    break;
                case "2":
                    $content = 'Hi ' . $customerName . '! ' . $companyName . ' is busy Right now.';
                    break;
                default:
                    $content = 'Hi ' . $customerName . '! ' . $companyName . ' is not responding this time.';
            }

            $text    = $message ?? $content;

            //create Notification for company response
            $this->notificationService->createNotification($customerId, $text, $requestId);

            $response = new Ok("Response successfully");
        } else {
            $response = new Err([
                'code'    => "create_response_failed",
                'message' => "create response failed"
            ]);
        }

        return $response;
    }

    public function getUserRelatedRequest()
    {
        $user    = Auth::user();
        $userId  = $user->id;

        $details = UserRequest::where('customer_id', $userId)->whereNull('deleted_at')->get();

        return new Ok($details);
    }

    public function deleteRequest($id)
    {
        $user    = Auth::user();
        $userId  = $user->id;

        $details = UserRequest::where([
            'id'          => $id,
            'customer_id' => $userId
        ])->whereNull('deleted_at')
        ->update([
            'deleted_at'  => Carbon::now()
        ]);

        if ($details == 1) {
            $response = new Ok("Request deleted");
        } else {
            $response = new Err([
                'code'    => "request_delete_failed",
                'message' => "Request delete failed"
            ]);
        }

        return $response;
    }

    public function getCompanyRelatedRequest()
    {
        $details = [];
        $user    = Auth::user();
        $userId  = $user->id;

        $company   = Company::where('company_reg_id', $userId)->whereNull('deleted_at')->first();
        $companyId = $company['id'];

        if (!empty($company)) {
            $details = UserRequest::where('company_main_id', $companyId)->whereNull('deleted_at')->get();
        }

        return new Ok($details);
    }
}
