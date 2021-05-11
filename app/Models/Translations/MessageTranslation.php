<?php

namespace App\Models\Translations;

use A17\Twill\Models\Model;
use App\Models\Message;

class MessageTranslation extends Model
{
    protected $baseModuleModel = Message::class;
}
