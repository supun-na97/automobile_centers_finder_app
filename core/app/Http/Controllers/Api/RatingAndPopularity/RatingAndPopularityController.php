<?php

namespace App\Http\Controllers\Api\RatingAndPopularity;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\RatingAndPopularity\PopularityRequest;
use App\Http\Requests\RatingAndPopularity\RatingRequest;
use App\Services\RatingAndPopularity\RatingAndPopularityService;
use App\Transformers\CommonTransformer;
use App\Transformers\RatingAndPopularity\GetPopularityTransformer;

class RatingAndPopularityController extends ApiController
{
    /**
     * @var ratingAndPopularityService
     */
    protected $ratingAndPopularityService;

    /**
     * rating and popularity .
     * @param RatingAndPopularityService $ratingAndPopularityService
     */
    public function __construct(RatingAndPopularityService $ratingAndPopularityService)
    {
        $this->ratingAndPopularityService = $ratingAndPopularityService;
    }

    public function popularity(PopularityRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->ratingAndPopularityService->createPopularity($validatedData['company_id'], $validatedData['popularity']);
        $data          = $result->unwrap();

        return fractal($data, new CommonTransformer)->respond();
    }

    public function rating(RatingRequest $request)
    {
        $validatedData = $request->validated();
        $result        = $this->ratingAndPopularityService->createRating($validatedData['company_id'], $validatedData['rating']);
        $data          = $result->unwrap();

        return fractal($data, new CommonTransformer)->respond();
    }

    public function getPopularity()
    {
        $result = $this->ratingAndPopularityService->getPopularityDetails();
        $data   = $result->unwrap();

        return fractal($data, new GetPopularityTransformer)->respond();
    }
}
