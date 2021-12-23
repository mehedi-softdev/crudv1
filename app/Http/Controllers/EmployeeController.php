<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // add employee
    public function add(Request $request)
    {
        if( $request->isMethod("POST") ) {
        
            // now store to database
            Employee::create([
                'emp_name' => $request['emp_name'],
                'emp_salary' => $request['emp_salary'],
                'emp_added_on' => date("Y-m-d"),
            ]);
            
            // return redirect()->route("home");
            $employees = Employee::all();
            return with([
                'employees' => $employees,
            ]);
        }   
        else {
            return false;
        }
    }

    // update employee
    public function update(Request $request, $emp_id) {

                // update
                $emp = Employee::find($emp_id);
                $emp->emp_name = $request->get("emp_name");
                $emp->emp_salary = $request->get("emp_salary");
                $emp->save();
                // return to home
               return true;
           

    }


    // delete employee
    public function delete($emp_id) {

        $emp = Employee::find($emp_id);
        $emp->delete();
        // after successfull deletion return to home
        return true;
    }

    // fetch all records 
    public function getAllRecords() {
        return with([
            'employees' => Employee::all(),
        ]);
    }

    // fetch specific records 
    public function getRecord($emp_id) {
        $employee = Employee::find($emp_id);
        return with([
            'employee' => $employee,
        ]);
    }
}
