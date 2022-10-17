<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_notification_list()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $this->withoutExceptionHandling();

        $this
            ->get(route('user.notification_list', $user->id))
            ->assertStatus(200);
    }
}
