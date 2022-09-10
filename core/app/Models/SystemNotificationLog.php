<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemNotificationLog extends Model
{
    use HasFactory;

    protected $table = "notification_message_logs";
}
