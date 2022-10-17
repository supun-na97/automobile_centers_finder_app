<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyResponseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test company response.
     *
     * @return void
     */

    public function test_company_response()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $responseData = [
            "request_id" => "52",
            "company_status" => 1,
            "message" => ""
        ];

        $this->withoutExceptionHandling();

        $this
            ->json('POST', route('user.response'), $responseData)
            ->assertStatus(204);
    }

    public function test_company_related_request_list()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $this->withoutExceptionHandling();

        $this
            ->get(route('company.request', $user->id))
            ->assertStatus(200);
    }
}
