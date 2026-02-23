package com.workflowpro.modules.auth.service.impl;

import com.workflowpro.modules.auth.dto.AuthResponse;
import com.workflowpro.modules.auth.dto.LoginRequest;
import com.workflowpro.modules.auth.dto.RegisterRequest;
import com.workflowpro.modules.auth.entity.User;
import com.workflowpro.modules.auth.mapper.UserMapper;
import com.workflowpro.modules.auth.repository.UserRepository;
import com.workflowpro.modules.auth.service.AuthService;
import com.workflowpro.modules.organization.entity.Organization;
import com.workflowpro.modules.organization.service.OrganizationService;
import com.workflowpro.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final OrganizationService organizationService;

    @Override
    public AuthResponse register(RegisterRequest registerRequest) {
        log.info("Registering new user: {}", registerRequest.getEmail());
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = userMapper.toEntity(registerRequest);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (registerRequest.getOrganizationName() != null && !registerRequest.getOrganizationName().trim().isEmpty()) {
            if (registerRequest.getOrganizationDomain() != null && 
                organizationService.existsByDomain(registerRequest.getOrganizationDomain())) {
                throw new RuntimeException("Organization domain already exists");
            }

            Organization organization = organizationService.createOrganization(
                registerRequest.getOrganizationName(),
                registerRequest.getOrganizationDomain(),
                user
            );
            log.info("Created new organization: {} for user: {}", organization.getName(), user.getEmail());
        } else {
            log.warn("User registered without organization: {}", user.getEmail());
        }

        user = userRepository.save(user);
        String token = jwtService.generateToken(user.getEmail());
        log.info("Successfully registered user: {} with role: {}", user.getEmail(), user.getRole());
        
        return userMapper.toResponse(user, token);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("User login attempt: {}", loginRequest.getEmail());
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(Objects.requireNonNull(userDetails).getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail());
        log.info("User logged in successfully: {} with role: {}", user.getEmail(), user.getRole());
        
        return userMapper.toResponse(user, token);
    }
}
