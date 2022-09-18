<?php

namespace App\Services\Admin\Company;

use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
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
}
