<!DOCTYPE html>
<html>

<head>
    @if (config('v2board.admin_source_build', false))
        <link rel="stylesheet" href="/admin-build/assets/admin/antd.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/vendor/fontawesome.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/vendor/simple-line-icons.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/vendor/animate.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/vendor/simplebar.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/markdown-editor.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/vendor/bootstrap.css?v={{$version}}">
        <link rel="stylesheet" href="/admin-build/assets/admin/umi.css?v={{$version}}">
    @else
        <link rel="stylesheet" href="/assets/admin/components.chunk.css?v={{$version}}">
        <link rel="stylesheet" href="/assets/admin/umi.css?v={{$version}}">
        <link rel="stylesheet" href="/assets/admin/custom.css?v={{$version}}">
    @endif
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title>{{$title}}</title>
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,600,700"> -->
    <script>window.routerBase = "/";</script>
    <script>
        window.settings = {
            title: '{{$title}}',
            theme: {
                sidebar: '{{$theme_sidebar}}',
                header: '{{$theme_header}}',
                color: '{{$theme_color}}',
            },
            version: '{{$version}}',
            background_url: '{{$background_url}}',
            logo: '{{$logo}}',
            secure_path: '{{$secure_path}}'
        }
    </script>
</head>

<body>
<div id="root"></div>
@if (config('v2board.admin_source_build', false))
    <script src="/admin-build/settings.js?v={{$version}}"></script>
    <script src="/admin-build/app.js?v={{$version}}"></script>
@else
    <script src="/assets/admin/vendors.async.js?v={{$version}}"></script>
    <script src="/assets/admin/components.async.js?v={{$version}}"></script>
    <script src="/assets/admin/umi.js?v={{$version}}"></script>
@endif
</body>

</html>
