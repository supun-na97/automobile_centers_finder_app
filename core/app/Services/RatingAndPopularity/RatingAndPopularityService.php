<?php

namespace App\Services\RatingAndPopularity;

use App\Models\RatingAndPopularity;
use Illuminate\Support\Facades\Auth;
use Prewk\Result\Ok;

class RatingAndPopularityService
{
    public function createPopularity($companyId, $popularity)
    {
        $user   = Auth::user();
        $userId = $user->id;

        $currentData = $this->currentData($companyId, $userId);

        if (!empty($currentData)) {
            RatingAndPopularity::where([
                'user_id'    => $userId,
                'company_id' => $companyId
            ])->update([
                'popularity' => $popularity
            ]);
        } else {
            RatingAndPopularity::create([
                'user_id'    => $userId,
                'company_id' => $companyId,
                'popularity' => $popularity
            ]);
        }

        return new Ok("Added popularity successfully");
    }

    public function createRating($companyId, $rating)
    {
        $user   = Auth::user();
        $userId = $user->id;

        $currentData = $this->currentData($companyId, $userId);

        if (!empty($currentData)) {
            RatingAndPopularity::where([
                'user_id'    => $userId,
                'company_id' => $companyId
            ])->update([
                'rating'     => $rating
            ]);
        } else {
            RatingAndPopularity::create([
                'user_id'    => $userId,
                'company_id' => $companyId,
                'rating'     => $rating
            ]);
        }

        return new Ok("Added rating successfully");
    }

    private function currentData($companyId, $userId)
    {
        return RatingAndPopularity::where(['user_id' => $userId, 'company_id' => $companyId])->first();
    }

    public function getPopularityDetails()
    {
        $user    = Auth::user();
        $userId  = $user->id;

        $details = RatingAndPopularity::where('user_id', $userId)->select('company_id', 'popularity')->get();

        return new Ok($details);
    }
}
