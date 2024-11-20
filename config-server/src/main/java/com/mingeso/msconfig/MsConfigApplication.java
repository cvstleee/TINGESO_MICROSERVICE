package com.mingeso.msconfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
//spring cloud server: da las configuraciones para cada microservicio
@EnableConfigServer
public class MsConfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsConfigApplication.class, args);
	}

}
