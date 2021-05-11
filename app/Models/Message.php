<?php

namespace App\Models;

use A17\Twill\Models\Behaviors\HasBlocks;

use A17\Twill\Models\Behaviors\HasMedias;


use A17\Twill\Models\Model;

class Message extends Model 
{
    use HasBlocks, HasMedias;

    protected $fillable = [
        'published_date',
        'page',
        'article',
        
    ];
    
    
    public $mediasParams = [
        'screengrab_desktop' => [
            'default' => [
                [
                    'name' => 'default',
                    'ratio' => 12 / 9,
                ],
            ]
            
            
        ],
    ];
}
