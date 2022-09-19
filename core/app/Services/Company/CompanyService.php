<?php

namespace App\Services\Company;

use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class CompanyService
{
    public function getCompanyDetails($cityId, $companyId, $companyName)
    {
        $details = Company::whereNull('deleted_at');

        if (!empty($cityId)) {
            $details->where('city_id', $cityId);
        } else if(!empty($companyId)) {
            $details->where('id', $companyId);
        } else if(!empty($companyName)) {
            $details->where('name', $companyName);
        }

        $details = $details->get();

        return new Ok($details);
    }

    public function updateCompanyProfile($request)
    {
        $user   = Auth::user();
        $userId = $user->id;

        $currentData = Company::where('company_reg_id', $userId)->first();

        $name        = $request['name'] ?? $currentData['name'];
        $address1    = $request['address_1'] ?? $currentData['address_1'];
        $address2    = $request['address_2'] ?? $currentData['address_2'];
        $address3    = $request['address_3'] ?? $currentData['address_3'];
        $address4    = $request['address_4'] ?? $currentData['address_4'];
        $teleNo      = $request['telephone_number'] ?? $currentData['telephone_number'];
        $mobileNo    = $request['mobile_number'] ?? $currentData['mobile_number'];
        $latitude    = $request['latitude'] ?? $currentData['latitude'];
        $longitude   = $request['longitude'] ?? $currentData['longitude'];
        $cityId      = $request['city_id'] ?? $currentData['city_id'];
        $description = $request['description'] ?? $currentData['description'];
        $image       = $request['image'] ?? $currentData['image'];

        $responseData1 = Company::where('company_reg_id', $userId)
            ->update([
                'name'             => $name,
                'address_1'        => $address1,
                'address_2'        => $address2,
                'address_3'        => $address3,
                'address_4'        => $address4,
                'telephone_number' => $teleNo,
                'mobile_number'    => $mobileNo,
                'latitude'         => $latitude,
                'longitude'        => $longitude,
                'city_id'          => $cityId,
                'description'      => $description,
                'image'            => $image
            ]);

        $responseData2 = User::where('id', $userId)->update(['name' => $name, 'phone_number' => $mobileNo]);

        if ($responseData1 == 1 && $responseData2 == 1) {
            $response = new Ok("Company profile Update Successfully");
        } else {
            $response = new Err([
                'code'    => "update_profile_failed",
                'message' => "Company profile update failed"
            ]);
        }

        return $response;
    }

    public function getLoginCompanyDetail()
    {
        $user    = Auth::user();
        $userId  = $user->id;

        $details = Company::where('company_reg_id', $userId)->first();

        return new Ok($details);

    }
}
