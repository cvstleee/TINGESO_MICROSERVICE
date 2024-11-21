package com.microservice.costumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroserviceCostumerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceCostumerApplication.class, args);
	}

}
