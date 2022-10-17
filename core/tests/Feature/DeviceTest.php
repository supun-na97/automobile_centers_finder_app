<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeviceTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_device_registration()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $responseData = [
            "user_id" => "1",
            "device_token" => "c99S1rSzab4Dn6LAOJzlTI:APA91bEuexqcdv2D"
        ];

        $this->withoutExceptionHandling();

        $this
            ->json('POST', route('user.device_register'), $responseData)
            ->assertStatus(200);
    }
}
