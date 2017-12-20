package com.redhat.ukiservices.consulting.consultant_calendar.tomcat;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class CalendarController {

	@RequestMapping("/calendar/{region_name}")
    public String calendarByRegion(Model model, @PathVariable("region_name") String regionName) {
        
		model.addAttribute("contactUrl", "/contact/" + regionName);
		model.addAttribute("resourceID", "NULL");
		model.addAttribute("calendarUrl", "/calendar/" + regionName +"/contact/");
        return "calendar";
    }
	
	@RequestMapping("/calendar/{region_name}/contact/{contact_id}")
    public String calendarByRegion(Model model, @PathVariable("region_name") String regionName,
    		 @PathVariable("contact_id") String contactId) {
        
		model.addAttribute("contactUrl", "/contact/" + regionName);
		model.addAttribute("resourceID", contactId);
		model.addAttribute("calendarUrl", "/calendar/" + regionName +"/contact/");
        return "calendar";
    }

	@RequestMapping("/calendar")
    public String calendar(Model model) {
        
		model.addAttribute("contactUrl", "/contact");
		model.addAttribute("resourceID", "NULL");
		model.addAttribute("calendarUrl", "/calendar/contact/");
        return "calendar";
    }
	
	@RequestMapping("/calendar/contact/{contact_id}")
    public String calendar(Model model, @PathVariable("contact_id") String contactId) {
		model.addAttribute("resourceID", contactId);
		model.addAttribute("contactUrl", "/contact");
		model.addAttribute("calendarUrl", "/calendar/contact/");
        return "calendar";
    }
}
