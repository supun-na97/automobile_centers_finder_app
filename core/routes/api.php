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
    //login user related APIs
    Route::get('user/logged_user', 'App\Http\Controllers\Api\Authentication\AuthController@user');
    Route::post('user/update', 'App\Http\Controllers\Api\Authentication\AuthController@update');
    Route::get('user/logout', 'App\Http\Controllers\Api\Authentication\AuthController@logout');

    //Device Details related APIs
    Route::post('user/device_register', 'App\Http\Controllers\Api\Notification\DeviceController@registerDevice')->name('user.device_register');
    Route::get('user/current_device_details', 'App\Http\Controllers\Api\Notification\DeviceController@getCurrentDeviceDetail');

    //System service related APIs
    Route::post('user/system_request', 'App\Http\Controllers\Api\System\SystemServiceController@userRequest')->name('user.request');
    Route::post('user/system_response', 'App\Http\Controllers\Api\System\SystemServiceController@companyResponse')->name('user.response');
    Route::get('user/request', 'App\Http\Controllers\Api\System\SystemServiceController@userRelatedRequest');
    Route::get('company/request', 'App\Http\Controllers\Api\System\SystemServiceController@companyRelatedRequest')->name('company.request');
    Route::post('user/delete_request', 'App\Http\Controllers\Api\System\SystemServiceController@dropUserRequest');
    Route::post('user/user_request_by_id', 'App\Http\Controllers\Api\System\SystemServiceController@userRequestById');
    Route::post('user/company_request_by_id', 'App\Http\Controllers\Api\System\SystemServiceController@companyResponseById');
    Route::post('user/cancel_user_request', 'App\Http\Controllers\Api\System\SystemServiceController@cancelRequest')->name('user.cancel_request');

    //Company Related APIs
    Route::post('user/company_details', 'App\Http\Controllers\Api\Company\CompanyController@getCompanies')->name('user.company_details');
    Route::get('user/login_company_detail', 'App\Http\Controllers\Api\Company\CompanyController@loginCompany');
    Route::post('user/update_company', 'App\Http\Controllers\Api\Company\CompanyController@updateCompany');

    //Notification Related APIs
    Route::get('user/notification_list', 'App\Http\Controllers\Api\Notification\NotificationController@notificationList')->name('user.notification_list');
    Route::post('user/read_notification', 'App\Http\Controllers\Api\Notification\NotificationController@readNotification');

    //Rating and Popularity
    Route::post('user/popularity', 'App\Http\Controllers\Api\RatingAndPopularity\RatingAndPopularityController@popularity');
    Route::post('user/rating', 'App\Http\Controllers\Api\RatingAndPopularity\RatingAndPopularityController@rating');
    Route::get('user/get_popularity', 'App\Http\Controllers\Api\RatingAndPopularity\RatingAndPopularityController@getPopularity');

    //Active Status
    Route::get('user/active_status', 'App\Http\Controllers\Api\ActiveStatus\ActiveStatusController@activeStatus');
    Route::post('user/change_active_status', 'App\Http\Controllers\Api\ActiveStatus\ActiveStatusController@changeStatus');

    //Admin Related APIs
    //Company
    Route::post('company/register', 'App\Http\Controllers\Api\Admin\Company\CompanyController@createCompany');
    Route::get('company/all_company_details', 'App\Http\Controllers\Api\Admin\Company\CompanyController@getCompanies');

    //Province
    Route::get('province', 'App\Http\Controllers\Api\Admin\Province\ProvinceController@province');

    //District
    Route::get('district', 'App\Http\Controllers\Api\Admin\District\DistrictController@district');

    //City
    Route::get('city', 'App\Http\Controllers\Api\Admin\City\CityController@city');

    //System Reports
    Route::get('users_usage', 'App\Http\Controllers\Api\Admin\Report\ApplicationController@userAppUsage');
    Route::get('companies_usage', 'App\Http\Controllers\Api\Admin\Report\ApplicationController@companyAppUsage');
    Route::get('all_users_request', 'App\Http\Controllers\Api\Admin\Report\ApplicationController@allUserRequest');
});
