package com.workflowpro.repository;

import com.workflowpro.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {

    Optional<Organization> findByDomain(String domain);

    boolean existsByDomain(String domain);

    @Query("SELECT o FROM Organization o WHERE LOWER(o.name) = LOWER(:name)")
    Optional<Organization> findByNameIgnoreCase(@Param("name") String name);

    @Query("SELECT COUNT(o) > 0 FROM Organization o WHERE LOWER(o.name) = LOWER(:name)")
    boolean existsByNameIgnoreCase(@Param("name") String name);

    @Query("SELECT o FROM Organization o WHERE LOWER(o.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    java.util.List<Organization> findByNameContainingIgnoreCase(@Param("name") String name);
}
