package com.workflowpro.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSchemaFix {

    private final JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void fixRoleColumnLength() {
        try {
            log.info("Checking and fixing role column length...");
            
            // Check current column length
            String checkSql = """
                SELECT CHARACTER_MAXIMUM_LENGTH 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = 'users' 
                AND COLUMN_NAME = 'role'
                """;
            
            Integer currentLength = jdbcTemplate.queryForObject(checkSql, Integer.class);
            
            if (currentLength != null && currentLength < 10) {
                log.info("Updating role column length from {} to 10", currentLength);
                
                // Update the column length
                String updateSql = "ALTER TABLE users MODIFY COLUMN role VARCHAR(10) NOT NULL";
                jdbcTemplate.execute(updateSql);
                
                log.info("Role column length updated successfully");
            } else {
                log.info("Role column length is already sufficient: {}", currentLength);
            }
            
        } catch (Exception e) {
            log.warn("Could not update role column length automatically: {}", e.getMessage());
            log.info("Please run the SQL script manually: ALTER TABLE users MODIFY COLUMN role VARCHAR(10) NOT NULL;");
        }
    }
}
