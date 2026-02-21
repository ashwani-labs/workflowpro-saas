package com.workflowpro.tenant;

/**
 * Tenant context holder for multi-tenant support.
 * Uses ThreadLocal to store tenant ID per request thread.
 */
public class TenantContext {

    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();

    /**
     * Sets the current tenant ID.
     * 
     * @param tenantId the tenant ID to set
     */
    public static void setCurrentTenant(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    /**
     * Gets the current tenant ID.
     * 
     * @return the current tenant ID, or null if not set
     */
    public static String getCurrentTenant() {
        return CURRENT_TENANT.get();
    }

    /**
     * Clears the current tenant ID.
     * Should be called at the end of request processing.
     */
    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
