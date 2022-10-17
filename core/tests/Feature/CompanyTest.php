<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;

class CompanyTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_company_list_related_cities()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $responseData = [
            "city_id" => "1",
            "company_id" => "",
            "company_name" => ""
        ];

        $this->withoutExceptionHandling();

        $this
            ->json('POST', route('user.company_details'), $responseData)
            ->assertStatus(200);
    }
}
