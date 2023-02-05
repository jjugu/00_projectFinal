package com.majorcompany.hicompany.exception;

/* RuntimeException을 상속 받아 예외 발생 */
public class LoginFailedException extends RuntimeException {

	public LoginFailedException(String message) {
		super(message);
	}
}
