<?php

namespace Tests\Unit;

use App\Services\System\SystemService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $data = (new SystemService())->getUserRelatedRequest();
        $this->assertEquals(0, $data);
        // $this->assertTrue(true);
    }
}
