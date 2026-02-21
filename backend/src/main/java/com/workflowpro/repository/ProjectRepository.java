package com.workflowpro.repository;

import com.workflowpro.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for Project entity operations.
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    /**
     * Find projects by organization ID.
     */
    List<Project> findByOrganizationId(UUID organizationId);

    /**
     * Find projects by organization ID and name containing the given string.
     */
    @Query("SELECT p FROM Project p WHERE p.organization.id = :organizationId AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findByOrganizationIdAndNameContainingIgnoreCase(@Param("organizationId") UUID organizationId, @Param("name") String name);

    /**
     * Count projects by organization.
     */
    @Query("SELECT COUNT(p) FROM Project p WHERE p.organization.id = :organizationId")
    long countByOrganizationId(@Param("organizationId") UUID organizationId);

    /**
     * Find projects by name containing the given string.
     */
    @Query("SELECT p FROM Project p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findByNameContainingIgnoreCase(@Param("name") String name);

    /**
     * Check if project exists by organization ID and name.
     */
    @Query("SELECT COUNT(p) > 0 FROM Project p WHERE p.organization.id = :organizationId AND LOWER(p.name) = LOWER(:name)")
    boolean existsByOrganizationIdAndNameIgnoreCase(@Param("organizationId") UUID organizationId, @Param("name") String name);
}
