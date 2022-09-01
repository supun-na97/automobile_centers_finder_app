<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Transformers\ErrorTransformer;
use App\Transformers\GenericSuccessTransformer;
use Illuminate\Http\JsonResponse;
use League\Fractal\Serializer\ArraySerializer;

class ApiController extends Controller
{
    protected static function errorResponse(string $code, string $message, int $status = 500, array $failures = null): JsonResponse
    {
        $err = [
            'code'    => $code,
            'message' => $message,
        ];

        if (! is_null($failures)) {
            $err['failures'] = $failures;
        }

        return fractal((object) $err, new ErrorTransformer, new ArraySerializer)->respond($status);
    }

    protected static function successResponse(string $message, int $status = 200): JsonResponse
    {
        return fractal($message, new GenericSuccessTransformer, new ArraySerializer)->respond($status);
    }
}
