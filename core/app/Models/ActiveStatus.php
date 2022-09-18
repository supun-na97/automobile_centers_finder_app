<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActiveStatus extends Model
{
    use HasFactory;

    const ACTIVE  = 1;
    const OFFLINE = 2;
    const BUSY    = 3;
    const CLOSE   = 4;

    protected $table = "active_statuses";
}
