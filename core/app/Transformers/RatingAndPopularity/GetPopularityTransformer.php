<?php

namespace App\Transformers\RatingAndPopularity;

use League\Fractal\TransformerAbstract;

class GetPopularityTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($result)
    {
        return [
            'company_id' => $result['company_id'],
            'popularity' => $result['popularity']
        ];
    }
}
