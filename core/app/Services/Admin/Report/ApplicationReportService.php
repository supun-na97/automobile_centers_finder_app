<?php

namespace App\Services\Admin\Report;

use App\Models\User;
use App\Models\UserRequest;
use Prewk\Result\Ok;

class ApplicationReportService
{
    public function getUserAppUsage()
    {
        $users['active_users']         = User::whereNull('deleted_at')->where(['is_active' => 1, 'role' => 1])->orderBy('id', 'DESC')->get();
        $users['active_users_count']   = $users['active_users']->count();
        $users['inactive_users']       = User::whereNotNull('deleted_at')->where(['is_active' => 0, 'role' => 1])->orderBy('id', 'DESC')->get();
        $users['inactive_users_count'] = $users['inactive_users']->count();

        $details['details'] = $users;

        return new Ok($details);
    }

    public function getCompanyAppUsage()
    {
        $companies['active_companies']         = User::whereNull('deleted_at')->where(['is_active' => 1, 'role' => 2])->orderBy('id', 'DESC')->get();
        $companies['active_companies_count']   = $companies['active_companies']->count();
        $companies['inactive_companies']       = User::whereNotNull('deleted_at')->where(['is_active' => 0, 'role' => 2])->orderBy('id', 'DESC')->get();
        $companies['inactive_companies_count'] = $companies['inactive_companies']->count();

        $details['details'] = $companies;

        return new Ok($details);
    }

    public function getAllRequestDetails()
    {
        $data = UserRequest::get();

        return new Ok($data);
    }
}
