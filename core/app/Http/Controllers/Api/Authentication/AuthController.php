<?php

namespace App\Http\Controllers\Api\Authentication;

use App\Http\Controllers\Controller;
use App\Mail\RegisterMail;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name'              => 'required|string|max:255',
            'email'             => 'required|string|email|max:255|unique:users',
            'password'          => 'required|string|min:8',
            'phone_number'      => 'required|min:10|string|between:0,9',
            'role'              => 'required|integer|between:1,3',
            //company register validation
            'address_1'         => 'nullable|max:255|string',
            'address_2'         => 'nullable|max:255|string',
            'address_3'         => 'nullable|max:255|string',
            'address_4'         => 'nullable|max:255|string',
            'telephone_number'  => 'nullable|string|min:10|max:10',
            'latitude'          => 'nullable|max:255|string',
            'longitude'         => 'nullable|max:255|string',
            'city_id'           => 'nullable|numeric',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'message' => 'Validate Failed',
                'errors' => $validatedData->errors()
            ]);
        }

        $user = User::create([
            'name'         => $request->name,
            'email'        => $request->email,
            'password'     => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'role'         => $request->role,
        ]);

        if ($user->role == '2') {
            Company::create([
                'name'             => $request->name,
                'telephone_number' => $request->telephone_number ?? NULL,
                'mobile_number'    => $request->phone_number,
                'role'             => $request->role,
                'address_1'        => $request->address_1 ?? NULL,
                'address_2'        => $request->address_2 ?? NULL,
                'address_3'        => $request->address_3 ?? NULL,
                'address_4'        => $request->address_4 ?? NULL,
                'company_reg_id'   => $user->id,
                'latitude'         => $request->latitude ?? NULL,
                'longitude'        => $request->longitude ?? NULL,
                'city_id'          => $request->city_id,
            ]);
        }

        //create token
        $token = $user->createToken('auth_token')->plainTextToken;

        //send a mail after the successfully registration.
        Mail::to(request('email'))->send(new RegisterMail($user));

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user_role'    => $user->role
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!is_null($credentials)) {
            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid login details'], 401);
            }

            $user = User::where('email', $request['email'])->firstOrFail();

            //create login token
            $token = $user->createToken('auth_token')->plainTextToken;

            $response = response()->json([
                'access_token' => $token,
                'token_type'   => 'Bearer',
                'role'         => $user->role
            ]);
        } else {
            $response = response()->json(['message' => 'Empty Values'], 404);
        }

        return $response;
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return [
            'user' => $user,
        ];
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'             => 'required|string|max:255',
            'phone_number'     => 'required|min:10|string|between:0,9',
            'role'             => 'required|integer|between:1,3',
            //company update validation
            'address_1'        => 'nullable|max:255|string',
            'address_2'        => 'nullable|max:255|string',
            'address_3'        => 'nullable|max:255|string',
            'address_4'        => 'nullable|max:255|string',
            'telephone_number' => 'nullable|string|min:10|max:10',
            'latitude'         => 'nullable|max:255|string',
            'longitude'        => 'nullable|max:255|string',
            'city_id'          => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validate Failed', 'errors' => $validator->errors()]);
        }

        $user = $request->user();

        $user->update([
            'name'         => $request->name,
            'phone_number' => $request->phone_number,
            'role'         => $request->role,
        ]);

        if ($user->role == '2') {
            $query = Company::where('company_reg_id', $user->id)->first();

            Company::where('company_reg_id', $user->id)
                ->update([
                    'name'             => $request->name ?? $query->name,
                    'telephone_number' => $request->telephone_number ?? $query->telephone_number,
                    'mobile_number'    => $request->phone_number ?? $query->phone_number,
                    'address_1'        => $request->address_1 ?? $query->address_1,
                    'address_2'        => $request->address_2 ?? $query->address_2,
                    'address_3'        => $request->address_3 ?? $query->address_3,
                    'address_4'        => $request->address_4 ?? $query->address_4,
                    'company_reg_id'   => $user->id,
                    'latitude'         => $request->latitude ?? $query->latitude,
                    'longitude'        => $request->longitude ?? $query->longitude,
                    'city_id'          => $request->city_id ?? $query->city_id,
                ]);
        }

        return response()->json(['message' => 'Profile Successfully Updated',], 200);
    }
}
