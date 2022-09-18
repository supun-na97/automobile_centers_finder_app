<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCurrentStatusToCompanyProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_profiles', function (Blueprint $table) {
            $table->unsignedBigInteger('current_status')->default(1);
            $table->foreign('current_status')->references('id')->on('active_statuses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_profiles', function (Blueprint $table) {
            $table->dropColumn('current_status');
        });
    }
}
