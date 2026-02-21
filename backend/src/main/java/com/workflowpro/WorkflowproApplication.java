package com.workflowpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WorkflowproApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkflowproApplication.class, args);
	}

}
