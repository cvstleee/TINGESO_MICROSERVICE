package com.microservice.calculations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroserviceCalculationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceCalculationsApplication.class, args);
	}

}
