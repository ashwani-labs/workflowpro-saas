package com.workflowpro.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Application configuration for WorkFlowPro.
 * Provides common beans used throughout the application.
 */
@Configuration
public class ApplicationConfig {

    /**
     * Provides ModelMapper bean for object mapping between DTOs and entities.
     * 
     * @return configured ModelMapper instance
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    /**
     * Provides PasswordEncoder bean from SecurityConfig.
     * This bean is already defined in SecurityConfig but included here for clarity.
     * 
     * @param passwordEncoder the password encoder bean
     * @return password encoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoderProvider(PasswordEncoder passwordEncoder) {
        return passwordEncoder;
    }
}
