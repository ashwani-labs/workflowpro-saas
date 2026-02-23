package com.workflowpro.modules.auth.service.impl;

import com.workflowpro.modules.auth.dto.InviteUserRequest;
import com.workflowpro.modules.auth.dto.InviteUserResponse;
import com.workflowpro.modules.auth.entity.User;
import com.workflowpro.modules.auth.repository.UserRepository;
import com.workflowpro.modules.auth.service.UserService;
import com.workflowpro.modules.organization.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OrganizationService organizationService;

    @Override
    public InviteUserResponse inviteUser(InviteUserRequest inviteRequest, User inviter) {
        log.info("User {} inviting {} to organization {}", 
                inviter.getEmail(), inviteRequest.getEmail(), inviter.getOrganization().getName());
        
        // Check if inviter has permission (OWNER or ADMIN)
        if (inviter.getRole() != User.UserRole.OWNER && inviter.getRole() != User.UserRole.ADMIN) {
            throw new RuntimeException("You don't have permission to invite users");
        }
        
        // Check if user already exists
        if (userRepository.existsByEmail(inviteRequest.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }
        
        // In a real implementation, you would send an email invitation here
        // For now, we'll just log the invitation
        log.info("Invitation sent to {} for organization {} with role {}", 
                inviteRequest.getEmail(), inviter.getOrganization().getName(), inviteRequest.getRole());
        
        return new InviteUserResponse(
                "User invited successfully",
                inviteRequest.getEmail(),
                inviter.getOrganization().getName(),
                inviteRequest.getRole().toString()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getOrganizationUsers(UUID organizationId) {
        return userRepository.findByOrganizationId(organizationId);
    }

    @Override
    public void updateUserRole(UUID userId, User.UserRole newRole, User updater) {
        log.info("User {} updating role for user {} to {}", updater.getEmail(), userId, newRole);
        
        // Check if updater has permission
        if (updater.getRole() != User.UserRole.OWNER) {
            throw new RuntimeException("Only OWNER can update user roles");
        }
        
        User userToUpdate = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Cannot change role of OWNER
        if (userToUpdate.getRole() == User.UserRole.OWNER) {
            throw new RuntimeException("Cannot change OWNER role");
        }
        
        organizationService.updateUserRole(userToUpdate, updater.getOrganization(), newRole);
        
        log.info("Successfully updated role for user {} to {}", userToUpdate.getEmail(), newRole);
    }

    @Override
    public void removeUserFromOrganization(UUID userId, User remover) {
        log.info("User {} removing user {} from organization", remover.getEmail(), userId);
        
        // Check if remover has permission
        if (remover.getRole() != User.UserRole.OWNER && remover.getRole() != User.UserRole.ADMIN) {
            throw new RuntimeException("You don't have permission to remove users");
        }
        
        User userToRemove = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Cannot remove OWNER
        if (userToRemove.getRole() == User.UserRole.OWNER) {
            throw new RuntimeException("Cannot remove OWNER from organization");
        }
        
        // Admin cannot remove other admins (only OWNER can)
        if (remover.getRole() == User.UserRole.ADMIN && userToRemove.getRole() == User.UserRole.ADMIN) {
            throw new RuntimeException("ADMIN cannot remove other ADMIN users");
        }
        
        organizationService.removeUserFromOrganization(userToRemove, remover.getOrganization());
        
        log.info("Successfully removed user {} from organization", userToRemove.getEmail());
    }

    @Override
    @Transactional(readOnly = true)
    public java.util.Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public java.util.Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }
}
