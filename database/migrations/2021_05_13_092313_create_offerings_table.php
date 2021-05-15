<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOfferingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       /* Schema::create('offerings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('full_name',200)->nullable();
            $table->string('email',200)->nullable();
            $table->string('phone',200)->nullable();
            $table->decimal('amount', 5, 2)->nullable();
            $table->string('donation_type')->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->string('bank')->nullable();
            // add those 2 columns to enable publication timeframe fields (you can use publish_start_date only if you don't need to provide the ability to specify an end date)
           

            
        });

        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('first_name',200)->nullable();
            $table->string('last_name',200)->nullable();
            $table->string('contact_email',200)->nullable();
            $table->string('contact_phone',200)->nullable();
           
            $table->text('comment')->nullable();
          
            // add those 2 columns to enable publication timeframe fields (you can use publish_start_date only if you don't need to provide the ability to specify an end date)
           

            
        });

        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      //  Schema::dropIfExists('offerings');
      //  Schema::dropIfExists('feedbacks');
    }
}
