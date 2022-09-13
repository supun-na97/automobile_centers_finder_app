<?php

namespace App\Services\Company;

use App\Models\Company;
use Carbon\Carbon;
use Prewk\Result\Err;
use Prewk\Result\Ok;

class CompanyService
{
    public function getCompanyDetails($cityId)
    {
        $details = Company::whereNull('deleted_at');

        if (!empty($cityId)) {
            $details->where('city_id', $cityId);
        }

        $details = $details->get();

        return new Ok($details);
    }
}
