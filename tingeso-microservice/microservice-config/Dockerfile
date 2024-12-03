FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-config-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/microservice-config-0.0.1-SNAPSHOT.jar"]