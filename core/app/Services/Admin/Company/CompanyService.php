<?php

namespace App\Services\Admin\Company;

use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;
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

        $images = $request['image'];

        //save image to storage
        if (!empty($images)) {
            $fileName   = time() . '.' . $images->getClientOriginalExtension();
            $img        = Image::make($images->getRealPath());
            $img->stream(); // <-- Key point

            Storage::disk('public')->put('images/company/' . $fileName, $img, 'public');
        } else {
            $fileName   = NULL;
        }

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
            'description'      => $request['description'],
            'image'            =>  $fileName
        ]);

        return new Ok("Company registration successfully");
    }

    public function getAllCompanies()
    {
        $companies = Company::where('is_active', '=', 1)->get();

        foreach($companies as $item) {
            $item['image'] = url('storage/images/company/' . $item['image']);
        }

        return new Ok($companies);
    }
}
