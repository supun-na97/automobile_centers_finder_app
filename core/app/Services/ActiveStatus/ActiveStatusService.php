<?php

namespace App\Services\ActiveStatus;

use App\Models\ActiveStatus;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Prewk\Result\Ok;

class ActiveStatusService
{
    public function getStatus()
    {
        $statses = ActiveStatus::orderBy('name', 'ASC')->get();

        return new Ok($statses);
    }

    public function changeActiveStatus($statusId)
    {
        $user   = Auth::user();
        $userId = $user->id;
        $role   = $user->role;

        if ($role == 2) {
            User::where('id', $userId)->update(['current_status' => $statusId]);
            Company::where('company_reg_id', $userId)->update(['current_status' => $statusId]);
        } else {
            User::where('id', $userId)->update(['current_status' => $statusId]);
        }

        return new Ok("Active Status update successfully!");
    }
}
