package com.redhat.ukiservices.consulting.consultant_calendar.tomcat;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto.CalendarAssignment;
import com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto.CalendarEvent;
import com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto.ResultDTO;

@Service
@RestController
public class ContactController {

	@Value("${sf-api.root.url}")
	private String sfRootAPI;

	@Value("${sf-api.contact.url}")
	private String sfContact;

	@Value("${sf-api.calendar.url}")
	private String sfCalendar;
	
	SimpleDateFormat sdf = new SimpleDateFormat("'TZID=Europe/London:'yyyyMMdd'T'HHmmss");
	
	SimpleDateFormat sdfIN = new SimpleDateFormat("yyyy-MM-dd");

	@RequestMapping(value = "/contact", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public String getContacts() {
	
		final String uri = sfRootAPI + sfContact;

		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(uri, String.class);

		return result;

	}
	
	@RequestMapping(value = "/calendarICS", produces = "text/calendar", method = RequestMethod.GET)
	public ResponseEntity<String> getCalendarICS(@RequestParam(value = "resourceId", required = true) final String resourceID) {
	
		String uri = sfRootAPI + sfCalendar + "?resourceId=" + resourceID ;
		
		 
		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(uri, String.class);
		
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setDateFormat(sdfIN);
		String dateCreated =   sdf.format(new Date() ) + "\n";
		Boolean found = false;
		StringBuilder sb = new StringBuilder();
		
		try {
			
			ResultDTO resultDTO = objectMapper.readValue(result, ResultDTO.class);
			
		    
			sb.append("BEGIN:VCALENDAR\n" + 
					"VERSION:2.0\n" + 
					"PRODID:-//bobbin v0.1//NONSGML iCal Writer//EN\n" + 
					"CALSCALE:GREGORIAN\n" + 
					"METHOD:PUBLISH\n" );    
		  
			
			for (CalendarAssignment assignment :  resultDTO.getData().getAssignments())
		    {
				String status;
				if (assignment.getStatus() == null || assignment.getStatus().equalsIgnoreCase("Tentative") ) continue;
				else if (assignment.getStatus().equalsIgnoreCase("Confirmed"))
				{
					status = "STATUS:CONFIRMED\n";
				}
				else 
				{
					status = "STATUS:CANCELLED\n";
				}
				found = true;
				int id = 0;
				String assignmentID = assignment.getProjectID().substring(0, assignment.getProjectID().length() -3);
				String description = "DESCRIPTION:Project - " + assignment.getProjectName() +
								  "\\nOPA Project Code - " + (assignment.getOpaProjectCode() == null ? "TBC" : assignment.getOpaProjectCode()) +
								  "\\nOPA Task Number - " + (assignment.getTaskNo() == null ? "TBC" : assignment.getTaskNo())+
								  "\\nSales Force Link - " + assignment.getUrl() + "\n";
			
				for (CalendarEvent event :  assignment.getEvents())
			    {	
					java.util.Calendar cal = java.util.Calendar.getInstance();
					cal.setTime(event.getStartDate());
					cal.set(java.util.Calendar.HOUR_OF_DAY, 9);
					sb.append("BEGIN:VEVENT\n" );
					sb.append("DTSTART;" + sdf.format(cal.getTime()) + "\n");

					if (event.getDays() > 1)
					{
						sb.append("RRULE:FREQ=DAILY;COUNT=" + event.getDays() + "\n");
					}
					cal.add(java.util.Calendar.MINUTE, (int)(60 * event.getDailyHours()));
					sb.append("DTEND;" + sdf.format(cal.getTime()) + "\n");
					sb.append("DTSTAMP;" +dateCreated);
					if (assignment.getDeliveryLocation() != null )
					{
						sb.append("LOCATION:" +assignment.getDeliveryLocation() + "\n");
					}
					sb.append("UID:" + assignmentID + id + "\n");
					sb.append("CREATED;" +dateCreated);
					sb.append(description);
					sb.append("LAST-MODIFIED:" +dateCreated);
					sb.append("SEQUENCE:0\n");
					sb.append(status);
					sb.append("SUMMARY:"+ assignment.getProjectName() +"\n" );

					sb.append("TRANSP:OPAQUE\nEND:VEVENT\n" );
					
					
					
					
					
					id +=1;
			    }
		    }
			sb.append("END:VCALENDAR\n");
		    
		    
		  
		} catch (IOException e) {
			System.err.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to process Calendar");
		}

		if (found)
			{
				return ResponseEntity.ok().body(sb.toString());
			}
		else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No confirmed Bookings found for resource");

	}
	
	@RequestMapping(value = "/contact/{region_name}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public String getContacts(@PathVariable("region_name") String regionName) {
	
		final String uri = sfRootAPI  + sfContact + "?regionName=" + regionName ;

		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(uri, String.class);

		return result;

	}

	@RequestMapping(value = "/calendarAPI", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public String getCalendar(@RequestParam(value = "resourceId", required = true) final String resourceID,
			@RequestParam(value = "startDate", required = false) final String startDate,
			@RequestParam(value = "endDate", required = false) final String endDate) {
		String uri = sfRootAPI + sfCalendar + "?";
		if (resourceID != null)
			uri += "resourceId=" + resourceID + "&";
		
		 if (startDate !=null ) uri += "startDate=" + startDate +"&";
		
		 if (endDate != null) uri += "endDate=" + endDate;

		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(uri, String.class);

		return result;

	}

}
