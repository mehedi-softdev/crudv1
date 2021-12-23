<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RootsController;
use Illuminate\Support\Facades\Route;


// home page route
Route::get("/", [RootsController::class, 'home'])->name("home");

// routes for employee
Route::prefix("emp/")->group(function (){
    Route::get("fetch/", [EmployeeController::class, 'getAllRecords'])->name("fetch-employees");
    Route::post("add/", [EmployeeController::class, 'add'])->name("emp-add");
    Route::post("update/{emp_id}", [EmployeeController::class, 'update'])->name("emp-update");
    Route::get("delete/{emp_id}", [EmployeeController::class, 'delete'])->name("emp-delete");
    Route::get("/fetch/{emp_id}", [EmployeeController::class, 'getRecord'])->name("fetch-employee");

});