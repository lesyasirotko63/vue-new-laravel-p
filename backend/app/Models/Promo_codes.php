<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo_codes extends Model {
    protected static $unguarded = true;

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Products::class, 
        'promo_codes_products_products', 'promo_codes_id', 'products_id');
    }

}

