package com.workflowpro.modules.auth.dto;

import lombok.Data;

@Data
public class InviteUserResponse {
    
    private String message;
    private String email;
    private String organizationName;
    private String role;
    
    public InviteUserResponse(String message, String email, String organizationName, String role) {
        this.message = message;
        this.email = email;
        this.organizationName = organizationName;
        this.role = role;
    }
}
