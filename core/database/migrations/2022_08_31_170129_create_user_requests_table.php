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
            $table->text('cus_cl_address')->nullable();
            $table->string('cus_mobile_no');
            $table->string('cus_latitude');
            $table->string('cus_longitude');
            $table->string('cus_city')->nullable();
            $table->text('message')->nullable();
            $table->string('vehicle_type')->nullable();
            $table->string('vehicle_sub_type')->nullable();
            $table->unsignedBigInteger('company_main_id');
            $table->string('com_name');
            $table->text('com_address')->nullable();
            $table->string('com_latitude')->nullable();
            $table->string('com_longitude')->nullable();
            $table->string('com_city')->nullable();
            $table->string('com_mobile_no')->nullable();
            $table->integer('com_response_status')->default(8);
            $table->integer('request_status')->default(6);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('customer_id')->references('id')->on('users');
            $table->foreign('company_main_id')->references('id')->on('company_profiles');
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
