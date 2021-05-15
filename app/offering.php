<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class offering extends Model
{
    //
    protected $table = 'offerings';
    protected $fillable = [
        'full_name', 'email'
    ];

}
