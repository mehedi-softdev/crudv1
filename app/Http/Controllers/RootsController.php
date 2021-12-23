<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class RootsController extends Controller
{
    //home page
    public function home()
    {
        return view("home")->with([
            "title" => "Home",
        ]);
    }
}
