//let's get this started
function testMe()
{
	console.log( "hi" );
	var myCalendar = $('#calendar').fullCalendar(
	{
        header:
		{
			left: 'month,agendaWeek,agendaDay'
		},
		height: 500,
		editable: true,
		durationEditable: true,
		weekends: false,
		//referencing my preloaded events variable
		events: preLoadedEvents,
		dayClick: function()
		{
			//alert('a day has been clicked!');
			console.log("clicked");
			switchToDay();
		},
		eventResize: function(event, dayDelta, minuteDelta, revertFunc){
            updateEvent(event);
        },
		eventClick: function (event, jsEvent, view) {
			//set the values and open the modal
			console.log( event );
			$("#eventInfo").html(event.description);
			$("#eventStartTime").html("<p>"+moment(event.start).format()+"</p>");
			$("#eventAttendees").html("<p>"+event.attendees[0].firstName+"</p>");
			$("#eventLink").attr('href', 'modify-event-micah.html?id='+event._id);
			$("#eventContent").dialog({
				modal: false,
				title: event.title
			});
			return false;
		}
    });
	
	console.log( myCalendar );
}

//what is going on here??
function switchToDay()
{
	
}

//no idea what this does yet
function updateEvent(the_event) {
    $.update(
      "/events/" + the_event.id,
      { event: { title: the_event.title,
                 starts_at: "" + the_event.start,
                 ends_at: "" + the_event.end,
                 description: the_event.description
               }
      },
      function (reponse) { console.log('successfully updated task.'); }
    );
};

//send the name of the parameter to get it's value
function getParamValue(paramName)
{
	//log( window.location.search );
	var params={};
	
	//this regex was stolen from stack overflow http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
		function(str,key,value)
		{
			params[key] = value;
		}
	);
	//log( params[paramName] );
	
	return params[paramName];
}

function getEventMicah(eventid)
{
	getEventsMicah('#calendar', eventid);
}
function getEventsMicah(calendarName, eventid)
{
	console.log( $('#calendar') );
}