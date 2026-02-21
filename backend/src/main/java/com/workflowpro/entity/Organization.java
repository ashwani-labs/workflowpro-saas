package com.workflowpro.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

/**
 * Organization entity for WorkFlowPro application.
 * Represents organizations/tenants in the multi-tenant system.
 */
@Entity
@Table(name = "organizations", indexes = {
    @Index(name = "idx_organization_domain", columnList = "domain", unique = true)
})
@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class Organization extends BaseEntity {

    @NotBlank(message = "Organization name is required")
    @Size(max = 200, message = "Organization name must not exceed 200 characters")
    @Column(name = "name", nullable = false, length = 200)
    private String name;

    @Size(max = 100, message = "Domain must not exceed 100 characters")
    @Column(name = "domain", length = 100, unique = true)
    private String domain;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Project> projects = new HashSet<>();
}
