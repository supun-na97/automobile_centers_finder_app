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
    'middleware' => 'auth:api'
], function () {
    // login user related APIs
    Route::get('user/logged_user', 'App\Http\Controllers\Api\Authentication\AuthController@user');
    Route::post('user/update', 'App\Http\Controllers\Api\Authentication\AuthController@update');
    Route::get('user/logout', 'App\Http\Controllers\Api\Authentication\AuthController@logout');
});
