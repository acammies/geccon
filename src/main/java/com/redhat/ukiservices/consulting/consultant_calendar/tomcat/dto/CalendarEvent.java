package com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto;

import java.util.Date;

/**
 * Class for storing Working patterns for 
 * a consultant on an assignment. 
 * @author abuttery
 *
 */
public class CalendarEvent {
	
	private Date startDate;
	
	private int days;
	
	private Double dailyHours;

	public CalendarEvent() {
		super();
		
	}

	public CalendarEvent( Date startDate, int days, Double dailyHours) {
		super();
		this.startDate = startDate;
		this.days = days;
		this.dailyHours = dailyHours;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public Double getDailyHours() {
		return dailyHours;
	}

	public void setDailyHours(Double dailyHours) {
		this.dailyHours = dailyHours;
	}

}
