<?php

namespace App\Repositories;

use A17\Twill\Repositories\Behaviors\HandleBlocks;

use A17\Twill\Repositories\Behaviors\HandleMedias;


use A17\Twill\Repositories\ModuleRepository;
use App\Models\Message;

class MessageRepository extends ModuleRepository
{
    use HandleBlocks, HandleMedias;

    public function __construct(Message $model)
    {
        $this->model = $model;
    }
}
