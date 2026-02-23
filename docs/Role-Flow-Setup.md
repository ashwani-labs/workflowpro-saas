# WorkFlowPro - Role Flow Setup Documentation

## 🎯 **Overview**

Complete role-based authentication and authorization system for multi-tenant SaaS platform.

## 🔄 **Role Assignment Flow**

### **1. User Registration & Organization Creation**

```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@company.com",
  "password": "password123",
  "organizationName": "Acme Corp",
  "organizationDomain": "acme-corp"
}
```

**Result:**
- Creates new organization "Acme Corp"
- User gets **OWNER** role automatically
- User becomes organization administrator

### **2. User Invitation System**

```json
POST /api/users/invite
{
  "email": "jane@company.com",
  "role": "ADMIN",
  "message": "Join our team!"
}
```

**Permissions:**
- **OWNER** can invite: ADMIN, MEMBER
- **ADMIN** can invite: MEMBER only
- **MEMBER** cannot invite users

### **3. Role Hierarchy & Permissions**

| Role | Organization | Projects | Tasks | Users |
|------|-------------|----------|-------|-------|
| **OWNER** | ✅ Full Control | ✅ Full Control | ✅ Full Control | ✅ Full Control |
| **ADMIN** | ❌ Cannot Delete | ✅ Full Control | ✅ Full Control | ✅ Invite/Remove Members |
| **MEMBER** | ❌ No Access | ❌ Read Only | ✅ Assigned Tasks | ❌ No Access |

## 🛡️ **Security Configuration**

### **API Endpoint Protection**

```java
// Public
/api/auth/**                    // Anyone
/api/swagger-ui/**             // Anyone
/api/v3/api-docs/**            // Anyone

// OWNER only
/api/organizations/**          // Organization management

// OWNER + ADMIN
/api/users/**                  // User management
/api/projects/**               // Project management

// All authenticated users
/api/tasks/**                  // Task management
/api/dashboard/**              // Dashboard
/api/health/**                 // Health check
```

## 📊 **Database Schema**

### **Users Table**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('OWNER', 'ADMIN', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    organization_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
```

### **Organizations Table**
```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    domain VARCHAR(100) UNIQUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

## 🔧 **Implementation Details**

### **1. Role Assignment Logic**

```java
// First user creating organization = OWNER
if (organizationName != null) {
    Organization org = organizationService.createOrganization(name, domain, user);
    user.setRole(UserRole.OWNER);  // Automatic assignment
}

// Regular registration = MEMBER (requires invitation)
user.setRole(UserRole.MEMBER);  // Default role
```

### **2. Permission Checks**

```java
// Example: User invitation permission
if (inviter.getRole() != UserRole.OWNER && inviter.getRole() != UserRole.ADMIN) {
    throw new RuntimeException("You don't have permission to invite users");
}

// Example: Role update permission
if (updater.getRole() != UserRole.OWNER) {
    throw new RuntimeException("Only OWNER can update user roles");
}
```

### **3. JWT Token Structure**

```json
{
  "sub": "john@company.com",
  "iat": 1640995200,
  "exp": 1641081600
}
```

- Token contains email only
- Role retrieved from database per request
- Supports immediate role revocation

## 🚀 **API Usage Examples**

### **Register with Organization**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "password": "password123",
    "organizationName": "Tech Startup",
    "organizationDomain": "tech-startup"
  }'
```

### **Invite User**
```bash
curl -X POST http://localhost:8080/api/users/invite \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@company.com",
    "role": "ADMIN"
  }'
```

### **Get Organization Users**
```bash
curl -X GET http://localhost:8080/api/users/organization \
  -H "Authorization: Bearer <token>"
```

### **Update User Role**
```bash
curl -X PUT http://localhost:8080/api/users/{userId}/role?role=MEMBER \
  -H "Authorization: Bearer <token>"
```

## 🔒 **Security Features**

1. **Multi-tenant Isolation**: Users can only access their organization data
2. **Role-based Access Control**: Granular permissions per endpoint
3. **JWT Authentication**: Stateless token-based auth
4. **Input Validation**: Comprehensive validation on all inputs
5. **SQL Injection Prevention**: JPA/Hibernate parameterized queries
6. **CORS Configuration**: Proper cross-origin resource sharing

## 📝 **Next Steps**

1. **Email Integration**: Implement actual email sending for invitations
2. **Password Reset**: Add forgot password functionality
3. **Two-Factor Auth**: Add 2FA for enhanced security
4. **Audit Logging**: Track all user actions
5. **Rate Limiting**: Prevent brute force attacks
6. **Session Management**: Handle multiple device sessions

## 🧪 **Testing**

Run the application and test:

1. **Organization Creation**: Register first user with organization
2. **User Invitation**: Invite users with different roles
3. **Permission Testing**: Verify role-based access controls
4. **Security Testing**: Test authentication and authorization

```bash
mvn spring-boot:run
```

Access Swagger UI: http://localhost:8080/swagger-ui.html
