<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemNotificationStatus extends Model
{
    use HasFactory;

    protected $table = "notification_message_statuses";

    const ONGOING       = 1;
    const SENDINGFAILED = 2;
    const DELIVERED     = 3;
    const REJECT        = 4;
    const SENT          = 5;
}
