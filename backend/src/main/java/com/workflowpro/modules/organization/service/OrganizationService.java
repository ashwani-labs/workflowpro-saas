package com.workflowpro.modules.organization.service;

import com.workflowpro.modules.auth.entity.User;
import com.workflowpro.modules.organization.entity.Organization;

import java.util.Optional;
import java.util.UUID;

public interface OrganizationService {
    
    /**
     * Create a new organization and set the user as OWNER
     */
    Organization createOrganization(String name, String domain, User owner);
    
    /**
     * Find organization by ID
     */
    Optional<Organization> findById(UUID id);
    
    /**
     * Find organization by domain
     */
    Optional<Organization> findByDomain(String domain);
    
    /**
     * Check if organization exists by domain
     */
    boolean existsByDomain(String domain);
    
    /**
     * Add user to organization with specified role
     */
    void addUserToOrganization(User user, Organization organization, User.UserRole role);
    
    /**
     * Remove user from organization
     */
    void removeUserFromOrganization(User user, Organization organization);
    
    /**
     * Update user role in organization
     */
    void updateUserRole(User user, Organization organization, User.UserRole newRole);
}
