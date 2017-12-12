$(document).ready(function () {
  var urlLocal = 'http://localhost:8080/calendar?startDate=01-12-2017&endDate=25-12-2017'
  var urlNewerTestData = 'http://localhost:8080/calendar?resourceId=0036300000BzLSVAA3&startDate=01-01-2000&endDate=01-01-2020%27'
  var urlTest = 'http://localhost:8080/calendar?resourceId=0036300000HnIenAAF&startDate=06-01-2017&endDate=10-03-2018%27'
  initialiseCalendar()
  returnData(returnCurrentCalendar())

  // initialiseCalendar frame and event mouseover references
  function initialiseCalendar () {
    $('#calendar').fullCalendar({
      // now: moment(),
      now: moment(), // current date set to false date for testing purposes
      editable: false, // draggable events disabled as read only
      // aspectRatio: 1.8,
      height: 'auto',
      contentHeight: 'auto',
      fixedWeekCount: false,
      // hiddenDays: [ 6,0 ], //how to hide certain days. 0=Sunday, 6=Saturday. Filter via work calendar first. (if work day hours = 0 then hide) May be better to just not fill in these unused days?
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
          slotDuration: '06:00',
          duration: {
            days: 5
          }
        },
        timelineWeek: {
          type: 'timeline',
          buttonText: '7 Day',
          slotDuration: '06:00',
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

      eventMouseover: function (data, event, view) {
        // event mouseover to display tooltip of further event information. still need to change it away from a moving tooltip to a static one TODO here
        // end date needs 1 day subtracting as through moment date formats it would otherwise be plotted to midnight of the end date and not render.
        tooltip = '<div class="tooltiptopicevent">' +
          'Unique event id = ' + data.id + '</br>' +
          'Assignment Name' + ': ' + data.title + '</br>' +
          'Start Date' + ': ' + data.start.format('YYYY-MM-DD') + '</br>' +
          'End Date' + ': ' + data.end.subtract(1, 'days').format('YYYY-MM-DD') + '</br>' +
          'Assignment Status is: ' + data.status + '</br>' +
          'Project Region: ' + data.projectLocation + '</br>' +
          'scheduled Hours: ' + data.scheduledHours +
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

  function returnData (calendarInput) {
    // console.log(urlLocal)
    $.ajax({
      // url: urlLocal
      // url: urlNewerTestData
      url: urlTest
    }).done(function (data) {
      // console.log('payload is ' + data)
      // console.log(data.data)
      // console.log(data.data.assignments)
      // console.log(data.data.assignments[0])
      // console.log(data.data.assignments[1])
      $.each(data.data.assignments, function (i, field) {
        // input resources/projects down the left hand column
        // console.log('field is ' + field.resourceID)
        calendarInput.fullCalendar('addResource', {
          id: field.projectName,
          // Change this in the future to use project id as name not necessarily unique
          title: field.projectName
        })
        // console.log('field assignment working pattern is: ')
        // console.log(field.assignmentWorkingPattern)
        // console.log(field.assignmentWorkingPattern[0])
        // var datesArray = returnArrayOfDates(field.startDate,field.assignmentWorkingPattern)



        // for length of working pattern,
        // currentDate is startDate + i*2 days,
        // dailyHours = returnHours from date
        var eventScheduledHours = 0
        var eventScheduledDate = moment()
        var event = {}
        console.log('console.log = ' + i)
        for (var index = 0; index < field.assignmentWorkingPattern.length; index = index + 2) {
          eventScheduledHours = field.assignmentWorkingPattern[index]
          console.log('number/scheduledHours at ' + i + ' is ' + eventScheduledHours)
          eventScheduledDate = moment(field.startDate, 'DD-MM-YYYY').add(index / 2, 'days')
          console.log('date of new smaller event is ' + moment(eventScheduledDate).format('DD-MM-YYYY'))
          if (eventScheduledHours !== 0) {
            event = {
              id: field.assignmentID,
              resourceId: field.projectName,
              start: eventScheduledDate,
              end: moment(eventScheduledDate, 'DD-MM-YYYY').add(1, 'days'),
              title: field.name,
              status: field.status,
              color: getStatusColor(field.status),
              scheduledHours: eventScheduledHours
            }
            calendarInput.fullCalendar('renderEvent', event, true)
          } else {
            event = {}
          }
        }
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
        return '#ffffff'
    }
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
