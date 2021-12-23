@extends("layout.app")
@section("css")
<link rel="stylesheet" href="{{ asset("css/home.min.css") }}">
@endsection
@section("content")
<div class="container-fluid my-container">
    <x-primary_menu />
    {{-- message section  --}}
    <section class="message row text-center p-1 alert ">
        <p id="success_msg" class="col-12">
            <i class="fas fa-check"></i>
            <span id="msg"></span>
        </p>
    </section>
    {{-- list appear and form section  --}}
    <div class="row g-3">
        <section class="emp-list col-12 col-lg-8 ">
            <table class="table table-responsive">
                <thead class="text-light">
                    <tr>
                        <th scope="col">S.N.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col" colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </section>
        {{-- form section  --}}
        <section class="form col-6 col-lg-4">
            <form action="#" name="emp_add_form" method="POST" class="row g-2">
                @csrf
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
        </section>
    </div>
</div>
@endsection
@section("js")
<script src="{{ asset("js/app.min.js") }}"></script>
@endsection