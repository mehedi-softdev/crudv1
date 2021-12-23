// popup msg show action start
let resetPopupWindow = () => {
    $(".message").css("visibility", "hidden");
    $(".message").css("left", "-100%");
}

let showPopupMsg = (msg, alert_type) => {
    
    $("#msg").text(msg);
    $(".message").addClass(`alert-${alert_type}`); // adding style class 

    $(".message").css("visibility", "visible");
    $(".message").css("left", "0px");

    setInterval(resetPopupWindow, 1000);
}
// popup msg show action end

let employeeListTemplate = (employee, sn) => {
    let template = `
    <tr>
        <th scope="row"> ${sn} </th>
        <td> ${employee.emp_name} </td>
        <td> ${employee.emp_salary} </td>

        <td>
            <a href="javascript:void(0)" onclick="updateEmployee(${employee.emp_id})">
                <i class="fas fa-edit" id="emp_update"></i>
            </a>
        </td>
        <td>
            <a href="javascript:void(0);" id="delete_emp" onclick="return deleteEmployee(${employee.emp_id})">
                <i class="fas fa-trash" id="emp_delete"></i>
            </a>
        </td>
    </tr>
    `;
    return template;
}



let getEmpRecords = () => {
    $.ajax({
        url: "/emp/fetch/",
        type: "GET",
        success: ( records ) => {
            let length = records.employees.length;
            $( ".emp-list table tbody" ).html( "" );
            for( let i = 0; i < length; i++ ) {
                let emp = records.employees[i];
                let template = employeeListTemplate(emp, sn=i+1);
                let html =  $( ".emp-list table tbody" ).html(  );
                html += template;
                $( ".emp-list table tbody" ).html( html );
            }
        },
    });
}

let validateForm = (e) => {
    e.preventDefault(); 
    let emp_name = $('input[name="emp_name"]').val();
    let emp_salary = $('input[name="emp_salary"]').val();
 
    if( emp_name === "" && emp_salary === "" ) {
        showPopupMsg(msg="Please insert data first!", alert_type="danger");
        return false;
    }
    else if (emp_name.length < 1) {
        showPopupMsg(msg="Please enter Employee Name", alert_type="info");
        return false;
    }
    else if (emp_salary.length < 1) {
        showPopupMsg(msg="Please enter Employee Salary", alert_type="info");
        return false;
    }
    else {
        return true;
    }

}   

let addEmployee = (e) => {
    e.preventDefault();
    let valid = validateForm(e);

    if(!valid) {
        throw new Error("Invalid");
    }

    // passing token
    $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
  
    $.ajax({
        url: "/emp/add",
        type: "POST",
        data: $( 'form[name="emp_add_form"]' ).serialize(),
        success : ( result ) => {
            showPopupMsg(msg=`${ $("#id_emp_name").val() } successfully added to the list!`, alert_type="success");
            // clearing input fields 
            $( "#id_emp_name" ).val("");
            $( "#id_emp_salary" ).val("");
            getEmpRecords();  // call the fetch function

        },
        error: ( err ) => {
            showPopupMsg( `Can't add the user! Unknown Error occure!`, alert_type="danger");
        }


    });
    
}
// delete option
let deleteEmployee = (emp_id) => {

    $.ajax({
            url : `/emp/delete/${emp_id}`,
            type: "GET",
            success: ( result ) => {
                showPopupMsg(msg=`User has been successfully deleted!`, alert_type="info");
                getEmpRecords();
            },
            error: ( err ) => {

                alert(` Can't delete the user! `);
            }
            
        });
    

}

// update option

let updateTemplateForm = (emp) => {
// changing adding form to update form 
    let updateTemplate = `
        <form action="#" name="emp_update_form" method="POST" class="row g-2">
            <div class="col-12 mb-3 text-end p-1">
                <h1 class="badge bg-success text-white text-center">Employee Update Form</h1>
            </div>
            <div class="col-12 mb-3">
                <label for="id_emp_name" class="form-label">Update Employee Name</label>
                <input type="text" class="form-control" id="id_emp_name"  name="emp_name"
                    value="${emp.emp_name}">
            </div>
            <div class="col-12 mb-3">
                <label for="id_emp_salary" class="form-label">Update Employee Salary</label>
                <input type="number" class="form-control" id="id_emp_salary"  min="0" name="emp_salary"
                    value="${emp.emp_salary}">
            </div>
            <div class="col-12 mb-3 text-end text-lg-start">
                <button type="submit" class="btn btn-outline-primary">Update </button>
            </div>
        </form>
    `;

    $( ".form" ).html( updateTemplate );
}

let updateEmp = (e) => {
  
    e.preventDefault();
    $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/emp/update/${e.data.emp.emp_id}`,
        type: "POST",
        data: $( 'form[name="emp_update_form"]' ).serialize(),
        success: ( result ) => {
            showPopupMsg(msg="User updated successfully!", alert_type="success");
            getEmpRecords();
            empAddForm();
        },
        error: ( err ) => {
            alert("Following error occured! ");
        }
    });
}   

let updateEmployee = (emp_id) => {
    
    var id = emp_id;
    $.ajax({
        url: `/emp/fetch/${emp_id}`,
        type: "GET",
        success: ( result ) => {
            let emp = result.employee;
            updateTemplateForm(emp);
        
            $('form[name="emp_update_form"]').submit({"emp":emp}, updateEmp);
        },
        error: ( err ) => {
            alert(" Error! to update user!");
        }
    });
    
}

let empAddForm = () => {
    let template = `
        <form action="#" onsubmit="addEmployee(event)" name="emp_add_form" method="POST" class="row g-2">
            
            <div class="col-12 mb-3 text-end p-1">
                <h1 class="badge bg-success text-white text-center">Employee Add Form</h1>
            </div>
            <div class="col-12 mb-3">
                <label for="id_emp_name" class="form-label">Employee Name</label>
                <input type="text" class="form-control" id="id_emp_name"  name="emp_name"
                    placeholder="ex. Jhon Smith">
            </div>
            <div class="col-12 mb-3">
                <label for="id_emp_salary" class="form-label">Employee Salary</label>
                <input type="number" class="form-control" id="id_emp_salary"  min="0" name="emp_salary"
                    placeholder="ex. 12,0000">
            </div>
            <div class="col-12 mb-3 text-end text-lg-start">
                <button type="submit" class="btn btn-outline-primary">Add <i class="fas fa-plus"></i></button>
            </div>
        </form>
    `;
    $( ".form" ).html( template );
}


// when page loaded
$(document).ready(() => {

  
    // fetch and display all records
    getEmpRecords();
    
    //  add employee 
    $('form[name="emp_add_form"]').submit(addEmployee);
   
}); 
