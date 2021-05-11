<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMessagesTables extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            // this will create an id, a "published" column, and soft delete and timestamps columns
            createDefaultTableFields($table);
            
          //  $table->integer('position')->unsigned()->nullable();
            $table->string('page',200)->nullable();
            $table->string('article')->nullable();
            // add those 2 columns to enable publication timeframe fields (you can use publish_start_date only if you don't need to provide the ability to specify an end date)
             $table->timestamp('published_date')->nullable();
            // $table->timestamp('publish_end_date')->nullable();
        });

       

       
    }

    public function down()
    {
       
        Schema::dropIfExists('messages');
    }
}
