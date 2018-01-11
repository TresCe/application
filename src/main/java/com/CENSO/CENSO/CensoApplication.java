package com.CENSO.CENSO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"com.CENSO"})
@EntityScan("com.CENSO.model")
@EnableJpaRepositories("com.CENSO.repository")
public class CensoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CensoApplication.class, args);
	}
}
