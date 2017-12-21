<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Red Hat GECCon </title>
      <!-- Bootstrap CDN minified css -->
      <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet'>
      <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/> -->
      <!-- Fullcalendar css stylesheets -->
      <link href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.css' rel='stylesheet' />
    	<link href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.print.min.css' rel='stylesheet' media='print' />
    	<link href='/fullcalendar-scheduler/scheduler.min.css' rel='stylesheet' />
      <!-- Google API fonts -->
      <link href="https://fonts.googleapis.com/icon?family=Overpass" rel="stylesheet"/>
      <!-- RedHat css style guide -->
      <link href='/RedHatstyle.css' rel='stylesheet' />

  </head>
  <body>
  <script type="text/javascript">

 	  var urlRoot = '/'
    // var urlRoot = 'http://localhost:8090/'
    var contactUrl = '${contactUrl}'

	  // var urlRoot = 'http://sf-api-route-ajb-sf-api.int.open.paas.redhat.com/'
	  var urlTestEnd = 'calendarAPI?resourceId=0036300000HnIenAAF'
	  var urlTest = urlRoot + urlTestEnd
	  // var urlLocalTest = urlLocalRoot + urlTestEnd
	  var urlResourceSearch = 'calendarAPI?resourceId='
	  var currentId = '${resourceID}'
	  var calendarRedirectUrl = '${calendarUrl}'
  </script>
    <%@include  file="RedHatGeccon.html" %>
    </body>
