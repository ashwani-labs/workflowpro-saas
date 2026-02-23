package com.workflowpro.modules.auth.repository;

import com.workflowpro.modules.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByOrganizationId(UUID organizationId);

    List<User> findByOrganizationIdAndRole(UUID organizationId, User.UserRole role);

    long countByOrganizationId(UUID organizationId);
}
