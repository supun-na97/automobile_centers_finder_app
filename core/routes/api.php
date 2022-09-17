<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('version', function () {
    return response()->json(['version' => app_version_string()]);
});

Route::group([
    'prefix' => 'auth',
    'headers' => [
        'Accept' => 'application/json',
    ]
], function () {
    //User Authentication
    Route::post('user/login', 'App\Http\Controllers\Api\Authentication\AuthController@login');
    Route::post('user/signup', 'App\Http\Controllers\Api\Authentication\AuthController@register');
});

Route::group([
    'middleware' => 'auth:api',
    'headers' => [
        'Accept' => 'application/json',
    ]
], function () {
    // login user related APIs
    Route::get('user/logged_user', 'App\Http\Controllers\Api\Authentication\AuthController@user');
    Route::post('user/update', 'App\Http\Controllers\Api\Authentication\AuthController@update');
    Route::get('user/logout', 'App\Http\Controllers\Api\Authentication\AuthController@logout');

    // Device Details related APIs
    Route::post('user/device_register', 'App\Http\Controllers\Api\Notification\DeviceController@registerDevice');
    Route::post('user/current_device_details', 'App\Http\Controllers\Api\Notification\DeviceController@getCurrentDeviceDetail');

    // System service related APIs
    Route::post('user/system_request', 'App\Http\Controllers\Api\System\SystemServiceController@userRequest');
    Route::post('user/system_response', 'App\Http\Controllers\Api\System\SystemServiceController@companyResponse');

    //Company Related APIs
    Route::post('user/company_details', 'App\Http\Controllers\Api\Company\CompanyController@getCompanies');

    //Notification Related APIs
    Route::get('user/notification_list', 'App\Http\Controllers\Api\Notification\NotificationController@notificationList');
    Route::post('user/read_notification', 'App\Http\Controllers\Api\Notification\NotificationController@readNotification');

    //Admin Related APIs
    //Company
    Route::post('company/signup', 'App\Http\Controllers\Api\Admin\Company\CompanyController@createCompany');
});
