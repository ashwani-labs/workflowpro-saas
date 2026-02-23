package com.workflowpro.security;

import com.workflowpro.config.CorsConfig;
import com.workflowpro.config.SecurityBeansConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Import({CorsConfig.class, SecurityBeansConfig.class})
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        
                        // Organization management - OWNER only
                        .requestMatchers("/api/organizations/**").hasRole("OWNER")
                        
                        // User management - OWNER and ADMIN
                        .requestMatchers("/api/users/**").hasAnyRole("OWNER", "ADMIN")
                        
                        // Project management - OWNER and ADMIN
                        .requestMatchers("/api/projects/**").hasAnyRole("OWNER", "ADMIN")
                        
                        // Task management - All authenticated users
                        .requestMatchers("/api/tasks/**").hasAnyRole("OWNER", "ADMIN", "MEMBER")
                        
                        // Dashboard - All authenticated users
                        .requestMatchers("/api/dashboard/**").hasAnyRole("OWNER", "ADMIN", "MEMBER")
                        
                        // Health check - All authenticated users
                        .requestMatchers("/api/health/**").hasAnyRole("OWNER", "ADMIN", "MEMBER")
                        
                        // Any other request requires authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}