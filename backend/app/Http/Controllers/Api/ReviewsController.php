<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\ReviewsRepositoryInterface;

class ReviewsController extends Controller
{
    protected ReviewsRepositoryInterface $reviewsRepository;
    protected Request $request;

    public function __construct(ReviewsRepositoryInterface $reviewsRepository, Request $request)
    {
        $this->reviewsRepository = $reviewsRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->reviewsRepository->findAll($this->request->all());

        return response()->json($payload);
    }

    public function show($id)
    {
        $payload = $this->reviewsRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->reviewsRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->reviewsRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->reviewsRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->reviewsRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

