<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTable extends Migration
{
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::create('products_categories_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('products_id')->unsigned();
            $table->unsignedBigInteger('categories_id')->unsigned();
            $table->foreign('products_id')->references('id')->on('products');
            $table->foreign('categories_id')->references('id')->on('categories');
        });

        Schema::create('products_moreProducts_products', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('products_id')->unsigned();
            $table->unsignedBigInteger('moreProducts_id')->unsigned();
            $table->foreign('products_id')->references('id')->on('products');
            $table->foreign('moreProducts_id')->references('id')->on('products');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('product')->nullable();
            $table->foreign('product')->references('id')->on('products');

            $table->unsignedBigInteger('user')->nullable();
            $table->foreign('user')->references('id')->on('users');

        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('product')->nullable();
            $table->foreign('product')->references('id')->on('products');

            $table->unsignedBigInteger('user')->nullable();
            $table->foreign('user')->references('id')->on('users');

        });

        Schema::table('promo_codes', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::create('promo_codes_products_products', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('promo_codes_id')->unsigned();
            $table->unsignedBigInteger('products_id')->unsigned();
            $table->foreign('promo_codes_id')->references('id')->on('promo_codes');
            $table->foreign('products_id')->references('id')->on('products');
        });

        Schema::table('files', function(Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');
        });
    }

    public function down()
    {
        //
    }
}
