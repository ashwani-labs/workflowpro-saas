package com.workflowpro.modules.auth.service;

import com.workflowpro.modules.auth.dto.InviteUserRequest;
import com.workflowpro.modules.auth.dto.InviteUserResponse;
import com.workflowpro.modules.auth.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    
    /**
     * Invite a user to join the organization
     */
    InviteUserResponse inviteUser(InviteUserRequest inviteRequest, User inviter);
    
    /**
     * Get all users in the organization
     */
    List<User> getOrganizationUsers(UUID organizationId);
    
    /**
     * Update user role in organization
     */
    void updateUserRole(UUID userId, User.UserRole newRole, User updater);
    
    /**
     * Remove user from organization
     */
    void removeUserFromOrganization(UUID userId, User remover);
    
    /**
     * Find user by email
     */
    java.util.Optional<User> findByEmail(String email);
    
    /**
     * Find user by ID
     */
    java.util.Optional<User> findById(UUID id);
}
