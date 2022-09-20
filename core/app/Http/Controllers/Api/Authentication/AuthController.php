<?php

namespace App\Http\Controllers\Api\Authentication;

use App\Http\Controllers\Controller;
use App\Mail\RegisterMail;
use App\Models\ActiveStatus;
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
            'phone_number'      => 'required|min:10|max:10|string',
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
            'role'         => 1,
        ]);

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

            $user   = User::where('email', $request['email'])->firstOrFail();
            $userId = $user->id;

            //current status change to active
            if ($user->role == 2) {
                User::where('id', $userId)->update(['current_status' => ActiveStatus::ACTIVE]);
                Company::where('company_reg_id', $userId)->update(['current_status' => ActiveStatus::ACTIVE]);
            } else {
                User::where('id', $userId)->update(['current_status' => ActiveStatus::ACTIVE]);
            }

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
        $response = $request->user()->currentAccessToken()->delete();
        $userId = $request->user()->id;

        //current status change to offline
        if ($response == 1 && $request->user()->role == 2) {
            User::where('id', $userId)->update(['current_status' => ActiveStatus::OFFLINE]);
            Company::where('company_reg_id', $userId)->update(['current_status' => ActiveStatus::OFFLINE]);
        } else if ($response == 1) {
            User::where('id', $userId)->update(['current_status' => ActiveStatus::OFFLINE]);
        }

        return response()->json(['message' => 'Successfully logged out']);
    }

    //get login user details
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
            'phone_number'     => 'required|min:10|string|between:0,9'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validate Failed', 'errors' => $validator->errors()]);
        }

        $user = $request->user();

        $user->update([
            'name'         => $request->name,
            'phone_number' => $request->phone_number
        ]);

        return response()->json(['message' => 'Profile Successfully Updated',], 200);
    }
}
