package com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto;

import java.util.List;

/**
 * Top level Calendar object for calendar API call
 * 
 * @author abuttery
 *
 */
public class Calendar {

	private String resourceID;

	private String resourceName;
	
	private List<CalendarAssignment> assignments;

	public List<CalendarAssignment> getAssignments() {
		return assignments;
	}

	public void setAssignments(List<CalendarAssignment> assignments) {
		this.assignments = assignments;
	}

	public String getResourceID() {
		return resourceID;
	}

	public void setResourceID(String resourceID) {
		this.resourceID = resourceID;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

}
