package com.workflowpro.exception;

/**
 * Exception thrown when access is unauthorized.
 * Typically results in HTTP 401 Unauthorized response.
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }
}
