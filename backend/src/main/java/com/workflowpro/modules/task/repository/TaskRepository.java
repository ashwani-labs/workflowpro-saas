package com.workflowpro.modules.task.repository;

import com.workflowpro.modules.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findByProjectId(UUID projectId);

    List<Task> findByAssignedUserId(UUID assignedUserId);

    List<Task> findByProjectIdAndStatus(UUID projectId, Task.TaskStatus status);

    List<Task> findByAssignedUserIdAndStatus(UUID assignedUserId, Task.TaskStatus status);

    List<Task> findByProjectIdAndDueDateBefore(UUID projectId, LocalDate date);

    List<Task> findByAssignedUserIdAndDueDateBefore(UUID assignedUserId, LocalDate date);

    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Task> findByProjectIdAndTitleContainingIgnoreCase(@Param("projectId") UUID projectId, @Param("title") String title);

    @Query("SELECT t FROM Task t WHERE t.assignedUser.id = :assignedUserId AND LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Task> findByAssignedUserIdAndTitleContainingIgnoreCase(@Param("assignedUserId") UUID assignedUserId, @Param("title") String title);

    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND t.priority = :priority")
    List<Task> findByProjectIdAndPriority(@Param("projectId") UUID projectId, @Param("priority") Task.TaskPriority priority);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId AND t.status = :status")
    long countByProjectIdAndStatus(@Param("projectId") UUID projectId, @Param("status") Task.TaskStatus status);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.assignedUser.id = :assignedUserId AND t.status = :status")
    long countByAssignedUserIdAndStatus(@Param("assignedUserId") UUID assignedUserId, @Param("status") Task.TaskStatus status);
}
