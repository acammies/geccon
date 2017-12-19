/* globals $:false */

$(document).ready(function () {
  // var urlNewerTestData = 'http://localhost:8080/calendar?resourceId=0036300000BzLSVAA3&startDate=01-01-2000&endDate=01-01-2020%27'
  var urlRoot = '/'
  var urlLocalRoot = 'http://localhost:8090/'
  // var urlRoot = 'http://sf-api-route-ajb-sf-api.int.open.paas.redhat.com/'
  var urlTestEnd = 'calendar?resourceId=0036300000HnIenAAF'
  var urlTest = urlRoot + urlTestEnd
  var urlLocalTest = urlLocalRoot + urlTestEnd
  var urlResourceSearch = 'calendar?resourceId='
  // var queryStartDate = '2017-06-01'
  // var queryEndDate = '2018-03-10'
  // var urlDateToQuery = '&startDate=' + queryStartDate + '&endDate=' + queryEndDate



  initialiseCalendar()
  // returnData(returnCurrentCalendar(), urlTest)
  returnData(returnCurrentCalendar(), urlLocalTest)

  loadResourceInformation(urlRoot + 'contact')

  // initialiseCalendar frame and event mouseover references
  function initialiseCalendar () {
    $('#calendar').fullCalendar({
      now: moment(), // current date set to false date for testing purposes
      // now: '2017-06-05', // TODO change me to moment() as above
      editable: false, // draggable events disabled as read only
      // aspectRatio: 1.8,
      height: 'auto',
      contentHeight: 'auto',
      fixedWeekCount: false,
      scrollTime: '08:00', // undo default 6am scrollTime when viewing in agenda style
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'timelineDay,timelineWeek,timelineTwoWeeks,timelineMonth,month'
      },
      defaultView: 'timelineTwoWeeks',
      views: {
        // some views have been defined below but not entered as choices above to save space and to avoid overcomplicating.
        timelineDay: {
          buttonText: 'Today',
          slotDuration: '03:00'
        },
        timelineFiveDays: {
          type: 'timeline',
          buttonText: '5 Day',
          slotDuration: '12:00',
          duration: {
            days: 5
          }
        },
        timelineWeek: {
          type: 'timeline',
          buttonText: '7 Day',
          slotDuration: '24:00',
          duration: {
            days: 7
          }
        },
        timelineTwoWeeks: {
          type: 'timeline',
          buttonText: '2 Week',
          slotDuration: '24:00',
          duration: {
            weeks: 2
          }
        },
        timelineMonth: {
          type: 'timeline',
          buttonText: '1 Month',
          slotDuration: '24:00',
          duration: {
            months: 1
          }
        },
        agendaWeek: {
          buttonText: 'Week'
        },
        month: {
          buttonText: 'Month View'
        },
        list: {
          buttonText: 'List'
        }
      },

      resourceLabelText: 'Projects',
      resources: [
        // //Statically generated resources for testing purposes
        // resources ==
        // {id: 'BP', title: 'BP Project'}
      ],
      events: [
        // //Statically generated events for testing purposes
        // { id: 'g', resourceId: 'BP', start: moment(), end: '2017-12-29', title: 'BP 3 Day checkup', status: 'Tentative', color: getStatusColor('Confirmed'), deliveryLocation: 'Canary Wharf' }
      ],

      eventClick: function (data, event, view) {
        // alert('Event: ' + data.title)
        // alert('Coordinates: ' + event.pageX + ',' + event.pageY)
        // alert('View: ' + view.name)
        alert('Assignment Name' + ': ' + data.title + '\n' +
        'Assignment id = ' + data.id + '\n' +
        'Start Date' + ': ' + data.start.format('YYYY-MM-DD') + '\n' +
        'End Date' + ': ' + data.end.subtract(1, 'days').format('YYYY-MM-DD') + '\n' +
        'Total Assignment Scheduled Hours: ' + data.scheduledHours + '\n' +
        'Daily Scheduled Hours: ' + data.scheduledHoursDaily + '\n' +
        'Assignment Status is: ' + data.status + '\n' +
        'Project Region: ' + data.projectLocation + '\n' +
        'Project Id/Name is: ' + data.resourceId + '\n')
      },

      eventMouseover: function (data, event, view) {
        // event mouseover to display tooltip of further event information. still need to change it away from a moving tooltip to a static one TODO here
        // end date needs 1 day subtracting as through moment date formats it would otherwise be plotted to midnight of the end date and not render.
        var tooltip = '<div class="tooltiptopicevent">' +
          'Assignment Name' + ': ' + data.title +
          '. Assignment id = ' + data.id + '</br>' +
          'Start Date' + ': ' + data.start.format('YYYY-MM-DD') + '</br>' +
          'End Date' + ': ' + data.end.subtract(1, 'days').format('YYYY-MM-DD') + '</br>' +
          'Total Assignment Scheduled Hours: ' + data.scheduledHours + '</br>' +
          'Daily Scheduled Hours: ' + data.scheduledHoursDaily + '</br>' +
          'Assignment Status is: ' + data.status + '</br>' +
          'Project Region: ' + data.projectLocation + '</br>' +
          'Project Id/Name is: ' + data.resourceId + '</br>' +
          ' </div>'
        // 'Delivery Location: ' + data.deliveryLocation + '</br>' +;
        $('body').append(tooltip)
        $(this).mouseover(function (e) {
          $(this).css('z-index', 10000)
          $('.tooltiptopicevent').fadeIn('500')
          $('.tooltiptopicevent').fadeTo('10', 1.9)
        }).mousemove(function (e) {
          $('.tooltiptopicevent').css('top', e.pageY + 10)
          $('.tooltiptopicevent').css('left', e.pageX + 20)
        })
      },
      eventMouseout: function (data, event, view) {
        $(this).css('z-index', 8)
        $('.tooltiptopicevent').remove()
      }
    })
  }

  function returnData (calendarInput, urlInput) {
    // console.log(urlLocal)
    $.ajax({
      // url: urlLocal
      // url: urlNewerTestData
      url: urlInput
    }).done(function (data) {
      // console.log('payload is ' + data)
      // console.log(data.data)
      // console.log(data.data.assignments)
      // console.log(data.data.assignments[0])
      // console.log(data.data.assignments[1])
      // For each Assignment:
      $.each(data.data.assignments, function (i, field) {
        // input resources/projects down the left hand column
        // console.log('Project is ' + field.projectName)
        calendarInput.fullCalendar('addResource', {
          id: field.projectID,
          // Change this in the future to use project id as name not necessarily unique
          title: field.projectName
        })
        // console.log('field assignment working pattern is: ')
        // console.log(field.assignmentWorkingPattern)
        // console.log(field.assignmentWorkingPattern[0])
        // var datesArray = returnArrayOfDates(field.startDate,field.assignmentWorkingPattern)
        // var event = {}
        // console.log('assignment id is ' + field.assignmentID)

        // For each event in assignment:
        var countEvent = 0
        $.each(field.events, function (index, eventField) {
          // console.log('event start is: ' + eventField.startDate + ', event days is: ' + eventField.days + ', event daily hours is: ' + eventField.dailyHours)
          var formattedStart = moment(eventField.startDate).format('YYYY-MM-DD')
          var formattedAssignmentEnd = moment(field.endDate).format('YYYY-MM-DD')
          var event = {
            start: formattedStart,
            assignmentEnd: field.endDate,
            scheduledHours: field.scheduledHours,
            id: field.url + ' ' + countEvent,
            resourceId: field.projectID,
            projectName: field.projectName,
            end: moment(formattedStart).add(eventField.days, 'days').format('YYYY-MM-DD'),
            scheduledHoursDaily: eventField.dailyHours,
            title: field.name,
            status: field.status,
            projectCode: field.opaProjectCode,
            location: field.deliveryLocation,
            color: getStatusColor(field.status)
          }
          countEvent++

          calendarInput.fullCalendar('renderEvent', event, true)
        })

        // for length of working pattern,
        // currentDate is startDate + i*2 days,
        // dailyHours = returnHours from date
        // var eventScheduledHours = 0
        // var eventScheduledDate = moment()

        // console.log('console.log = ' + i)

        // end test
        // var event = {
        //   id: field.assignmentID,
        //   resourceId: field.opaProjectCode,
        //   start: moment(),
        //   end: '2017-12-31',
        //   title: field.name
        // }
        // calendarInput.fullCalendar('renderEvent', event, true)
      })
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert('getJSON request failed!  ' + textStatus)
    })
  }

  function returnCurrentCalendar () {
    // returns the object of current calendar.
    return $('#calendar')
  }

  // function returnArrayOfDates (startDate, arrayOfHours) {
  //   var arrayOfDates = []
  //   console.log('array length is' + arrayOfHours.length);
  //   for (i = 0; i <= arrayOfHours.length; i = i + 2) {
  //     var currentDayHours = returnDateFromHours(startDate, i)
  //     console.log('currentDayHours = ' + moment(currentDayHours).format('YYYY-MM-DD'))
  //   }
  //   return arrayOfDates
  // }

  // function returnDateFromHours (startDate, currentPosition) {
  //   // given a startdate and position in array, will return  position will return date i days from that point.
  //   var formattedStartDate = moment(startDate)
  //   var dateAtPosition = moment(formattedStartDate).add(currentPosition, 'days')
  //   return dateAtPosition
  //   // return ["2017-12-10",]
  // }

  function clearEvents (calendarInput) {
    // clears all events from calendar
    // console.log('Clearing Events');
    calendarInput.fullCalendar('removeEvents')
  }

  function clearProjects (calendarInput) {
    // function that loops through a given calendar and removes all projects
    var projects = calendarInput.fullCalendar('getResources')
    var i = 0
    // console.log('var projects = '+projects+ '  projects.length = ' + projects.length);
    for (i = 0; i < projects.length; i++) {
      // console.log('id is ' + i),
      // console.log('projects id =' + projects[i].id ),
      calendarInput.fullCalendar('removeResource', projects[i].id)
    // I spent quite a while figuring out that for loop lines are separated by comma and not semi-colon.
    }
  }

  function getStatusColor (eventStatus) {
    // maps eventStatus to a given color, as defined in Red Hat brand guidelines
    switch (eventStatus) {
      case 'Confirmed':
        return '#92d400'
        // alternative 3F9C35
      case 'Tentative':
        return '#f0ab00'
        // alternative EC7A08
      case 'Closed':
        return '#cc0000'
      default:
        return '#000000'
    }
  }

  function updateEventsForNewResource (resourceIdFromList, calendarInput) {
    // var newUrl = urlRoot + urlResourceSearch + resourceIdFromList
    var newUrl = urlRoot + urlResourceSearch + resourceIdFromList
    // console.log(newUrl);
    returnData(calendarInput, newUrl)
  }

  function loadResourceInformation (urlInput) {
    // this is used to pull all contact names and populate the drop down list at the top. Will filter by region etc in live version or have it linked to kerberos login.
    $.ajax({url: urlInput
    }).done(function (data) {
      // console.log('Success')
      $.each(data.data, function (i, field) {
        // console.log(field.id +' ' + field.firstName);
        // var x = document.getElementById("sel1");
        // var option = document.createElement("option");
        var option = field.firstName + ' ' + field.lastName + ' ' + field.email
        // x.add(option);
        // $("#resourceNameList ul").append('<li>'+option.text+'</li>');
        // this sets the id of the list item to resourceID, may have to append a letter on the beginning for compatability
        $('#resourceNameList ul').append('<li onclick="linkClicked($(this).index())" id =' + field.id + '>' + '<a href="#">' + option + '</a>' + '</li>')
        // onclick="linkClicked($(this).index())" calls link clicked function, may change this in future and probably should.
        // also need to make it so that id has a letter appended to the front

        // change this so it worls for a list. already declare the unordered list class/id
        // id = field.id, text = option.text/
        // then work on separate selector based on id
      })
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log('failed')
    })
  };

  $('#myInput').on('keyup', function () {
    // function to filter the dropdown List
    var value = $(this).val().toLowerCase()
    $('.dropdown-menu li').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })

  linkClicked = function (index) {
    // returns the currently selected contractor and uses their resource id to search for all projects
    var currentId = $('#resourceListBox li').get(index - 1).id // get index -1 is needed as the searchbar in the dropdown-menu counts as an indexed item but not in a list
    console.log(currentId)
    clearEvents(returnCurrentCalendar())
    clearProjects(returnCurrentCalendar())
    updateEventsForNewResource(currentId, returnCurrentCalendar())
  }

  $('.pop').popover({
    // mouseover events displays tooltip with further information. TODO make static so that information can be copy and pasted etc.
    trigger: 'manual',
    html: true,
    animation: false
  })
  .on('mouseenter', function () {
    var thisTooltip = this
    $(this).popover('show')
    $('.popover').on('mouseleave', function () {
      $(thisTooltip).popover('hide')
    })
  }).on('mouseleave', function () {
    var thisTooltip = this
    setTimeout(function () {
      if (!$('.popover:hover').length) {
        $(thisTooltip).popover('hide')
      }
    }, 300)
  })
})
