//returns all events (for now, i would like to add after-date variable)
function getEvents()
{
	console.log( "getEvents2" );
	
	//console.log( events );
	if(preloadEvents)
		return preLoadedEvents;
	else
		return NULL;
}

//returns a single event based on the eventid
function getEvent(eventid)
{
	var defaultTestEvent = {
		'eventid': '01',
		'title': 'Success Through Failures',
		'eventLocation': 'Atlanta',
		'start': moment('2016-07-22'),

		'attendees':[
			{
			'firstName': 'John',
			'lastName': 'Smitty'
			},
			{
			'firstName': 'Sue',
			'lastName': 'Mee'
			}
		]
	};
	
	//parses events to search for matching eventid
	var events = getEvents();
	for( var i=0; i<events.length; i++){
		if( events[i].eventid == eventid)
			return events[i];
	}
	
	return defaultTestEvent;
}

//UPDATED signature!! returns a single event based on the eventid
function getEvent(calendarName, eventid)
{
	var defaultTestEvent = {
		'eventid': '01',
		'title': 'Success Through Failures',
		'eventLocation': 'Atlanta',
		'start': moment('2016-07-22'),

		'attendees':[
			{
			'firstName': 'John',
			'lastName': 'Smitty'
			},
			{
			'firstName': 'Sue',
			'lastName': 'Mee'
			}
		]
	};
	
	//parses events to search for matching eventid
	var events = getCalendarEvents( calendarName );
	for( var i=0; i<events.length; i++){
		if( events[i].eventid == eventid)
			return events[i];
	}

	return defaultTestEvent;
}

//stub method for retrieve attendees
function getEventAttendees(calendarName, eventid)
{
	var attendees = {
			'firstName': 'Test',
			'lastName': 'User'
			};
			
	var myEvent = getEvent( calendarName, eventid );
	
	return myEvent.attendees;
}

//implementing storing the event to the local storage
function saveCalendarEvents(calendarName, eventsObject)
{
	localStorage.setItem(calendarName, JSON.stringify(eventsObject));
}

//implementing the get events from storage method
function getCalendarEvents(calendarName)
{
	//check to see if the calendar exists
	if( !localStorage.getItem(calendarName) )
		localStorage.setItem( calendarName, '[]' );
	
	console.log( calendarName );
	console.log( JSON.parse(localStorage.getItem(calendarName)) );
	return JSON.parse( localStorage.getItem(calendarName));
}

//adding a new event to the existing event calendar
function addEventToCalendar(calendarName)
{
	log( jQuery('#newTitle') );
	var newTitle = '"title":"'+jQuery('#newTitle')[0].value+'"';
	log( newTitle );
	log( calendarName );
	
	var myCalendar = getCalendarEvents( calendarName );
	//need to find the next available eventid, deleted events need to be accounted for
log("checking myCalendar");
log(myCalendar);
	var newEventid = 0;
	for(var i=0; i<myCalendar.length; i++)
	{
		if(newEventid < myCalendar[i].eventid)
			newEventid = myCalendar[i].eventid;
	}
	//we now have the highest known eventid, so increment it by one
	newEventid++;

	var newIndex = myCalendar.length;
	
	myCalendar[newIndex] = JSON.parse( '{"eventid":"'+newEventid+'",'+newTitle+'}' );
	log( myCalendar[newIndex] );
	
	saveCalendarEvents( calendarName, myCalendar);
}