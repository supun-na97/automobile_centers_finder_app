<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemNotification extends Model
{
    use HasFactory;

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
        'created_at',
        'updated_at'
    ];
}
