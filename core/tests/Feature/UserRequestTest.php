<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRequestTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Test System Request.
     *
     * @return void
     */

    public function test_user_request()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $formData = [
            "customer_id" => "50",
            "cus_cl_address" => "",
            "cus_latitude" => "6.121212",
            "cus_longitude" => "12.234343",
            "cus_city" => "",
            "message" => "Please help me now",
            "vehicle_type" => "toyota",
            "vehicle_sub_type" => "corolla",
            "company_main_id" => "3",
        ];

        $this->withoutExceptionHandling();

        $this->json('POST', route('user.request'), $formData)
            ->assertStatus(200);
    }

    public function test_user_request_cancel()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $formData = [
            "request_id" => "66"
        ];

        $this->withoutExceptionHandling();

        $this->json('POST', route('user.cancel_request'), $formData)
            ->assertStatus(200);
    }
}
