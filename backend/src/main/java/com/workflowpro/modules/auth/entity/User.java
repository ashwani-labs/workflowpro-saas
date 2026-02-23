package com.workflowpro.modules.auth.entity;

import com.workflowpro.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email"),
    @Index(name = "idx_user_organization", columnList = "organization_id")
})
@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 10)
    private UserRole role = UserRole.MEMBER;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private com.workflowpro.modules.organization.entity.Organization organization;

    @OneToMany(mappedBy = "assignedUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<com.workflowpro.modules.task.entity.Task> assignedTasks = new HashSet<>();

    public enum UserRole {
        OWNER,    // Can manage organization, invite users, full access
        ADMIN,    // Can manage projects, tasks, team members  
        MEMBER    // Can work on assigned tasks, limited access
    }
}
