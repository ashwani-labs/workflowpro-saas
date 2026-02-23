package com.workflowpro.modules.auth.controller;

import com.workflowpro.common.dto.ApiResponse;
import com.workflowpro.modules.auth.dto.InviteUserRequest;
import com.workflowpro.modules.auth.dto.InviteUserResponse;
import com.workflowpro.modules.auth.entity.User;
import com.workflowpro.modules.auth.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User Management", description = "User management APIs")
public class UserController {

    private final UserService userService;

    @PostMapping("/invite")
    @Operation(summary = "Invite user to organization")
    public ResponseEntity<ApiResponse<InviteUserResponse>> inviteUser(
            @RequestBody InviteUserRequest inviteRequest,
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Invite user request from: {} for email: {}", currentUser.getEmail(), inviteRequest.getEmail());
        
        InviteUserResponse response = userService.inviteUser(inviteRequest, currentUser);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/organization")
    @Operation(summary = "Get all users in organization")
    public ResponseEntity<ApiResponse<List<User>>> getOrganizationUsers(
            @AuthenticationPrincipal User currentUser) {
        
        List<User> users = userService.getOrganizationUsers(currentUser.getOrganization().getId());
        
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @PutMapping("/{userId}/role")
    @Operation(summary = "Update user role")
    public ResponseEntity<ApiResponse<String>> updateUserRole(
            @PathVariable UUID userId,
            @RequestParam User.UserRole role,
            @AuthenticationPrincipal User currentUser) {
        
        userService.updateUserRole(userId, role, currentUser);
        
        return ResponseEntity.ok(ApiResponse.success("User role updated successfully"));
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Remove user from organization")
    public ResponseEntity<ApiResponse<String>> removeUser(
            @PathVariable UUID userId,
            @AuthenticationPrincipal User currentUser) {
        
        userService.removeUserFromOrganization(userId, currentUser);
        
        return ResponseEntity.ok(ApiResponse.success("User removed from organization successfully"));
    }
}
