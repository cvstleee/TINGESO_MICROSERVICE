FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-eureka-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/microservice-eureka-0.0.1-SNAPSHOT.jar"]