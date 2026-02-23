package com.workflowpro.modules.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.workflowpro.modules.auth.entity.User;
import lombok.Data;

@Data
public class InviteUserRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Role is required")
    private User.UserRole role;

    private String message;
}
