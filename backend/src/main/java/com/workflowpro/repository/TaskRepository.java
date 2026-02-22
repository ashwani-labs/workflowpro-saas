package com.workflowpro.repository;

import com.workflowpro.entity.Task;
import com.workflowpro.entity.Task.TaskStatus;
import com.workflowpro.entity.Task.TaskPriority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findByProjectId(UUID projectId);

    List<Task> findByAssignedUserId(UUID assignedUserId);

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByPriority(TaskPriority priority);

    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND t.status = :status")
    List<Task> findByProjectIdAndStatus(@Param("projectId") UUID projectId, @Param("status") TaskStatus status);

    @Query("SELECT t FROM Task t WHERE t.assignedUser.id = :assignedUserId AND t.status = :status")
    List<Task> findByAssignedUserIdAndStatus(@Param("assignedUserId") UUID assignedUserId, @Param("status") TaskStatus status);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId")
    long countByProjectId(@Param("projectId") UUID projectId);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.project.id = :projectId AND t.status = :status")
    long countByProjectIdAndStatus(@Param("projectId") UUID projectId, @Param("status") TaskStatus status);

    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Task> findByTitleContainingIgnoreCase(@Param("title") String title);

    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId AND LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Task> findByProjectIdAndTitleContainingIgnoreCase(@Param("projectId") UUID projectId, @Param("title") String title);
}
