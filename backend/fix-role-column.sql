-- Fix for role column truncation error
-- Run this SQL script manually in your MySQL database

-- Update the role column to accommodate longer role names
ALTER TABLE users MODIFY COLUMN role VARCHAR(10) NOT NULL;

-- If you have existing data with old roles, you might want to update them
-- Uncomment the following lines if you need to migrate old data:

-- UPDATE users SET role = 'OWNER' WHERE role = 'ADMIN' AND id IN (
--     SELECT MIN(id) FROM users WHERE organization_id IN (
--         SELECT organization_id FROM users GROUP BY organization_id
--     )
-- );

-- UPDATE users SET role = 'MEMBER' WHERE role = 'USER' OR role = 'MANAGER';

-- Verify the changes
SELECT DISTINCT role FROM users;
