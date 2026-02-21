package com.workflowpro.exception;

/**
 * Exception thrown when a request is malformed or invalid.
 * Typically results in HTTP 400 Bad Request response.
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
