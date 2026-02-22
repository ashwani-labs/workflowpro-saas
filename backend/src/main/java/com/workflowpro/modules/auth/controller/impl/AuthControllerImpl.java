package com.workflowpro.modules.auth.controller.impl;

import com.workflowpro.modules.auth.controller.AuthController;
import com.workflowpro.modules.auth.dto.AuthResponse;
import com.workflowpro.modules.auth.dto.LoginRequest;
import com.workflowpro.modules.auth.dto.RegisterRequest;
import com.workflowpro.modules.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthControllerImpl implements AuthController {

    private final AuthService authService;

    @Override
    public ResponseEntity<AuthResponse> register(RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<AuthResponse> login(LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}
