package com.workflowpro.tenant;

import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Slf4j
public class TenantInterceptor implements HandlerInterceptor {

    private static final String TENANT_HEADER = "X-Tenant-ID";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        
        String path = request.getRequestURI();
        
        // Skip tenant validation for health check and auth endpoints
        if (path.startsWith("/api/health") || path.startsWith("/api/auth/")) {
            return true;
        }
        
        String tenantId = request.getHeader(TENANT_HEADER);
        
        if (tenantId == null || tenantId.trim().isEmpty()) {
            log.warn("Missing tenant ID in request for path: {}", path);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing tenant ID in header: " + TENANT_HEADER);
            return false;
        }
        
        log.debug("Tenant validation passed for tenant: {}", tenantId);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           @Nullable ModelAndView modelAndView) throws Exception {
        // No post-handle processing needed
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
                                @Nullable Exception ex) throws Exception {
        // No completion processing needed
    }
}
