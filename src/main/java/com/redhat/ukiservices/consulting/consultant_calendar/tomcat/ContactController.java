package com.redhat.ukiservices.consulting.consultant_calendar.tomcat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Service
@RestController
public class ContactController {

	@Value("${sf-api.root.url}")
	private String sfRootAPI;

	@Value("${sf-api.contact.url}")
	private String sfContact;

	@Value("${sf-api.calendar.url}")
	private String sfCalendar;

	@RequestMapping(value = "/contact", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public String getContacts() {
	
		final String uri = sfRootAPI + sfContact;

		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.getForObject(uri, String.class);

		return result;

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
