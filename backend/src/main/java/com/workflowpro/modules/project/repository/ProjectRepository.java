package com.workflowpro.modules.project.repository;

import com.workflowpro.modules.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByOrganizationId(UUID organizationId);

    @Query("SELECT p FROM Project p WHERE p.organization.id = :organizationId AND LOWER(p.name) = LOWER(:name)")
    Optional<Project> findByOrganizationIdAndNameIgnoreCase(@Param("organizationId") UUID organizationId, @Param("name") String name);

    @Query("SELECT p FROM Project p WHERE p.organization.id = :organizationId AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findByOrganizationIdAndNameContainingIgnoreCase(@Param("organizationId") UUID organizationId, @Param("name") String name);

    @Query("SELECT COUNT(p) > 0 FROM Project p WHERE p.organization.id = :organizationId AND LOWER(p.name) = LOWER(:name)")
    boolean existsByOrganizationIdAndNameIgnoreCase(@Param("organizationId") UUID organizationId, @Param("name") String name);

    @Query("SELECT p FROM Project p WHERE p.organization.id = :organizationId AND p.id != :excludeId AND LOWER(p.name) = LOWER(:name)")
    Optional<Project> findByOrganizationIdAndNameIgnoreCaseAndIdNot(@Param("organizationId") UUID organizationId, @Param("name") String name, @Param("excludeId") UUID excludeId);
}
