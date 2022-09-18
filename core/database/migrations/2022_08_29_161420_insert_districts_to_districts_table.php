<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InsertDistrictsToDistrictsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $provinces = [
            [
                'name'        => 'Kalutara',
                'province_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Colombo',
                'province_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Gampaha',
                'province_id' => '1',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kandy',
                'province_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Matale',
                'province_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Nuwara Eliya',
                'province_id' => '2',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Ampara',
                'province_id' => '3',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Batticaloa',
                'province_id' => '3',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Trincomalee',
                'province_id' => '3',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Anuradhapura',
                'province_id' => '4',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Polonnaruwa',
                'province_id' => '4',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Jaffna',
                'province_id' => '5',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kilinochchi',
                'province_id' => '5',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Mannar',
                'province_id' => '5',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Mullaitivu',
                'province_id' => '5',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Vavuniya',
                'province_id' => '5',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kurunegala',
                'province_id' => '6',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Puttalam',
                'province_id' => '6',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Kegalle',
                'province_id' => '7',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Ratnapura',
                'province_id' => '7',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Galle',
                'province_id' => '8',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Hambantota',
                'province_id' => '8',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Matara',
                'province_id' => '8',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Badulla',
                'province_id' => '9',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
            [
                'name'        => 'Moneragala',
                'province_id' => '9',
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now()
            ],
        ];

        DB::table('districts')
            ->insert($provinces);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('districts')
            ->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])
            ->delete();
    }
}
