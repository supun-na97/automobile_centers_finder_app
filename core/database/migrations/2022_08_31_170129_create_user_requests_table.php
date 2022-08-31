<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id');
            $table->string('cus_name');
            $table->text('cus_address');
            $table->string('cus_mobile_no');
            $table->string('cus_latitude');
            $table->string('cus_longitude');
            $table->string('cus_city')->nullable();
            $table->unsignedBigInteger('company_main_id');
            $table->string('com_name');
            $table->text('com_address')->nullable();
            $table->string('com_latitude')->nullable();
            $table->string('com_longitude')->nullable();
            $table->text('com_city')->nullable();
            $table->string('com_mobile_no')->nullable();
            $table->unsignedBigInteger('com_response_status');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('customer_id')->references('id')->on('users');
            $table->foreign('company_main_id')->references('id')->on('company_profiles');
            $table->foreign('com_response_status')->references('id')->on('user_request_statuses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_requests');
    }
}
