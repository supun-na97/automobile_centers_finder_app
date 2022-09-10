<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequestStatus extends Model
{
    use HasFactory;

    protected $table = "user_request_statuses";

    const ACCEPT        = 1;
    const BUSY          = 2;
    const NOTRESPONDING = 3;
    const CLOSE         = 4;
    const DONE          = 5;
    const ONGOING       = 6;
    const REJECT        = 7;
    const PENDING       = 8;
    const SENDINGFAILED = 9;
    const DELIVERED     = 10;

}
