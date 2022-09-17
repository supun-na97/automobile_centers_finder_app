<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemNotification extends Model
{
    use HasFactory;

    const READ   = 1;
    const UNREAD = 0;

    protected $table = "notification_messages";

    protected $fillable = [
        'user_id',
        'content',
        'status',
        'shedule_time',
        'status',
        'request_id',
        'attempt',
        'is_read',
        'role_id',
        'created_at',
        'updated_at'
    ];
}
