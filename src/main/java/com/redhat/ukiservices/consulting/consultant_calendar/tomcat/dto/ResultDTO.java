package com.redhat.ukiservices.consulting.consultant_calendar.tomcat.dto;

/**
 * Class that defines the structure of all responses to API
 * requests
 * @author abuttery
 *
 */
public class ResultDTO {

	public String code;
	
	private String message;
	
	public Calendar data;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Calendar getData() {
		return data;
	}

	public void setData(Calendar data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
