<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>randyp</title>
    <link crossorigin="anonymous" href="css/index.css" media="all" rel="stylesheet">
    
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            $("h3[href]").each(function(){
                var $this = $(this);
                $this.click(function(){
                    console.log("hello there");
                });
            });
        });
    </script>
</head>
<body>
<div>
    <h3>Randy Pensinger by day...</h3>
    <article class="markdown-body">
