-- Update the role column length to accommodate new role values
-- Old roles: ADMIN, MANAGER, USER (max 7 characters)
-- New roles: OWNER, ADMIN, MEMBER (max 6 characters)
-- Setting to VARCHAR(10) for future expansion

ALTER TABLE users MODIFY COLUMN role VARCHAR(10) NOT NULL;
