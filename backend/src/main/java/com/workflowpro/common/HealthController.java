package com.workflowpro.common;

import com.workflowpro.common.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health check controller for WorkFlowPro application.
 * Provides basic health status endpoint.
 */
@RestController
@RequestMapping("/api")
@Slf4j
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, String>>> healthCheck() {
        log.debug("Health check endpoint accessed");
        
        Map<String, String> status = new HashMap<>();
        status.put("status", "OK");
        status.put("application", "WorkFlowPro");
        status.put("timestamp", LocalDateTime.now().toString());
        
        ApiResponse<Map<String, String>> response = ApiResponse.builder()
                .success(true)
                .message("Application is running")
                .data(status)
                .timestamp(LocalDateTime.now())
                .build();
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
