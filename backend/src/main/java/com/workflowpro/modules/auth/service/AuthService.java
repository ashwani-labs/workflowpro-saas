package com.workflowpro.modules.auth.service;

import com.workflowpro.modules.auth.dto.AuthResponse;
import com.workflowpro.modules.auth.dto.LoginRequest;
import com.workflowpro.modules.auth.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);
}
