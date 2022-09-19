<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertDataToProvincesTable extends Migration
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
                'name'       => 'Western',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'Central',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'East',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'Northcentral',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'North',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'Northwest',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'Sabaragamuwa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'South',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'       => 'Uva',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];

        DB::table('provinces')
            ->insert($provinces);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('provinces')
        ->whereIn('name', [
            'Western', 'Central', 'East', 'Northcentral', 'North', 'Northwest', 'Sabaragamuwa',
            'South', 'Uva'
        ])->delete();
    }
}
