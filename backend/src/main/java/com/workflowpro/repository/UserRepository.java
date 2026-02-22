package com.workflowpro.repository;

import com.workflowpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.organization.id = :organizationId")
    java.util.List<User> findByOrganizationId(@Param("organizationId") UUID organizationId);

    @Query("SELECT COUNT(u) FROM User u WHERE u.organization.id = :organizationId")
    long countByOrganizationId(@Param("organizationId") UUID organizationId);

    @Query("SELECT u FROM User u WHERE u.organization.id = :organizationId AND u.role = :role")
    java.util.List<User> findByOrganizationIdAndRole(@Param("organizationId") UUID organizationId, @Param("role") User.UserRole role);
}
