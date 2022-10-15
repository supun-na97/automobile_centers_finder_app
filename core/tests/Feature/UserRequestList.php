<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRequestList extends TestCase
{
    use RefreshDatabase;
    /**
     * Test System Request.
     *
     * @return void
     */

    public function test_user_request()
    {
        $formData = [
            "customer_id" => "50",
            "cus_cl_address" => "",
            "cus_latitude" => "6.121212",
            "cus_longitude" => "12.234343",
            "cus_city" => "",
            "message" => "Please help me now",
            "vehicle_type" => "toyota",
            "vehicle_sub_type" => "corolla",
            "company_main_id" => "4",
        ];

        $this->withExceptionHandling();

        $this->json('POST', route('user.request'), $formData)
        ->assertStatus(200)
        ->assertJson(['data' => $formData]);
    }

    public function test_company_response()
    {
        $responseData = [
            "request_id" => "51",
             "company_status" => 1,
             "message" => ""
        ];
        dd($responseData);
        $this->withExceptionHandling();

        $this->json('POST', route('user.response'), $responseData)
        ->assertStatus(200)
        ->assertJson(['data' => $responseData]);
    }
}
