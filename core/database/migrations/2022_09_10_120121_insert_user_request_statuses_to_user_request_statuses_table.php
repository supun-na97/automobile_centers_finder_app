<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertUserRequestStatusesToUserRequestStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $types = [
            [
                'id'         => 1,
                'name'       => 'Accept',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 2,
                'name'       => 'Busy',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 3,
                'name'       => 'Not responding',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 4,
                'name'       => 'Close',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 5,
                'name'       => 'Done',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 6,
                'name'       => 'Ongoing',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 7,
                'name'       => 'Reject',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 8,
                'name'       => 'Pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 9,
                'name'       => 'Sending Failed',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 10,
                'name'       => 'Delivered',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ];

        DB::table('user_request_statuses')
            ->insert($types);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('user_request_statuses')
        ->whereIn('name', [
            'Accept', 'Busy', 'Not responding', 'Close', 'Done', 'Ongoing', 'Reject', 'Pending',
            'Sending Failed', 'Delivered'
        ])->delete();
    }
}
