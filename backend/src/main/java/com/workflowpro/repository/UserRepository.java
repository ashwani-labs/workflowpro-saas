package com.workflowpro.repository;

import com.workflowpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository for User entity operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Find user by email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if user exists by email.
     */
    boolean existsByEmail(String email);

    /**
     * Find user by organization ID.
     */
    @Query("SELECT u FROM User u WHERE u.organization.id = :organizationId")
    java.util.List<User> findByOrganizationId(@Param("organizationId") UUID organizationId);

    /**
     * Count users by organization.
     */
    @Query("SELECT COUNT(u) FROM User u WHERE u.organization.id = :organizationId")
    long countByOrganizationId(@Param("organizationId") UUID organizationId);

    /**
     * Find users by organization and role.
     */
    @Query("SELECT u FROM User u WHERE u.organization.id = :organizationId AND u.role = :role")
    java.util.List<User> findByOrganizationIdAndRole(@Param("organizationId") UUID organizationId, @Param("role") User.UserRole role);
}
