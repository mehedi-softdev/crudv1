<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = "emp_id";
    protected $fillable = [
        'emp_id',
        'emp_name',
        'emp_salary',
        'emp_added_on',
    ];
}
