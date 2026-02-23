package com.workflowpro.modules.organization.service.impl;

import com.workflowpro.modules.auth.entity.User;
import com.workflowpro.modules.organization.entity.Organization;
import com.workflowpro.modules.organization.repository.OrganizationRepository;
import com.workflowpro.modules.organization.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Override
    public Organization createOrganization(String name, String domain, User owner) {
        log.info("Creating organization: {} for owner: {}", name, owner.getEmail());
        
        Organization organization = Organization.builder()
                .name(name)
                .domain(domain)
                .build();
        
        organization = organizationRepository.save(organization);
        
        // Set user as OWNER of the organization
        owner.setOrganization(organization);
        owner.setRole(User.UserRole.OWNER);
        
        log.info("Successfully created organization: {} with ID: {}", name, organization.getId());
        return organization;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Organization> findById(UUID id) {
        return organizationRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Organization> findByDomain(String domain) {
        return organizationRepository.findByDomain(domain);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByDomain(String domain) {
        return organizationRepository.existsByDomain(domain);
    }

    @Override
    public void addUserToOrganization(User user, Organization organization, User.UserRole role) {
        log.info("Adding user: {} to organization: {} with role: {}", user.getEmail(), organization.getName(), role);
        
        user.setOrganization(organization);
        user.setRole(role);
        
        log.info("Successfully added user: {} to organization: {}", user.getEmail(), organization.getName());
    }

    @Override
    public void removeUserFromOrganization(User user, Organization organization) {
        log.info("Removing user: {} from organization: {}", user.getEmail(), organization.getName());
        
        user.setOrganization(null);
        user.setRole(User.UserRole.MEMBER); // Reset to default role
        
        log.info("Successfully removed user: {} from organization: {}", user.getEmail(), organization.getName());
    }

    @Override
    public void updateUserRole(User user, Organization organization, User.UserRole newRole) {
        log.info("Updating user: {} role to: {} in organization: {}", user.getEmail(), newRole, organization.getName());
        
        user.setRole(newRole);
        
        log.info("Successfully updated user: {} role to: {} in organization: {}", user.getEmail(), newRole, organization.getName());
    }
}
