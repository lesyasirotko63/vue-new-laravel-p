<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Repositories\Promo_codesRepositoryInterface;

class Promo_codesController extends Controller
{
    protected Promo_codesRepositoryInterface $promo_codesRepository;
    protected Request $request;

    public function __construct(Promo_codesRepositoryInterface $promo_codesRepository, Request $request)
    {
        $this->promo_codesRepository = $promo_codesRepository;
        $this->request = $request;
    }

    public function index()
    {
        $payload = $this->promo_codesRepository->findAll($this->request->all());

        return response()->json($payload);
    }

    public function show($id)
    {
        $payload = $this->promo_codesRepository->findById($id);

        return response()->json($payload);
    }

    public function store()
    {
        $payload = $this->promo_codesRepository->create($this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function update($id)
    {
        $payload = $this->promo_codesRepository->update($id, $this->request->all(), auth()->user());

        return response()->json($payload);
    }

    public function destroy($id)
    {
        $this->promo_codesRepository->destroy($id);

        return response()->json(true, 204);
    }

    public function findAllAutocomplete()
    {
        $payload = $this->promo_codesRepository->findAllAutocomplete($this->request->only(['query', 'limit']));

        return response()->json($payload);
    }
}

