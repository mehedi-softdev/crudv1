{{-- layout  --}}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ "CRUD | " . $title }}</title>
    {{-- font awesome links  --}}
    <link rel="stylesheet" href="{{ asset("css/all.min.css") }}">
    {{-- bootstrap file  --}}
    <link rel="stylesheet" href="{{ asset("css/bootstrap.min.css") }}">
    @yield("css")
</head>
<body>
    @yield("content")
</body>
    {{-- jqeury first  --}}
    <script src="{{ asset("js/jquery.js") }}"></script>
    {{-- font awesome  --}}
    <script src="{{ asset("js/all.min.js") }}"></script>
    {{-- bootstrap  --}}
    <script src="{{ asset("js/bootstrap.min.js") }}"></script>
    @yield("js")
</html>