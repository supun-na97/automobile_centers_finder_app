<?php

namespace App\Http\Controllers\Api\Admin\Company;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Admin\Company\CompanyRegistrationRequest;
use App\Services\Admin\Company\CompanyService;
use Illuminate\Support\Facades\Validator;

class CompanyController extends ApiController
{
    /**
     * @var companyService
     */
    protected $companyService;

    /**
     * Company service.
     * @param CompanyService $companyService
     */
    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }

    public function createCompany(CompanyRegistrationRequest $request)
    {
        $validatedData = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'message' => 'Validate Failed',
                'errors' => $validatedData->errors()
            ]);
        }

        $validatedData = $request->validated();
        $result = $this->companyService->companyRegistration($validatedData);

        return $result->unwrap();
    }
}
