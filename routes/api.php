<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('products', 'ProductController@getAll');
Route::post('products', 'ProductController@add');
Route::put('products/{id}', 'ProductController@edit');
Route::delete('products/{id}', 'ProductController@delete');
Route::post('products/filter', 'ProductController@filter');