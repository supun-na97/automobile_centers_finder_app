<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRequestIdToNotificationMessageLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('notification_message_logs', function (Blueprint $table) {
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('user_requests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('notification_message_logs', function (Blueprint $table) {
            $table->dropColumn('request_id');
        });
    }
}
