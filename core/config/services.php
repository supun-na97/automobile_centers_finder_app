<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'mail' => [
        'domain' => env('MAIL_FROM_ADDRESS')
    ],

    'firebase' => [
        'id'             => env('APP_ID'),
        'url'            => env('FIREBASE_URL'),
        'key'            => env('SERVER_KEY'),
        'api_key'        => env('APIKEY'),
        'auth_domain'    => env('AUTH_DOMAIN'),
        'db_url'         => env('DATABASE_URL'),
        'project_id'     => env('PROJECT_ID'),
        'storage_bucket' => env('STORAGE_BUCKET'),
        'sender_id'      => env('MESSAGING_SENDER_ID'),
        'measurement_id' => env('MEASUREMENT_ID')
    ]

];
