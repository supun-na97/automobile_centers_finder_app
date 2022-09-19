<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertNotificationMessageStatusToNotificationMessageStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $statuses = [
            [
                'id'         => 1,
                'name'       => 'Ongoing',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 2,
                'name'       => 'Sending Failed',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 3,
                'name'       => 'Delivered',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 4,
                'name'       => 'Reject',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id'         => 5,
                'name'       => 'Sent',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];

        DB::table('notification_message_statuses')
            ->insert($statuses);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('notification_message_statuses')
        ->whereIn('name', ['Ongoing', 'Sending Failed', 'Delivered', 'Reject', 'Sent'])
        ->delete();
    }
}
