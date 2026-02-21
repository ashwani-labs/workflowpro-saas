-- Example data for WorkFlowPro application
-- This file is disabled by default. To enable, rename to data.sql

-- Insert sample organizations
INSERT INTO organizations (id, name, domain, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Tech Corp', 'techcorp.com', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'Design Studio', 'designstudio.io', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Marketing Agency', 'marketingagency.co', NOW(), NOW());

-- Insert sample users
INSERT INTO users (id, name, email, password, role, organization_id, created_at, updated_at) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'John Doe', 'john@techcorp.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN', '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440002', 'Jane Smith', 'jane@techcorp.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'MANAGER', '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440003', 'Bob Wilson', 'bob@techcorp.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'USER', '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440004', 'Alice Brown', 'alice@designstudio.io', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440005', 'Charlie Davis', 'charlie@marketingagency.co', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'MANAGER', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW());

-- Insert sample projects
INSERT INTO projects (id, name, description, organization_id, created_at, updated_at) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'Website Redesign', 'Complete redesign of company website', '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440002', 'Mobile App Development', 'Native mobile app for iOS and Android', '550e8400-e29b-41d4-a716-446655440001', NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440003', 'Brand Identity', 'Complete brand identity package', '550e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('770e8400-e29b-41d4-a716-446655440004', 'Social Media Campaign', 'Q4 social media marketing campaign', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW());

-- Insert sample tasks
INSERT INTO tasks (id, title, description, status, priority, project_id, assigned_user_id, created_at, updated_at) VALUES
('880e8400-e29b-41d4-a716-446655440001', 'Design Homepage', 'Create mockups for the new homepage design', 'IN_PROGRESS', 'HIGH', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440002', 'Develop Backend API', 'Create RESTful API for the website', 'TODO', 'HIGH', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440003', 'Database Schema', 'Design and implement database schema', 'COMPLETED', 'MEDIUM', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440004', 'UI Components', 'Create reusable UI components', 'IN_PROGRESS', 'MEDIUM', '770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440005', 'Logo Design', 'Design new company logo', 'IN_REVIEW', 'HIGH', '770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440006', 'Content Strategy', 'Develop content strategy for social media', 'TODO', 'MEDIUM', '770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440007', 'Performance Testing', 'Test website performance and optimization', 'TODO', 'LOW', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', NOW(), NOW()),
('880e8400-e29b-41d4-a716-446655440008', 'User Testing', 'Conduct user testing sessions', 'TODO', 'MEDIUM', '770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', NOW(), NOW());
