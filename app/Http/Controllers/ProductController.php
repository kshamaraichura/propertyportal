<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    // Get all products
    public function getAll() {
        $products = Product::all();
        return $products->toJson();
    }

    // Get perticular product
    public function get($id) {
        $product = Product::findOrFail($id);
        return $product->toJson();
    }

    // Add a new product
    public function add(Request $request) {
        $validatedProduct = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'bedrooms' => 'required',
            'bathrooms' => 'required',
            'images' => 'required'
        ]);

        $product = Product::create([
            'name' => $validatedProduct['name'],
            'price' => $validatedProduct['price'],
            'description' => $validatedProduct['description'],
            'bedrooms' => $validatedProduct['bedrooms'],
            'bathrooms' => $validatedProduct['bathrooms'],
            'images' => $validatedProduct['images']
        ]);

        return response()->json('Product Created!');
    }

    // Edit a new product
    public function edit(Request $request, $id) {
        try {
            $product = Product::findOrFail($id);

            $validatedProduct = $request->validate([
                'name' => 'required',
                'price' => 'required',
                'description' => 'required',
                'bedrooms' => 'required',
                'bathrooms' => 'required',
                'images' => 'required'
            ]);
            $product->update($validatedProduct);
            return response()->json('Product updated successfully!');

        } catch(ModelNotFoundException $e){
            return response()->json('Product not found..');
        }
    }

    // Delete a new product
    public function delete($id) {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }

    // Filter products by price, bedrooms and bathrooms
    public function filter(Request $request) {

        $validatedProduct = $request->validate([
            'price' => 'required',
            'bedrooms' => 'required',
            'bathrooms' => 'required',
        ]);

        $where=[];

        switch($validatedProduct['price']) {
            case 1: array_push($where, ['price', '>=', 0], ['price', '<', 100000]); break; 
            case 2: array_push($where, ['price', '>=', 100000], ['price', '<', 300000]); break;
            case 3: array_push($where, ['price', '>=', 300000]); break;
        }

        switch($validatedProduct['bedrooms']) {
            case 1: array_push($where, ['bedrooms', '=', 1]); break; 
            case 2: array_push($where, ['bedrooms', '=', 2]); break;
            case 3: array_push($where, ['bedrooms', '>', 2]); break;
        }

        switch($validatedProduct['bathrooms']) {
            case 1: array_push($where, ['bathrooms', '=', 1]); break; 
            case 2: array_push($where, ['bathrooms', '=', 2]); break;
            case 3: array_push($where, ['bathrooms', '>', 2]); break;
        }

        $products = Product::where($where)->get();

        return $products->toJson();
    }
}
