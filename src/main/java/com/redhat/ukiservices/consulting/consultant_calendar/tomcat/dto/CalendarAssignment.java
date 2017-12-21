package com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto;

import java.util.Date;
import java.util.List;

public class CalendarAssignment {
	
	private Date startDate;
	
	private Date endDate;
	
	private Double scheduledHours;
	
	private String projectName;
	
	private String url;
	
	private String name;
	
	private String deliveryLocation;
	
	private String opaProjectCode;
	
	private String taskNo;
	
	private String status;
	
	private String projectID;
	
	private List<CalendarEvent> events;

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Double getScheduledHours() {
		return scheduledHours;
	}

	public void setScheduledHours(Double sheduledHours) {
		this.scheduledHours = sheduledHours;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeliveryLocation() {
		return deliveryLocation;
	}

	public void setDeliveryLocation(String deliveryLocation) {
		this.deliveryLocation = deliveryLocation;
	}

	public String getOpaProjectCode() {
		return opaProjectCode;
	}

	public void setOpaProjectCode(String opaProjectCode) {
		this.opaProjectCode = opaProjectCode;
	}

	public String getTaskNo() {
		return taskNo;
	}

	public void setTaskNo(String taskNo) {
		this.taskNo = taskNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public List<CalendarEvent> getEvents() {
		return events;
	}

	public void setEvents(List<CalendarEvent> events) {
		this.events = events;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getProjectID() {
		return projectID;
	}

	public void setProjectID(String projectID) {
		this.projectID = projectID;
	}
	
}
